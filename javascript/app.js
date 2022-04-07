const redText = document.getElementById('red-header');
const blueText = document.getElementById('blue-header');
const pinkText = document.getElementById('pink-header');
const greenText = document.getElementById('green-header');
const colors = ["red", "blue", "pink", "green"];

const headerBlocks = [redText, blueText, pinkText, greenText];

function setHeaderColor() {
  for (let i = 0; i < headerBlocks.length; i++) {
    for (let i = 0; i < colors.length; i++) {
      headerBlocks[i].style.color = colors[i];
    }
  }
  
  const button = document.getElementById("introduction-header-btn");
  button.addEventListener("mouseover", function( event ) {
      event.target.style.background = "green";
        setTimeout(function() {
        event.target.style.background = "";
      }, 400);
    }, false);
}

// Dialog

const dialog = document.querySelector('.dialog');
const dialogContainer = document.querySelector('.dialog-container')
const navbar = document.querySelector('.fa-bars');
const exitDialog = document.querySelector('.exit-btn');

function dialogDisplay() {
  navbar.addEventListener('click', function() {
    dialog.style.visibility = "visible";
    dialogContainer.style.visibility = "visible";
  });
  
  exitDialog.addEventListener("click", function() {
      dialog.style.visibility = "hidden";
      dialogContainer.style.visibility = "visible";
  });
}

// DOMContentLoaded with multiple function calls

window.addEventListener('DOMContentLoaded', function() {
  dialogDisplay();
  setHeaderColor();
});

// Promise API

const CAT_FACTS_URL = 'https://catfact.ninja/fact';
const catFacts = document.getElementById('cat-facts')
const catFactsBtn = document.querySelector('.about-learn-btn');

// loading div

const loader = document.querySelector('#loading');

function displayLoading() {
  loader.classList.add('display');
}

function hideLoading() {
  loader.classList.remove('display');
}

function loadCatFacts() {
  displayLoading()
  fetch(CAT_FACTS_URL)
  .then( response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    // hideLoading()
    return response.json();
  })
  .then( json => {
    catFacts.innerText = json.fact;
    hideLoading()
  });
}

catFactsBtn.addEventListener('click', loadCatFacts)

/* Google Maps */

const map = document.getElementById('map');
const city = document.getElementById('city');
const country = document.getElementById('country');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const errorMsg = document.getElementById('error');

const mapKey = 'AIzaSyBm9X31mMtaVcWMdMT5z2yA8fSKMgjy-ug';
const geoKey = 'AIzaSyD2V9V-KLPmdmSVoh-8pbaCQX5B0sxUhC0';

function successCallback(position) {
  const userLatitude = position.coords.latitude;
  const userLongitude = position.coords.longitude;
  map.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${userLatitude},${userLongitude}&zoom=14&size=400x400&key=${mapKey}`);
  latitude.innerHTML = `Latitude: ${userLatitude}`;
  longitude.innerHTML = `Longitude: ${userLongitude}`;

  fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${geoKey}`)
  .then(response => response.json())
  .then(data => {
    let parts = data.results[0].address_components;
    parts.forEach(part => {
      if (part.types.includes("country")) {
        country.innerHTML = `Country: ${part.long_name}`
      }
    });
    parts.forEach(part => {
      if (part.types.includes("locality")) {
        city.innerHTML = `City: ${part.long_name}`
      }
    });
  })

  /* Weather API */
  const weatherKey = '3ee574c55914c5d49a060ef299e6985e';
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=${weatherKey}&units=metric`
  const weatherIcon = document.getElementById('weather-icon');
  const currentWeather = document.getElementById('current-weather')
  const degreeCelcius = document.getElementById('degrees');
  const humidity = document.getElementById('humidity');
  const visibility = document.getElementById('visibility');
  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');

  fetch(weatherAPI)
  .then(response => response.json())
  .then(data => {
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
    currentWeather.innerHTML = data.weather[0].main;
    // remove decimal points
    const removedDecimalTemp = Math.trunc(data.main.temp)
    degreeCelcius.innerHTML = `${removedDecimalTemp} °C`;
    humidity.innerHTML = `Humidity ${data.main.humidity}%`;
    // metres to km conversion 
    const km = data.visibility / 1000;
    visibility.innerHTML = `Visibility ${km.toFixed()}KM`;
    // unix to local time conversion 
    function conversion(unix) {
      let unix_timestamp = unix
      var date = new Date(unix_timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      return formattedTime;
    }

    const sunriseTime = conversion(data.sys.sunrise).slice(0, -3);
    const sunsetTime = conversion(data.sys.sunset).slice(0, -3);
    sunrise.innerHTML = `Sunrise ${sunriseTime}AM`;
    sunset.innerHTML = `Sunset ${sunsetTime}PM`;
  });
  
}

const errorCallback = (error) => {
  errorMsg.innerHTML = "Permission Denied: Unable to access location";
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


