'use strict'

const gUser = {
  email: '',
  name: '',
  birthDate: '',
  birthTime: '',
  age: '',
  bgColor: '',
  txtColor: '',
  isInitialized: false,
}

onInit()

function onInit() {
  const user = loadFromStorage('user')
  console.log('user', user)
  if (user) saveUserChanges(user)
}

function getUser() {
  return gUser
}

function saveUserChanges(user) {
  Object.keys(user).forEach((property) => (gUser[property] = user[property]))
  gUser.isInitialized = true
  saveToStorage('user', gUser)
}
