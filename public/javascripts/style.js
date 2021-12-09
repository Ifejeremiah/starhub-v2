$(function () {

  // Year Stamp
  $('.copyrights .yearstamp').text(new Date().getFullYear());

  // Navbar Menu
  const $menu = $('.con-menu');

  $('.navbar .con-toggle').on('click', function () {
    $('.toggle').toggleClass('active');
    $menu.toggleClass('active');
  });

  // Animation For Navigation Bar
  const $window = $(window);
  const $navbar = $('.con-navbar');

  $window.on('scroll', function () {
    if ($window.scrollTop() >= 50) {
      $navbar.addClass('active');
    } else {
      $navbar.removeClass('active');
    }
  });

  // Animation For Back To Top Button On Scroll
  const $btn = $('.con-top-btn');

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
  const countdown = document.querySelector(".countdown h1");
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

  // For User Subscription
  const $input = $('#email');
  const $conServerMsg = $('.subscribe form .server-msg');
  const $serverMsg = $('form .server-msg p');
  const $form = $('.subscribe form');

  $form.on('submit', function (evt) {
    evt.preventDefault();
    if (!$input.val()) {
      $conServerMsg.removeClass('success-msg');
      $conServerMsg.addClass('error-msg');
      $serverMsg.text('Email is required to subscribe');
    }
    $input.on('focus', function () {
      $conServerMsg.removeClass('error-msg');
      $conServerMsg.removeClass('success-msg');
    });
    if ($input.val()) {
      $.ajax({
        url: '/',
        type: 'POST',
        data: $form.serialize(),
        success: function () {
          $conServerMsg.removeClass('error-msg');
          $conServerMsg.addClass('success-msg');
          $serverMsg.text('You have just registered for our weekly newsletter');
          $input.val('');
        },
        error: function () {
          $conServerMsg.removeClass('success-msg');
          $conServerMsg.addClass('error-msg');
          $serverMsg.text('That email is already registered');
        }
      })
    }
  });
});