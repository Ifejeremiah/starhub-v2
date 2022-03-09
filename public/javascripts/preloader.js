const fadeElemt = document.getElementById('fadeIn')
const section = document.querySelector('.con-preload')

setTimeout(fadeIn, 7000)

setTimeout(removePreload, 9600)

function fadeIn() {
  fadeElemt.classList.add('show');
}

function removePreload() {
  section.classList.add('remove')
}