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

document.addEventListener('click', loadCatFacts)