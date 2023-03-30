const calTime = (date: string) => {
  const oldDate = new Date(date)
  const nowDate = new Date()
  const diff = nowDate.getTime() - oldDate.getTime()
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24
  let message = null
  if (diff < second) {
    message = "0 second ago"
  } else if (diff < minute) {
    message = `${diff} seconds ago`
  } else if (diff < hour) {
    message = `${Math.floor(diff / minute)} minutes ago`
  } else if (diff < day) {
    message = `${Math.floor(diff / hour)} hours ago`
  } else {
    message = `${Math.floor(diff / day)} days ago`
  }

  return message
}

export default calTime
