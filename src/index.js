import isEqual from "lodash/lang/isEqual"
import PS from "./process"

let xs = {}

export function spawn (module, func, init) {
  const x = new PS(module, func, init)
  xs[x.pid] = x
  return x.pid
}

export function send (pid, message) {
  if (xs[pid] == null) throw new Error(`Tried to send ${ JSON.stringify(message) } to a process that doesnt exist`)
  return xs[pid].send(message)
}

export function test_pid () {
  return spawn({receive (e, _es) { return e }})
}

function s(v) { return JSON.stringify(v) }

export function assert_receive (pid, message) {
  const v1 = message
  const v2 = xs[pid].state
  if (!isEqual(v1, v2)) throw new Error(`assert_receive: expected: ${ s(v1) }, got: ${ s(v2) }`)
  return true
}

export function kill (...pids) {
  for (let pid of pids) delete xs[pid]
}
