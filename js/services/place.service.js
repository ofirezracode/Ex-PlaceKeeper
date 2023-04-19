'use strict'

let gPlaces
let gPageIdx = 0
let gPagesAmount = 0
const PAGE_SIZE = 7

_createPlaces()

function _createPlaces() {
  const places = loadFromStorage('places')
  if (places) {
    gPlaces = places
  } else {
    gPlaces = []
  }
  gPagesAmount = Math.ceil(gPlaces.length / PAGE_SIZE)
}

function _createPlace(name, lat, lng, zoom) {
  return {
    id: makeId(),
    name,
    lat,
    lng,
    zoom,
  }
}

function getPlaces() {
  gPagesAmount = Math.ceil(gPlaces.length / PAGE_SIZE)
  const startIdx = gPageIdx > gPagesAmount ? 0 : gPageIdx * PAGE_SIZE
  return gPlaces.slice(startIdx, startIdx + PAGE_SIZE)
}

function removePlace(placeId) {
  gPlaces = gPlaces.filter((place) => place.id !== placeId)
  saveToStorage('places', gPlaces)
}

function addPlace(name, lat, lng, zoom) {
  const place = _createPlace(name, lat, lng, zoom)
  gPlaces.unshift(place)
  saveToStorage('places', gPlaces)
  return place
}

function getPlaceById(placeId) {
  return gPlaces.find((place) => place.id === placeId)
}

function getAsCSV() {
  let csvStr = `id, name, lat, lng, zoom`
  gPlaces.forEach((place) => {
    const csvLine = `\n${place.id}, ${place.name}, ${place.lat}, ${place.lng}, ${place.zoom}`
    csvStr += csvLine
  })
  return csvStr
}

function changePage(change = { setPage: gPageIdx }) {
  let pageChanged = true
  if (change.direction && gPageIdx + change.direction < gPagesAmount && gPageIdx + change.direction >= 0) {
    gPageIdx += change.direction
  } else if (!isNaN(change.setPage) && change.setPage < gPagesAmount && change.setPage >= 0) {
    gPageIdx = change.setPage
  } else {
    pageChanged = false
  }

  return {
    pageChanged,
    currPage: gPageIdx,
    pages: [gPageIdx - 1 < 0 ? null : gPageIdx - 1, gPageIdx, gPageIdx + 1 < gPagesAmount ? gPageIdx + 1 : null],
  }
}
