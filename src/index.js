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

export function assert_receive (pid, message) {
  const v1 = JSON.stringify(message)
  const v2 = JSON.stringify(xs[pid].state)
  if (v1 !== v2) throw new Error(`assert_receive: expected: ${ v1 }, got: ${ v2 }`)
  return true
}

export function kill (...pids) {
  for (let pid of pids) delete xs[pid]
}
