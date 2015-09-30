> not even close to production ready

# The Goal

```
  import { spawn, send, test_pid, assert_receive } from "keanu"

  const BankAccount = {
    receive (events, event) {
      const [ event_type ] = event
      if (event_type === "check_balance") this.check_balance(pid, events)
      return [...events, event]
    },

    check_balance (pid, events) {
      let balance = events.reduce(this.balance_reducer, 0)
      send(pid, ["balance", balance])
    },

    balance_reducer (event, acc) {
      const { event_type, amount } = event
      switch (event_type) {
        case "deposit": return acc + amount
        case "withdraw": return acc - amount
        default: return amount
      }
    }
  }

  let t1 = test_pid()
  let b1 = spawn(BankAccount, "receive", [])
  send(b1, ["check_balance", t1])
  assert_receive(t1, ["balance", 0])

  let t2 = test_pid()
  let b2 = spawn(BankAccount, "receive", [])
  send(b2, ["deposit", 50])
  send(b2, ["check_balance", t1])
  assert_receive(t2, ["balance", 50])

  let t3 = test_pid()
  let b3 = spawn(BankAccount, "receive", [])
  send(b3, ["deposit", 50])
  send(b3, ["withdraw", 30])
  send(b3, ["check_balance", t1])
  assert_receive(t3, ["balance", 20])
```
