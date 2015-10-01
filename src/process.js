export default class PS {
  constructor (module, receiver="receive", initial_state=[]) {
    this.pid = Symbol()
    this.receiver = module[receiver].bind(module)
    this.state = initial_state
  }

  send (message) {
    this.state = this.receiver(message, this.state);
  }
}
