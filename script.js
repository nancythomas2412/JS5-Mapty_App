'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
  constructor() {}
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function () {
        alert('Could not get your location!');
      });
    }
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    //code from Leaflet site is given below
    map = L.map('map').setView(coords, 13); //the number here is the zoom level, i think 18(maximum) and 13(minimum)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // it was .org before .fr/hot, this is to change the theme of map
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //handling click on map
    map.on('click', function (mapE) {
      //on is from leaflet library, not just from js
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
    // Leaflet code ends here //
  }
  _showForm() {}
  _toggleElevetionField() {}
  _newWorkout() {}
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  //clear input fields
  inputDistance.value =
    inputDuration.value =
    inputElevation.value =
    inputCadence.value =
      '';
  //Display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
