const yearEl = document.getElementById('yearstamp')
const topBtn = document.querySelector('.con-top-btn')


yearEl.innerText = new Date().getFullYear()

window.addEventListener('scroll', showOnScroll)

topBtn.addEventListener('click', scrollTop)


function showOnScroll() {
  if (window.scrollY > 200) {
    topBtn.classList.add('show')
  } else {
    topBtn.classList.remove('show')
  }
}

function scrollTop() {
  window.scrollTo(0, 0)
}