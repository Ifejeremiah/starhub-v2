const slides = document.querySelectorAll('.carousel #img-slider img')
const dotContainer = document.querySelector('.con-dots')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const imgSlider = document.getElementById('img-slider')
const contents = document.querySelectorAll('.con-contents .content')
const textSlide = document.querySelector('.con-text .texts')
const texts = document.querySelectorAll('.con-text #text')
const buttonContainer = document.querySelector('.con-contents .con-arrow')


let idx = 0;

(function () {
  slides.forEach(() => {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dotContainer.appendChild(dot)
    changeDots()
  });

  if (slides.length > 1) {
    buttonContainer.classList.add('active');
  }

  changeImg()
  changeText()
  makeTextActive()
  animateOnTextClick()
}());

let _interval = setInterval(run, 4000)

function run() {
  idx++
  handleIndex()
  changeImg()
  changeText()
  slideText()
  makeTextActive()
  changeDots()
}

function resetInterval() {
  clearInterval(_interval)
  _interval = setInterval(run, 4000)
}

function slideText() {
  if (slides.length > 2) {
    textSlide.style.transform = `translateX(${-idx * 120}px)`;
  }
}

function animateOnTextClick() {
  let num = -1;
  texts.forEach(text => {
    num++;
    text.setAttribute('id', `text ${num}`)
  })

  texts.forEach(text => {
    text.addEventListener('click', (evt) => {
      idx = evt.target.getAttribute('id').split(' ')[1];
      slideText()
      changeImg()
      changeDots()
      changeText()
      handleIndex()
      makeTextActive()
      resetInterval()
    })
  })
}

function changeDots() {
  dotContainer.querySelectorAll('.dot').forEach(dot => {
    dot.classList.remove('active')
  })
  dotContainer.querySelectorAll('.dot')[idx].classList.add('active')
}

function handleIndex() {
  if (idx > slides.length - 1) {
    idx = 0
  } else if (idx < 0) {
    idx = slides.length - 1
  }
}

function makeTextActive() {
  texts.forEach(text => { text.classList.remove('active') })
  texts[idx].classList.add('active')
}

function changeText() {
  contents.forEach(content => { content.classList.remove('active') })
  contents[idx].classList.add('active');
}

function changeImg() {
  imgSlider.style.transform = `translateX(${-idx * 300}px)`
}

leftBtn.addEventListener('click', () => {
  idx--
  handleIndex()
  changeImg()
  changeText()
  changeDots()
  slideText()
  makeTextActive()
  resetInterval()
})

rightBtn.addEventListener('click', () => {
  idx++
  handleIndex()
  changeImg()
  changeText()
  changeDots()
  slideText()
  makeTextActive()
  resetInterval()
})
