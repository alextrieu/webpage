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
const latitude = document.querySelector("[id='latitude']");
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
    // city.innerHTML = `City: ${data.results[8].address_components[1].long_name}`
    // country.innerHTML = `Country: ${data.results[12].address_components[0].long_name}`
    console.log(data);
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
}

const errorCallback = (error) => {
  console.error(error);
  errorMsg.innerHTML = "Permission Denied: Unable to access location";
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);