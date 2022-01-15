(function () {
  // For Countdown

  // Process Every Future Sundays
  const _now = new Date();
  const _sunday = new Date();
  _sunday.setDate(_now.getDate() - _now.getDay()); // Make Sunday
  _sunday.setHours(9); // Set 9am
  _sunday.setMinutes(0);
  _sunday.setSeconds(0);
  _sunday.setMilliseconds(0);
  if (_sunday < _now) _sunday.setDate(_sunday.getDate() + 7); // Make sure it's a future sunday
  millisecondsLeft = _sunday - _now;


  const countdown = document.querySelector(".countdown h1");
  const countDownDate = _sunday.getTime();

  // Update the count down every 1 second
  const x = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element 
    countdown.innerHTML = days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ";

    // If the count down is over, write some text 
    if (distance < 1) {
      clearInterval(x);
      countdown.innerHTML = "<b>Can\'t Take Registerations Today.</b>";
    }
  }, 1000);
}())