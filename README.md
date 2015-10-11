## Lol wat

You create modules of rules with no state. You spawn a process (not an actual process yet) that can be sent messages.

```javascript
// from the bank_account_example in the tests directory

// BankAccount is the module
// receive is BankAccount.receive
//   - type: message -> state -> state
//   - it gets passed the message and the current state
//   - it returns the new state
// [] is the initial (seed) state
let account = spawn(BankAccount, "receive", [])

send(account, ["deposit", 50])  // send account a message of deposit 50
send(account, ["withdraw", 30]) // send account a message of withdraw 30

// pid_of_other_process will be sent ["balance", 20]
send(account, ["check_balance", pid_of_other_process])
```

## Exampls

In Test Directory
- Simple CQRS style bank account

## TODO

- [ ] Make `send` async
- [ ] Make `send` concurrent
- [ ] Can subscribe to changes in an actors state
- [ ] Can unsubscribe from changes in an actors state
- [ ] Supervisor layer for persistence
- [ ] actor state is an immutable reference type (maybe something like a bitmap hash tries)

## License

**keanu** is Copyright (c) 2015 James Hunter [@cccc00](https://twitter.com/cccc00) and licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
