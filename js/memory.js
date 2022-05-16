const cards = document.querySelectorAll('.memory-card');

let butElem = document.querySelector("#start_game");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;

var flipAudio = new Audio("media/cardsFlip.mp3");
var lostAudio = new Audio("media/cardsLost.mp3");
var winAudio = new Audio("media/cardsWin.mp3");

function flipCard() {
    //   this.classList.toggle('flip');
    if (lockBoard) return;
    if (this === firstCard) return;
    flipAudio.play();
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    //hasFlippedCard = false;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    winAudio.play();
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    counter += 1;
    if (counter == 8) {
        let win = document.querySelector(".win");
        win.innerText = "YOU WIN!";
        setTimeout(() => {
            win.innerText = "";
            startGame()
        }, 2000)
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    lostAudio.play();
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
        card.classList.add('flip');
    });
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        })
    }, 5000);
};

function startGame() {
    shuffle();
    var time = Date.now();
}

butElem.addEventListener('click', function() {
    startGame();
});