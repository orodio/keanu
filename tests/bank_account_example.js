import { send } from "../src"

export function receive (event, events) {
  const [ type ] = event
  switch (type) {
    case "check_balance": return send_balance(event, events);
    case "withdraw":      return withdraw(event, events);
    case "deposit":       return deposit(event, events);
    case "snapshot":      return destructive_snapshot(events);
    default:              return events
  }
}

export function send_balance(event, events) {
  send(event[1], ["balance", calc_balance(events)])
  return events
}

export function calc_balance (events, acc=0) {
  if (!events.length) return acc

  let [[ type, amount ], ...rest] = events

  switch (type) {
    case "deposit":  return calc_balance(rest, acc + amount)
    case "withdraw": return calc_balance(rest, acc - amount)
    default:         return calc_balance(rest, acc)
  }
}

export function deposit (event, events) {
  return [...events, event]
}

export function withdraw (event, events) {
  const [ type, amount ] = event
  const balance = calc_balance(events)
  if (balance >= amount) return [...events, event]
  return [...events, [`INVALID -- ${ type }`, event , "Insuficient Funds"]]
}

export function destructive_snapshot (events) {
  return [["deposit", calc_balance(events)]]
}

export default { receive }
