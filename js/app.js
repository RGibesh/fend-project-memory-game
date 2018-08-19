/*
 * Create a list that holds all of your cards
 */

const symbols = ["fa fa-bolt", "fa fa-rocket", "fa fa-car", "fa fa-heart", "fa fa-motorcycle", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-leaf"];

const iconsList = [...symbols, ...symbols];

// Select Cards from class deck
const cards = document.querySelector(".deck");

//Empty array to store openedcards
let openedCards = [];

//Empty array to store matchedCards
let matchedCards = [];

let starRate = "",
    stepRate = 6;

let firstClick = true,
    hours, minutes, seconds,
    totalTime = 0,
    incrementer;

const secondsContainer = document.querySelector("#seconds"),
    minutesContainer = document.querySelector("#minutes"),
    hoursContainer = document.querySelector("#hours");

const modal = document.querySelector(".modal"),
    playAgain = document.querySelector(".play-again"),
    playAgainModal = document.querySelector(".modal .play-again");

const rateContainer = document.querySelector("#total_rate"),
    exactMoves = iconsList.length / 2,
    max = exactMoves + stepRate,
    min = exactMoves + (2 * stepRate);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Initialize the game
 */

function startGame() {
    // Shuffle the current `iconsList`
    const icons = shuffle(iconsList);

    // Create the Cards dynamically
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cards.appendChild(card);

        // Add click Event to each card
        click(card);


    }

}


/*
 * Click Crad Event function
 */

function click(card) {
    // Add click event on card
    card.addEventListener("click", function() {

        const latestCard = this;
        const lastCard = openedCards[0];

        //Start the timer on first click
        if (firstClick) {
            startTimer();
            firstClick = false;
        }

        // Comparing existing opened cards
        if (openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            compare(latestCard, lastCard);

        } else {
            latestCard.classList.add("open", "show", "disable");
            openedCards.push(this);

        }

    });
}

/*
 * Compare the cards function
 */

function compare(latestCard, lastCard) {
    if (latestCard.innerHTML === lastCard.innerHTML) {

        //Matched Cards
        latestCard.classList.add("match");
        lastCard.classList.add("match");

        matchedCards.push(latestCard, lastCard);

        //Reset openCards array
        openedCards = [];

        //Game over function
        gameOver();
    } else {

        setTimeout(function() {
            latestCard.classList.remove("open", "show", "disable");
            lastCard.classList.remove("open", "show", "disable");

        }, 500);

        //Reset openCards array
        openedCards = [];


    }

    // Add new move
    addMove();

    rating();
}

/*
 * Game over function
 */

function gameOver() {

    if (matchedCards.length === iconsList.length) {
        gameOverModel();
    }

}

/*
 * Game Over Model
 */
function gameOverModel() {

    // Display the modal
    modal.style.top = "0";

    // Add moves to the Modal
    const totalMoves = document.querySelector("#total_moves");
    totalMoves.innerHTML = moves + 1;

    // Add Rate
    rateContainer.innerHTML = starRate;

    // Stop Timer
    stopTimer();

    // Add time to the Modal
    const totalHours = document.querySelector("#totalHours");
    const totalMinutes = document.querySelector("#totalMinutes");
    const totalSeconds = document.querySelector("#totalSeconds");
    totalHours.innerHTML = hours;
    totalMinutes.innerHTML = minutes;
    totalSeconds.innerHTML = seconds;

}

/*
 * Play Again
 */
playAgain.addEventListener("click", function() {

    // Start the game again
    repeat();

});
playAgainModal.addEventListener("click", function() {

    // Hide the modal
    modal.style.top = "-150%";

    // Start the game again
    repeat();

});


/*
 * Create Moves
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

}

/*
 * Rating function
 */
const stars = document.querySelectorAll(".stars");

function rating() {

    if (moves < max) {
        starRate = "<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i>";
    } else if (moves < min) {
        stars[0].children[2].style.color = "#ffb400";
        starRate = "<i class='fa fa-star'></i><i class='fa fa-star'></i>";
    } else {
        stars[0].children[1].style.color = "#ffb400";
        starRate = "<i class='fa fa-star'></i>";
    }

}

/*
 * Timer Function
 */
function startTimer() {

    // Start Incrementer
    incrementer = setInterval(function() {

        // Add totalTime by 1
        totalTime += 1;

        // Convert Total Time to hours:minutes:seconds
        calculateTime(totalTime);

        // Change the current time values
        secondsContainer.innerHTML = seconds;
        minutesContainer.innerHTML = minutes;
        hoursContainer.innerHTML = hours;

    }, 1000);

}

/*
 * Calculate Time
 */
function calculateTime(totalTime) {
    hours = Math.floor(totalTime / 60 / 60);
    minutes = Math.floor((totalTime / 60) % 60);
    seconds = totalTime % 60;
}

/*
 * Stop Timer
 */
function stopTimer() {
    // Stop Timer
    clearInterval(incrementer);
}

/*
 * Restart the game
 */

const reset = document.querySelector(".restart");
reset.addEventListener("click", function() {

    // Remove all cards
    cards.innerHTML = "";

    // Call 'startGame' function to start a new game
    startGame();

    // Reset matched cards
    matchedCards = [];

    // Reset the moves
    moves = 0;
    movesContainer.innerHTML = moves;

    //Reset Timer
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    stopTimer();
    firstClick = true;
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    stars[1].style.color = "#ffb400";
    stars[2].style.color = "#ffb400";
    starRate = "";

});


function repeat() {

    // Remove all cards
    cards.innerHTML = "";

    // Call 'startGame' function to start a new game
    startGame();

    // Reset matched cards
    matchedCards = [];

    // Reset the moves
    moves = 0;
    movesContainer.innerHTML = moves;


    //Reset Timer
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    stopTimer();
    firstClick = true;
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    stars[1].style.color = "#ffb400";
    stars[2].style.color = "#ffb400";
    starRate = "";

}

// Start game for the first time

startGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */