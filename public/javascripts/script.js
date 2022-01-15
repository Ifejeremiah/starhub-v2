$(function () {

  // Year Stamp
  $('.copyrights .yearstamp').text(new Date().getFullYear());

  // Navbar Menu
  const $menu = $('.con-menu');

  $('.navbar .con-toggle').on('click', function () {
    $('.toggle').toggleClass('active');
    $menu.toggleClass('active');
  });

  if (location.pathname === '/') {
    $('.con-menu .menu ul li#home').addClass('active');
  } else {
    $('.con-menu .menu ul li#' + location.pathname.split('/')[1]).addClass('active');
  }

  // For Navigation Bar
  const $window = $(window);
  const $navbar = $('.con-navbar');

  $window.on('scroll', function () {
    if ($window.scrollTop() >= 50) {
      $navbar.addClass('active');
    } else {
      $navbar.removeClass('active');
    }
  });

  if (location.pathname === '/') {
    $('.con-navbar .navbar .links ul a li#home').addClass('active');
  } else {
    $('.con-navbar .navbar .links ul a li#' + location.pathname.split('/')[1]).addClass('active');
  }

  //  For Back To Top Button On Scroll
  const $btn = $('.con-top-btn');

  $window.on('scroll', function () {
    if ($window.scrollTop() >= 200) {
      $btn.fadeIn(100);
    } else {
      $btn.fadeOut(400);
    }
  });

  // For Back To Top Button
  $btn.on('click', function () {
    $window.scrollTop(0);
  });

  // For User Subscription
  const $input = $('#email');
  const $conServerMsg = $('.subscribe form .server-msg');
  const $serverMsg = $('form .server-msg p');
  const $form = $('.subscribe form');
  const $formElement = $('.con-subscribe form .form-element');

  $form.on('submit', function (evt) {
    evt.preventDefault();
    if (!$input.val()) {
      $conServerMsg.removeClass('success-msg');
      $conServerMsg.addClass('error-msg');
      $formElement.addClass('error');
      $serverMsg.text('Email is required to subscribe');
    }
    $input.on('focus', function () {
      $conServerMsg.removeClass('error-msg');
      $formElement.removeClass('error');
      $conServerMsg.removeClass('success-msg');
    });
    if ($input.val()) {
      $.ajax({
        url: '/',
        type: 'POST',
        data: $form.serialize(),
        success: function () {
          $conServerMsg.removeClass('error-msg');
          $formElement.removeClass('error');
          $conServerMsg.addClass('success-msg');
          $serverMsg.text('You have just registered for our weekly newsletter');
          $input.val('');
        },
        error: function () {
          $conServerMsg.removeClass('success-msg');
          $conServerMsg.addClass('error-msg');
          $formElement.addClass('error');
          $serverMsg.text('That email is already registered');
        }
      })
    }
  });
});