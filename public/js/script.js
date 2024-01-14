// Global Variable used to store the quotes 
// fetched from the API 
var data; 
let front = true; 

// Getting the front and the back author boxes 
const authors = document.querySelectorAll(".author"); 

// Getting the front and the back texts 
const texts = document.querySelectorAll(".text"); 

// Getting the body 
const body = document.getElementById("body"); 

// Getting the buttons 
const button = document.querySelectorAll(".new-quote"); 

const blockFront = document.querySelector(".block__front"); 
const blockBack = document.querySelector(".block__back"); 

const authorFront = authors[0]; 
const authorBack = authors[1]; 

const textFront = texts[0]; 
const textBack = texts[1]; 

const buttonFront = button[0]; 
const buttonBack = button[1]; 


// An arrow function used to get a quote randomly 
const displayQuote = () =>{ 

	// Generates a random number between 0 
	// and the length of the dataset 
	let index = Math.floor(Math.random()*data.length); 

	// Stores the quote present at the randomly generated index 
	let quote = data[index].content; 

	// Stores the author of the respective quote 
	let author = data[index].author; 

	// Making the author anonymous if no author is present 
	if(!author){ 
		author = "Anonymous"
	} 

	// Replacing the current quote and the author with a new one 

	if(front){ 
		// Changing the front if back-side is displayed 
		textFront.innerHTML = quote; 
		authorFront.innerHTML = author; 
    
	}else{ 
		// Changing the back if front-side is displayed 
		textBack.innerHTML = quote; 
		authorBack.innerHTML = author; 
	} 
	
	front = !front; 

} 

fetch('https://api.quotable.io/quotes/random?limit=200')
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            this.data = data;

            displayQuote();
        })


// Adding an onclick listener for the button 
function newQuote(){ 
	
	// Rotating the Quote Box 
	blockBack.classList.toggle('rotateB'); 
	blockFront.classList.toggle('rotateF'); 

	// Displaying a new quote when the webpage loads 
	displayQuote(); 
}

//signup form
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
