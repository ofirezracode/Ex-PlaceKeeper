'use strict'

/*******************************/
/*Matrix methods*/
/*******************************/

function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

function getAmountOfNeighboursContaining(BOARD, ROW, COL, ITEM) {
  var amount = 0
  for (var i = ROW - 1; i <= ROW + 1; i++) {
    if (i < 0 || i > BOARD.length - 1) continue
    for (var j = COL - 1; j <= COL + 1; j++) {
      if (j < 0 || j > BOARD[i].length - 1 || (i === ROW && j === COL)) continue
      if (BOARD[i][j] === ITEM) amount++
    }
  }
  return amount
}
function getAmountOfCellsContaining(BOARD, ITEM) {
  var amount = 0
  for (var i = 0; i < BOARD.length; i++) {
    for (var j = 0; j < BOARD[i].length; j++) {
      if (BOARD[i][j] === ITEM) amount++
    }
  }
  return amount
}

/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getRandomOrderNumbersArray(MAX) {
  const nums = getArrayWithAscNums(MAX)
  var res = []
  for (var i = 0; i < MAX; i++) {
    res[i] = drawNum(nums)
  }
  return res
}

function getArrayWithAscNums(max) {
  var numbers = []
  for (var i = 0; i < max; i++) {
    numbers[i] = i + 1
  }
  return numbers
}

function makeId(length = 6) {
  var id = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    id += possible.charAt(getRandomInt(0, possible.length))
  }

  return id
}

function makeLorem(wordCount = 100) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

/*******************************/
/*Local Storage*/
/*******************************/
function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

/*******************************/
/*Misc*/
/*******************************/

function drawNum(nums) {
  return nums.splice(getRandomInt(0, nums.length), 1)[0]
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString().slice(-2)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`
}
