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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
          console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
          

          const coords = [latitude, longitude];

      //code from Leaflet site is given below
      const map = L.map('map').setView(coords, 13); //the number here is the zoom level, i think 18(maximum) and 13(minimum)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {// it was .org before .fr/hot, this is to change the theme of map
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
      // Leaflet code ends here //
    },
    function () {
      alert('Could not get your location!');
    }
  );
}
