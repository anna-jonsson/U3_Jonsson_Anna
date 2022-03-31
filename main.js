//Link to Github repository: https://github.com/anna-jonsson/U3_Jonsson_Anna

//Global variable for button and event listener to handle dark mode / light mode

let themeBtn = document.querySelector('button')
let body = document.querySelector('body')

themeBtn.addEventListener('click', function () {
  body.classList.toggle('theme')
  themeBtn.classList.toggle('themeBtn')
  setTheme()
})

function setTheme () {
  if (body.className.includes('theme')) {
    localStorage.setItem('dark-mode', 'true')
  } else {
    localStorage.setItem('dark-mode', 'false')
  }
}

window.onload = function () {
  document.querySelector('input').value = ''

  let theme = localStorage.getItem('dark-mode')

  if (theme == 'true') {
    body.classList.add('theme')
    themeBtn.classList.add('themeBtn')
  }
}
