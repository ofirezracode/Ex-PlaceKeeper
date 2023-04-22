'use strict'

let map
let mapZoomLevel = 13
let mapClickEvent

function onInit() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      _loadMap(position)
      panHome(position)

      _renderAll(changePage({ setPage: 0 }))
    },
    () => {
      alert('Could not get your position')
    }
  )
}

function _renderAll(pagination) {
  _renderMapMarkers()
  _renderPlacesList()
  _renderPagination(pagination)
}

function _loadMap(position) {
  const { latitude, longitude } = position.coords

  map = L.map('map').setView([latitude, longitude], mapZoomLevel)
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  map.on('click', _onMapClick)
}

function _renderPlacesList() {
  const places = getPlaces()
  const placeHTML = places
    .map(
      (place) =>
        `
  <li onclick="panToPlace('${place.id}')" class="place-container">
    <p class="place-name">${place.name}</p>
    <button onclick="removeItemFromPlaces(event,'${place.id}')" class='btn place-remove-btn'>x</button>
  </li>
  `
    )
    .join('')

  const elPlaces = document.querySelector('.places')
  elPlaces.innerHTML = placeHTML
}

function _renderMapMarkers() {
  const places = getPlaces(true)
  console.log('places', places)
  if (places) places.forEach((place) => _renderPlaceMarker(place))
}

function _renderPlaceMarker(place) {
  L.marker([place.lat, place.lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: true,
        className: 'place-popup',
      })
    )
    .setPopupContent(place.name)
    .openPopup()
}

function onEscKeyPress() {
  const elForm = document.querySelector('.item-places form')
  elForm.classList.add('hidden')
  mapClickEvent = null
  toggleEscKeyFunctionality(false)
}

function toggleEscKeyFunctionality(active) {
  if (active) {
    document.addEventListener('keyup', escKeyHandler)
  } else {
    document.removeEventListener('keyup', escKeyHandler)
  }
}

function escKeyHandler(event) {
  if (event.key === 'Escape') {
    onEscKeyPress()
  }
}

function _onMapClick(e) {
  const elForm = document.querySelector('.item-places form')
  elForm.classList.remove('hidden')
  mapClickEvent = e

  const elPlaceName = document.querySelector('.place-name')
  elPlaceName.focus()

  toggleEscKeyFunctionality(true)
}

function onPlaceFormSubmit(e) {
  e.preventDefault()
  const elPlaceName = document.querySelector('.place-name')
  let name = elPlaceName.value.trim()
  if (name === '') name = 'Your Place Marker'

  const { lat, lng } = mapClickEvent.latlng

  const elForm = document.querySelector('.item-places form')
  elForm.classList.add('hidden')

  addPlace(name, lat, lng, map.getZoom())

  _renderAll()
}

function onPanHome() {
  navigator.geolocation.getCurrentPosition(panHome, () => {
    alert('Could not get your position')
  })
}

function panHome(position) {
  const { latitude, longitude } = position.coords
  pan(latitude, longitude)
  const marker = new L.marker([latitude, longitude]).addTo(map).bindPopup('You are here.').openPopup()
  setTimeout(() => {
    map.removeLayer(marker)
  }, 2000)
}

function panToPlace(placeId) {
  const place = getPlaceById(placeId)
  pan(place.lat, place.lng)
}

function pan(lat, lng, zoom = mapZoomLevel) {
  map.setView([lat, lng], zoom, {
    animate: true,
    pan: {
      duration: 1,
    },
  })
}

function removeItemFromPlaces(e, placeId) {
  e.stopPropagation()
  removePlace(placeId)

  _renderAll()
}

function downloadCSV(el) {
  const csvContent = getAsCSV()
  el.href = 'data:text/csv;charset=utf-8,' + csvContent
}

function onPageChange(change) {
  const pagination = changePage(change)
  if (pagination.pageChanged) {
    _renderPlacesList()
    _renderPagination(pagination)
  }
}

function _renderPagination(pagination) {
  let paginationHTML = ''
  if (!pagination) pagination = changePage()
  paginationHTML = pagination.pages
    .map((page) => {
      if (page !== null) {
        return `<button onclick='onPageChange({setPage:${page}})' class="btn pagination-btn">${page + 1}</button>`
      }
    })
    .join('')
  const elPaginationPages = document.querySelector('.pagination-pages')
  elPaginationPages.innerHTML = paginationHTML

  const elPaginationBtnBack = document.querySelector('.pagination-back')
  elPaginationBtnBack.disabled = pagination.pages[0] === null
  const elPaginationBtnNext = document.querySelector('.pagination-next')
  elPaginationBtnNext.disabled = pagination.pages[2] === null
}
