import isEqual from "lodash/lang/isEqual"
import assert from "assert"

import {
  spawn,
  send,
  kill,
  test_pid,
  assert_receive,
} from "../src"

import Item from "./todo_item_example"

describe("todo item", () => {
  describe("implementation", () => {
    let item, self

    function assert_summery (obj) {
      send(item, ["request_item", self])
      assert_receive(self, ["item_summery", {...obj, pid: item}, item])
    }

    function assert_history (history) {
      send(item, ["request_history", self])
      assert_receive(self, ["item_history", history, item])
    }

    beforeEach(() => {
      self = test_pid()
      item = spawn(Item)
    })

    afterEach(() => {
      kill(self, item)
    })

    it ("defaults to empty object", () => {
      assert_summery({})
    })

    it ("can set a label", () => {
      send(item, ["set_label", "bob"])
      assert_summery({ label: "bob" })
    })

    it ("takes the last label", () => {
      send(item, ["set_label", "steve"])
      send(item, ["set_label", "bob"])
      assert_summery({ label: "bob" })
    })

    it ("can set the done flag", () => {
      send(item, ["set_done", true])
      assert_summery({ done: true })
      send(item, ["set_done", false])
      assert_summery({ done: false })
    })

    it ("can tell us the history of event", () => {
      const history = [
        ["set_label", "steve"],
        ["set_done", false],
        ["set_done", true],
        ["set_label", "bob"]
      ]

      for (let message of history) send(item, message)

      assert_history(history)
    })

    it ("history can be snapshotted", () => {
      const history = [
        ["set_label", "steve"],
        ["set_done", false],
        ["set_done", true],
        ["set_done", false],
        ["set_label", "bob"]
      ]

      for (let message of history) send(item, message)

      assert_history(history)
      assert_summery({label: "bob", done: false})

      send(item, ["snapshot"])
      assert_history([
        ["set_label", "bob"],
        ["set_done", false]
      ])
      assert_summery({label: "bob", done: false})
    })

    it ("can undo an event or two", () => {
      const history = [
        ["set_label", "steve"],
        ["set_label", "bob"]
      ]

      for (let message of history) send(item, message)
      send(item, ["set_label", "gary"])
      assert_summery({label: "gary"})
      send(item, ["undo"])
      assert_summery({label: "bob"})
      send(item, ["undo"])
      assert_summery({label: "steve"})
      send(item, ["undo"])
      assert_summery({})
      send(item, ["undo"])
      assert_summery({})
    })
  })
})
