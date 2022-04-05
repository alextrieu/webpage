
// const redText = document.getElementById('red-header').style.color = "red";
// const blueText = document.getElementById('blue-header').style.color = "blue";
// const pinkText = document.getElementById('pink-header').style.color = "pink";
// const greenText = document.getElementById('green-header').style.color = "green";


// retrieve the child elements from #header1  
// let header = document.getElementById("header1").querySelectorAll("span");


const redText = document.getElementById('red-header');
const blueText = document.getElementById('blue-header');
const pinkText = document.getElementById('pink-header');
const greenText = document.getElementById('green-header');
const colors = ["red", "blue", "pink", "green"];

const headerBlocks = [redText, blueText, pinkText, greenText];

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


// Dialog

const dialog = document.querySelector('.dialog');
const dialogContainer = document.querySelector('.dialog-container')
const navbar = document.querySelector('.fa-bars');
const exitDialog = document.querySelector('.exit-btn');

navbar.addEventListener('click', function() {
  dialog.style.visibility = "visible";
  dialogContainer.style.visibility = "visible";
});

exitDialog.addEventListener("click", function() {
    dialog.style.visibility = "hidden";
    dialogContainer.style.visibility = "visible";
});


// Promise API

const CAT_FACTS_URL = 'https://catfact.ninja/fact';
const catFacts = document.getElementById('cat-facts')

fetch(CAT_FACTS_URL)
  .then( response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then( json => {
    catFacts.innerText = json.fact;
  });