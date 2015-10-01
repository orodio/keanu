import { send } from "../src"

function receive (message, history, self) {
  const [ type ] = message

  switch (type) {
    case "request_item":    return send_summery(message, history, self)
    case "request_history": return send_history(message, history, self)
    case "set_label":       return set_label(message, history)
    case "set_done":        return set_done(message, history)
    case "snapshot":        return destructive_snapshot(history)
    default:                return history
  }
}

function send_history (message, history, self) {
  const [ _type, pid ] = message
  send(pid, ["item_history", history, self])
  return history
}

function send_summery(message, history, self) {
  const [ _type, pid ] = message
  const summery = [ "item_summery", {...calc_summery(history), pid: self }, self ]
  send(pid, summery)
  return history
}

function calc_summery(history, acc={}) {
  if (!history.length) return acc;

  let [[ type, value ], ...rest] = history

  switch (type) {
    case "set_label": return calc_summery(rest, {...acc, label: value})
    case "set_done":  return calc_summery(rest, {...acc, done: value})
    default:          return calc_summery(rest, acc)
  }
}

function set_label (message, history) {
  return [...history, message]
}

function set_done (message, history) {
  return [...history, message]
}

function destructive_snapshot (history) {
  let new_history = []
  const summery = calc_summery(history)
  if (summery.label != null) new_history = [...new_history, ["set_label", summery.label]]
  if (summery.done  != null) new_history = [...new_history, ["set_done", summery.done]]
  return new_history
}

export default { receive }

