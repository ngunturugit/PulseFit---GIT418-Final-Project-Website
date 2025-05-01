const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name");

// Fetch and display a random quote
function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";

  fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(result => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;  // Ensure the author's name updates
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "Motivate Me";
    })
    .catch(error => {
      console.error("Error fetching quote:", error);
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "Try Again";
    });
}

// Generate a new quote on button click
quoteBtn.addEventListener("click", randomQuote);

// Load an initial quote when the page is loaded
document.addEventListener("DOMContentLoaded", randomQuote);

// Ensure only one "New Quote" button exists in the DOM
const existingButton = document.querySelector(".quote-button");
if (!existingButton) {
  const quoteButton = document.createElement("button");
  quoteButton.classList.add("quote-button");
  quoteButton.innerText = "New Quote";
  document.body.appendChild(quoteButton); // Append the button to the body or a specific container
}

// Accordion functionality using jQuery
$(document).ready(function () {
  $("#accordion").accordion({
    collapsible: true,
    active: false,
    heightStyle: "content"
  });
});

// Fitness goal handling
$(document).ready(function () {
  // Check if a goal is already stored and display it
  if (localStorage.getItem("fitnessGoal")) {
    $("#storedGoal").html(`<p>Your stored goal: <strong>${localStorage.getItem("fitnessGoal")}</strong></p>`);
  } else {
    $("#storedGoal").html("<p>No goal set. Enter your goal above!</p>");
  }

  // Handle form submission
  $("#goalForm").submit(function (event) {
    event.preventDefault();
    const goal = $("#fitnessGoal").val();
    if (goal) {
      // Store the goal in localStorage
      localStorage.setItem("fitnessGoal", goal);
      $("#storedGoal").html(`<p>Your stored goal: <strong>${goal}</strong></p>`);
      $("#fitnessGoal").val(""); // Clear the input field
    }
  });

  // Handle clearing the goal
  $("#clearGoal").click(function () {
    localStorage.removeItem("fitnessGoal");
    $("#storedGoal").html("<p>No goal set. Enter your goal above!</p>");
  });
});

// Carousel functionality (using plain JavaScript)
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

// Show the current carousel item
function showCarouselItem(index) {
  // Hide all items
  carouselItems.forEach((item, i) => {
    item.style.display = "none";
  });
  // Show the current item
  carouselItems[index].style.display = "block";
}

// Move to the next item
function nextItem() {
  currentIndex = (currentIndex + 1) % carouselItems.length; // Wrap around
  showCarouselItem(currentIndex);
}

// Move to the previous item
function prevItem() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length; // Wrap around
  showCarouselItem(currentIndex);
}

// Event listeners for buttons
nextButton.addEventListener("click", nextItem);
prevButton.addEventListener("click", prevItem);

// Show the first carousel item initially
showCarouselItem(currentIndex);
