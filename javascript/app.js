console.log('Hello, World!');


// .headers > h1 
// store in array
// for each word in the array, assign it a random color 


const redText = document.getElementById('red-header').style.color = "red";
const blueText = document.getElementById('blue-header').style.color = "blue";
const pinkText = document.getElementById('pink-header').style.color = "pink";
const greenText = document.getElementById('green-header').style.color = "green";


const button = document.getElementById("introduction-header-btn");
button.addEventListener("mouseover", function( event ) {
    event.target.style.background = "green";
      setTimeout(function() {
      event.target.style.background = "";
    }, 400);
  }, false);

  