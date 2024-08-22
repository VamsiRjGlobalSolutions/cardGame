let firstCard = null;
let secondCard = null;
let cardsArray = []; // Array to store card details

function handleCardClick(event) {
    const clickedCard = event.target;

    if (firstCard === null) {
        firstCard = clickedCard;
        firstCard.classList.add('selected');
    } else if (secondCard === null && clickedCard !== firstCard) {
        secondCard = clickedCard;
        secondCard.classList.add('selected');

        setTimeout(() => {
            const tempSrc = firstCard.src;
            firstCard.src = secondCard.src;
            secondCard.src = tempSrc;

            const firstCardIndex = parseInt(firstCard.id.replace('card-image', '')) - 1;
            const secondCardIndex = parseInt(secondCard.id.replace('card-image', '')) - 1;

            const tempCard = cardsArray[firstCardIndex];
            cardsArray[firstCardIndex] = cardsArray[secondCardIndex];
            cardsArray[secondCardIndex] = tempCard;

            firstCard.classList.remove('selected');
            secondCard.classList.remove('selected');
            firstCard = null;
            secondCard = null;

            console.log(cardsArray);
        }, 300);
    }
}

async function fetchCards() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=10');
        const data = await response.json();

        cardsArray = [];

        for (let i = 0; i < 10; i++) {
            const card = data.cards[i];
            const cardImageElement = document.getElementById(`card-image${i + 1}`);
            cardImageElement.src = card.image;
            cardImageElement.addEventListener('click', handleCardClick);

            cardsArray.push({
                value: card.value,
                image: card.image,
                suit: card.suit,
                code: card.code
            });
        }

        console.log(cardsArray);

    } catch (error) {
        console.error('Error fetching card images:', error);
    }
}

async function giveCard() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data = await response.json();
        const card = data.cards[0];
        const cardImageElement = document.getElementById('card-image');
        cardImageElement.src = card.image;
        cardImageElement.addEventListener('click', handleCardClick);

        cardsArray.push({
            value: card.value,
            image: card.image,
            suit: card.suit,
            code: card.code
        });

        console.log(cardsArray);

    } catch (error) {
        console.error('Error fetching card images:', error);
    }
}

function slideImageLeft() {
    const imgd = document.getElementById('imgd');
    imgd.classList.add('slide-left');
}

// Automatically call functions when the page loads
window.onload = () => {
    fetchCards();
    giveCard();
};

// Add event listeners to buttons
document.getElementById('fetch-card').addEventListener('click', fetchCards);
document.getElementById('imgd').addEventListener('click', slideImageLeft);