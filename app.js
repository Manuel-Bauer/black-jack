// DOM items

let message = $("#message");
let playerCards = $("#player-cards");
let dealerCards = $("#dealer-cards");
let playerHandValue = $("#player-hand-value");
let dealerHandValue = $("#dealer-hand-value");
let playerScore = $("#player-score");
let dealerScore = $("#dealer-score");
let hitBtn = $("#hit");
let standBtn = $("#stand");
let newGameBtn = $("#new-game");

// Data structure

let cardDeck = [
  { name: "2_of_clubs", value: 2, type: "number" },
  { name: "2_of_diamonds", value: 2, type: "number" },
  { name: "2_of_hearts", value: 2, type: "number" },
  { name: "2_of_spades", value: 2, type: "number" },
  { name: "3_of_clubs", value: 3, type: "number" },
  { name: "3_of_diamonds", value: 3, type: "number" },
  { name: "3_of_hearts", value: 3, type: "number" },
  { name: "3_of_spades", value: 3, type: "number" },
  { name: "4_of_clubs", value: 4, type: "number" },
  { name: "4_of_diamonds", value: 4, type: "number" },
  { name: "4_of_hearts", value: 4, type: "number" },
  { name: "4_of_spades", value: 4, type: "number" },
  { name: "5_of_clubs", value: 5, type: "number" },
  { name: "5_of_diamonds", value: 5, type: "number" },
  { name: "5_of_hearts", value: 5, type: "number" },
  { name: "5_of_spades", value: 5, type: "number" },
  { name: "6_of_clubs", value: 6, type: "number" },
  { name: "6_of_diamonds", value: 6, type: "number" },
  { name: "6_of_hearts", value: 6, type: "number" },
  { name: "6_of_spades", value: 6, type: "number" },
  { name: "7_of_clubs", value: 7, type: "number" },
  { name: "7_of_diamonds", value: 7, type: "number" },
  { name: "7_of_hearts", value: 7, type: "number" },
  { name: "7_of_spades", value: 7, type: "number" },
  { name: "8_of_clubs", value: 8, type: "number" },
  { name: "8_of_diamonds", value: 8, type: "number" },
  { name: "8_of_hearts", value: 8, type: "number" },
  { name: "8_of_spades", value: 8, type: "number" },
  { name: "9_of_diamonds", value: 9, type: "number" },
  { name: "9_of_hearts", value: 9, type: "number" },
  { name: "9_of_spades", value: 9, type: "number" },
  { name: "9_of_clubs", value: 9, type: "number" },
  { name: "10_of_diamonds", value: 10, type: "number" },
  { name: "10_of_hearts", value: 10, type: "number" },
  { name: "10_of_spades", value: 10, type: "number" },
  { name: "10_of_clubs", value: 10, type: "number" },
  { name: "jack_of_diamonds", value: 10, type: "face" },
  { name: "jack_of_hearts", value: 10, type: "face" },
  { name: "jack_of_spades", value: 10, type: "face" },
  { name: "jack_of_clubs", value: 10, type: "face" },
  { name: "queen_of_diamonds", value: 10, type: "face" },
  { name: "queen_of_hearts", value: 10, type: "face" },
  { name: "queen_of_spades", value: 10, type: "face" },
  { name: "queen_of_clubs", value: 10, type: "face" },
  { name: "king_of_diamonds", value: 10, type: "face" },
  { name: "king_of_hearts", value: 10, type: "face" },
  { name: "king_of_spades", value: 10, type: "face" },
  { name: "king_of_clubs", value: 10, type: "face" },
  { name: "ace_of_diamonds", value: 11, type: "ace" },
  { name: "ace_of_hearts", value: 11, type: "ace" },
  { name: "ace_of_spades", value: 11, type: "ace" },
  { name: "ace_of_clubs", value: 11, type: "ace" },
];

let player = {
  hand: [],
  handValue: 0,
  totalScore: 0,
};

let dealer = {
  hand: [],
  handValue: 0,
  totalScore: 0,
};

// Function that shuffles random card out of deck and returns it

const shuffle = (deck) => {
  let max = deck.length - 1;
  let random = Math.floor(Math.random() * max);
  return deck.splice(random, 1);
};

// Function that displays card

const displayCard = (player, card) => {
  let html = `<img src=img\\deck\\${card.name}.png alt="${player}-card"/>`;
  $(`#${player}-cards`).append(`${html}`);
};

// Function that evaluates score after each hand being dealt
const evalScore = (hand) => {
  let value = hand.reduce((acc, val) => {
    acc += val[0].value;
    return acc;
  }, 0);

  let numAces = hand.reduce((acc, val) => {
    if (val[0].type === "ace") acc++;
    return acc;
  }, 0);

  // Implement logic to deduct 10 for each Ace until
  while (value > 21 && numAces > 0) {
    value = value - 10;
    numAces--;
  }

  return value;
};

// Function for updating scores when player won
const playerWins = () => {
  message.text("You Win");
  message.css("color", "green");
  player.totalScore++;
  playerScore.text(player.totalScore);
};

// Function for updating scores when dealer won
const dealerWins = () => {
  message.text("Dealer Wins - Start New Game");
  message.css("color", "red");
  dealer.totalScore++;
  dealerScore.text(dealer.totalScore);
};

// Init function

const init = () => {
  // Set message color back to black
  message.css("color", "black");

  // Enable Hit and Stand buttons
  standBtn.attr("disabled", false);
  hitBtn.attr("disabled", false);

  // Restore card deck
  player.hand.forEach((card) => cardDeck.push(card[0]));
  dealer.hand.forEach((card) => cardDeck.push(card[0]));

  // Remove cards from Player and Dealer
  player.hand = [];
  dealer.hand = [];

  // Set Hand Values to Zero
  playerHandValue.text(0);
  dealerHandValue.text(0);

  // Removes Cards from UI
  playerCards.empty();
  dealerCards.empty();

  // Sets new message
  message.text("New game is about to start...");

  // Pauses for 2 seconds
  setTimeout(() => {
    message.text("Dealing...");
  }, 500);

  // Deal first two cards to player and one card to dealer

  player.hand.push(shuffle(cardDeck));
  player.hand.push(shuffle(cardDeck));
  dealer.hand.push(shuffle(cardDeck));

  // Display cards for player, evaluate and display hand value
  setTimeout(() => {
    player.hand.forEach((card) => displayCard("player", card[0]));
    player.handValue = evalScore(player.hand);
    playerHandValue.text(player.handValue);
  }, 1000);

  // Display cards for dealer - // One Card hidden still to be implemented
  setTimeout(() => {
    dealer.hand.forEach((card) => displayCard("dealer", card[0]));
    dealer.handValue = evalScore(dealer.hand);
    dealerHandValue.text(dealer.handValue);
  }, 1500);

  // Set new message

  setTimeout(() => {
    message.text("It's your turn: Hit or Stand?");
  }, 1600);
  // Evaluate and display hand value for player and dealer without hidden card
};

// Event Handler

// Start a new game

newGameBtn.click(() => {
  init();
});

// Hit
hitBtn.click(() => {
  player.hand.push(shuffle(cardDeck));
  playerCards.empty();
  player.hand.forEach((card) => displayCard("player", card[0]));
  player.handValue = evalScore(player.hand);
  playerHandValue.text(player.handValue);
  if (evalScore(player.hand) > 21) {
    dealerWins();
  }
});

// Stand
standBtn.click(() => {
  standBtn.attr("disabled", true);
  hitBtn.attr("disabled", true);

  message.text("Dealer's turn");
  while (dealer.handValue <= 17) {
    dealer.hand.push(shuffle(cardDeck));
    dealerCards.empty();
    dealer.hand.forEach((card) => displayCard("dealer", card[0]));
    dealer.handValue = evalScore(dealer.hand);
    dealerHandValue.text(dealer.handValue);
  }

  // Dealer overshoots
  if (dealer.handValue > 21) {
    playerWins();
    return;
  }

  // If both have 21 it is a draw, unless one player has a black-jack and the other not
  if (dealer.handValue === 21 && player.handValue === 21) {
    if (dealer.hand.length === 2 && player.hand.length > 2) {
      dealerWins();
      return;
    } else if (dealer.hand.length === 2 && player.hand.length === 2) {
      message.text("Draw");
      return;
    } else {
      playerWins();
      return;
    }
  } else if (dealer.handValue > player.handValue) {
    dealerWins();
    return;
  } else if (player.handValue > dealer.handValue) {
    playerWins();
    return;
  } else {
    message.text("Draw - Start New Game");
    return;
  }
});
