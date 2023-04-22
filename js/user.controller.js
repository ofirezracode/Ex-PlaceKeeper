'use strict'

function onFormSubmit(e) {
  e.preventDefault()

  const elInputs = Array.from(document.querySelectorAll('form input'))

  const user = elInputs.reduce((acc, elInput) => {
    acc[elInput.id] = elInput.value
    return acc
  }, {})

  saveUserChanges(user)
  const elSaveStatus = document.querySelector('.save-status')
  elSaveStatus.innerText = 'Saved! moving you to home page...'
  setTimeout(() => (window.location.href = 'index.html'), 1500)
}

function onSliderInput(value) {
  const elAgeChosen = document.querySelector('.pref-age-chosen')
  elAgeChosen.innerText = `(${value})`
}
