/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-bolt", "fa fa-bolt", "fa fa-rocket", "fa fa-rocket", "fa fa-car", "fa fa-car", "fa fa-heart", "fa fa-heart", "fa fa-motorcycle", "fa fa-motorcycle", "fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-leaf", "fa fa-leaf"];

// Select Cards from class deck
const cards = document.querySelector(".deck");

//Empty array to store openedcards
let openedCards = [];

// Create the Cards dynamically
for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cards.appendChild(card);

    // Add click event on card
    card.addEventListener("click", function() {

        // Comparing existing opened cards
        if (openedCards.length === 1) {

        } else {

        }


        card.classList.add("open", "show");
        openedCards.push(this);


    });
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */