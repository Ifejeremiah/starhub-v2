const form = document.querySelector('.sub .forms form')
const msgCon = document.querySelector('.forms .msg')
const msgEl = document.getElementById('msgEl')
const entry = document.getElementById('entry')


form.addEventListener('submit', validate)
entry.addEventListener('input', () => { displayMsg('none') })

function validate(evt) {
  const input = entry.value.trim()
  evt.preventDefault()

  if (!input) {
    displayMsg('error')
  } else {
    makeRequest(input)
  }
}

function displayMsg(type, body) {
  if (type === 'error') {
    msgEl.innerHTML = body ? body : 'Email address is required to subscribe'
    msgEl.classList.remove('success')
    msgEl.classList.add('error')
    msgCon.classList.add('show')

  } else if (type === 'success') {
    msgEl.innerHTML = body ? body : 'You have just subscribed for our weekly newsletters'
    msgEl.classList.remove('error')
    msgEl.classList.add('success')
    msgCon.classList.add('show')

  } else if (type === 'none') {
    msgEl.innerHTML = ''
    msgEl.classList.remove('error')
    msgEl.classList.remove('success')
    msgCon.classList.remove('show')
  }
}

function makeRequest(input) {
  const postBody = {
    email: input
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postBody),
  };

  fetch('/', options)
    .then(data => {
      if (data.status !== 201) {
        displayMsg('error', 'Email is already registered')
      } else {
        entry.value = ''
        displayMsg('success')
      }
    })
}