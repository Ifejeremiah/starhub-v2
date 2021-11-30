$(function () {
  // Year Stamp
  $('.copyrights .yearstamp').text(new Date().getFullYear());

  // Navbar Menu
  $('.navbar .con-toggle').on('click', function () {
    $('.toggle').toggleClass('active');
    $('.con-menu').toggleClass('active');
  });
});