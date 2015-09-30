let processes = {}

function PS (module, func, store) {
  this.pid = Symbol()
  this.module = module
  this.func = module[func]
  this.store = store
  this.mailbox = []
  this.idle = true
}

PS.prototype = {
  get_pid () { return this.pid },

  add_to_mailbox (message) {
    this.mailbox.push(message)

    if (this.idle) this.empty_mailbox()
    return true
  },

  empty_mailbox () {
    if (this.mailbox.length < 1) {
      this.idle = true
      return true
    }

    this.idle = false
    let message = this.mailbox.pop()
    this.store = this.func.call(this.module, this.store, message)

    this.empty_mailbox()
  }
}

export function spawn (module, func, init) {
  let process = new PS(module, func, init)
  return process.get_pid()
}

export function send (pid, message) {
  if (processes[pid] == null) return false
  return processes[pid].add_to_mailbox(message)
}
