'use strict'

function onHomeInit() {
  const user = getUser()
  if (user.email) changeColors(user.bgColor, user.txtColor)
}

function changeColors(bgColor, txtColor) {
  const elBody = document.querySelector('body')
  elBody.style.backgroundColor = bgColor
  elBody.style.color = txtColor
}
