import { spawn, send } from "./src/process"

let bob = {
  receive (events, event) {
    return [...events, event]
  }
}

describe("Process", () => {
  describe("spawn and alive?", () => {
    let b = spawn(bob, "receive", [])
  })
})
