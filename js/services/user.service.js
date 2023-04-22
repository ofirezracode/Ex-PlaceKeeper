'use strict'

let gUser = {
  email: '',
  name: '',
  birthDate: '',
  birthTime: '',
  age: '',
  bgColor: '',
  txtColor: '',
}

_initUser()

function _initUser() {
  const user = loadFromStorage('user')
  console.log('user', user)
  if (user) saveUserChanges(user)
}

function getUser() {
  return gUser
}

function saveUserChanges(user) {
  // Object.keys(user).forEach((property) => (gUser[property] = user[property]))
  gUser = user
  saveToStorage('user', gUser)
}
