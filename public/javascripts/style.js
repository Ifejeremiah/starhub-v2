$(function () {
  const $window = $(window);
  const $menu = $('.con-menu');
  const $navbar = $('.con-navbar');
  const $btn = $('.con-top-btn');
  const countdown = document.querySelector(".countdown h1");

  // Year Stamp
  $('.copyrights .yearstamp').text(new Date().getFullYear());

  // Navbar Menu
  $('.navbar .con-toggle').on('click', function () {
    $('.toggle').toggleClass('active');
    $menu.toggleClass('active');
  });

  // Animation For Navigation Bar
  $window.on('scroll', function () {
    if ($window.scrollTop() >= 50) {
      $navbar.addClass('active');
    } else {
      $navbar.removeClass('active');
    }
  });

  // Animation For Back To Top Button On Scroll
  $window.on('scroll', function () {
    if ($window.scrollTop() >= 200) {
      $btn.fadeIn(100);
    } else {
      $btn.fadeOut(400);
    }
  });

  // Animation For Back To Top Button
  $btn.on('click', function () {
    $window.scrollTop(0);
  });


  // Animation for countdown
  const countDownDate = new Date("Dec 12, 2021 01:00:00").getTime();

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
});