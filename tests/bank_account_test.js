import { equal } from "assert"

import {
  spawn,
  send,
  test_pid,
  assert_receive,
  kill
} from "../src"

import BankAccount, {
  send_balance,
  calc_balance,
  deposit,
  withdraw,
  destructive_snapshot
} from "./bank_account_example"

describe("Bank Account Example", () => {
  describe ("Implementation", () => {
    let self, account

    function assert_balance (amount) {
      send(account, ["check_balance", self])
      assert_receive(self, ["balance", amount])
    }

    beforeEach (() => {
      self = test_pid()
      account = spawn(BankAccount, "receive", [])
    })

    afterEach (() => {
      kill(self, account)
    })

    it ("balance starts at zero", () => {
      assert_balance(0)
    })

    it ("can deposit moneys", () => {
      send(account, ["deposit", 30])
      send(account, ["deposit", 20])

      assert_balance(50)
    })

    it ("can withdraw moneys", () => {
      send(account, ["deposit", 30])
      send(account, ["withdraw", 20])

      assert_balance(10)
    })

    it ("if not enough moneys cant withdraw moneys", () => {
      send(account, ["deposit", 20])
      send(account, ["withdraw", 30])

      assert_balance(20)
    })

    it ("history of events can be compressed", () => {
      send(account, ["deposit", 20])
      send(account, ["deposit", 50])
      send(account, ["withdraw", 30])

      assert_balance(40)

      send(account, ["snapshot"])

      assert_balance(40)
    })
  })

  describe ("BankAcount", () => {
    it ("send_balance", () => {
      const self = test_pid()
      send_balance(["check_balance", self], [["deposit", 50]])
      assert_receive(self, ["balance", 50])

      send_balance(["check_balance", self], [["deposit", 50], ["withdraw", 30]])
      assert_receive(self, ["balance", 20])

      send_balance(["check_balance", self], [["deposit", 50], ["foo", 30], ["bar", 20]])
      assert_receive(self, ["balance", 50])
    })

    it ("calc_balance", () => {
      equal(calc_balance([["deposit", 30], ["withdraw", 20], ["deposit", 40]]), 50)
      equal(calc_balance([["deposit", 30], ["foo"], ["bar", 40]]), 30)
    })

    it ("deposit", () => {
      const events = [["deposit", 20], ["withdraw", 20]]
      equal(calc_balance(deposit(["deposit", 30], events)), 30)
    })

    it ("withdraw", () => {
      const events = [["deposit", 100], ["withdraw", 50]]
      equal(calc_balance(withdraw(["withdraw", 20], events)), 30)
      equal(calc_balance(withdraw(["withdraw", 120], events)), 50)
    })

    it ("destructive_snapshot", () => {
      const events = [
        ["deposit", 50],
        ["deposit", 50],
        ["deposit", 20],
        ["withdraw", 30], // 90
      ]

      const balance = calc_balance(events)

      equal(calc_balance(destructive_snapshot(events)), balance)
      equal(destructive_snapshot(events).length, 1)
    })
  })
})
