$(function () {
  const $window = $(window);
  const $menu = $('.con-menu');
  const $navbar = $('.con-navbar');
  const $btn = $('.con-top-btn');

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

});