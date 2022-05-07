export function dateHandler(payload) {
  if (payload === 'default') {
    const date = new Date(),
      day = date.getDay() + 1,
      month = date.getMonth() + 1,
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds()

    return `<div><b>${hour}:${minute}:${second}</b> ${day}-${month}-${year}</div>`
  } else {
    const date = new Date(payload),
      day = date.getDay() + 1,
      month = date.getMonth() + 1,
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds()

    return `<div><b>${hour}:${minute}:${second}</b> ${day}-${month}-${year}</div>`
  }
}
