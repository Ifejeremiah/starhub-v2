const mainCon = document.querySelector('.main-container')
const navbar = document.querySelector('.con-navbar')
const firstMenu = document.getElementById('first-menu')
const secondMenu = document.getElementById('second-menu')


firstMenu.addEventListener('click', slideLeft)

secondMenu.addEventListener('click', slideRight)

window.addEventListener('scroll', opacityOnScroll)

function slideLeft() {
  const run = setTimeout(slideOpen, 1)
}

function slideRight() {
  secondMenu.classList.remove('active')
  firstMenu.classList.add('active')
  mainCon.classList.remove('slide-left')
}

function slideOpen() {
  firstMenu.classList.remove('active')
  secondMenu.classList.add('active')
  mainCon.classList.add('slide-left')
}

unslide()

function unslide() {
  document.addEventListener('click', slideClose)
}

function slideClose(evt) {
  const target = evt.target.closest('.main-container')
  const hasSlide = mainCon.getAttribute('class').split(' ')[1] === 'slide-left'

  if (hasSlide && target) {
    slideRight()
  }
}

function opacityOnScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('active')
  } else {
    navbar.classList.remove('active')
  }
}