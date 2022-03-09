const timestamp = document.getElementById('timestamp')

const interval = setInterval(attach, 1000)

function setSunday() {
  const today = new Date(), lastSunday = new Date;
  lastSunday.setDate(today.getDate() - today.getDay());

  if (today > lastSunday) {
    lastSunday.setDate(lastSunday.getDate() + 7)
  }
  setTime(lastSunday, 9)
  return lastSunday.getTime()
}

function setTime(day, hour) {
  day.setHours(hour)
  day.setMinutes(0)
  day.setSeconds(0)
  day.setMilliseconds(0)
}

function calculateTime() {
  const interval = setSunday() - new Date().getTime()
  const days = Math.floor(interval / (1000 * 60 * 60 * 24))
  const hours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((interval % (1000 * 60)) / 1000);

  return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
}

function attach() { timestamp.innerHTML = calculateTime() }

