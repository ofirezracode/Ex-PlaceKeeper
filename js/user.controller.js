'use strict'

function onFormSubmit(e) {
  e.preventDefault()

  const user = {}

  const elName = document.querySelector('#pref-name')
  user.name = elName.value
  const elEmail = document.querySelector('#pref-email')
  user.email = elEmail.value
  const elBd = document.querySelector('#pref-bd')
  user.birthDate = elBd.value
  const elBt = document.querySelector('#pref-bt')
  user.birthTime = elBt.value
  const elAge = document.querySelector('#pref-age')
  user.age = elAge.value
  const elBgc = document.querySelector('#pref-bgc')
  user.bgColor = elBgc.value
  const elColor = document.querySelector('#pref-color')
  user.txtColor = elColor.value

  saveUserChanges(user)
  const elSaveStatus = document.querySelector('.save-status')
  elSaveStatus.innerText = 'Saved! moving you to home page...'
  setTimeout(() => (window.location.href = 'index.html'), 1500)
}

function onSliderInput(value) {
  const elAgeChosen = document.querySelector('.pref-age-chosen')
  elAgeChosen.innerText = `(${value})`
}
