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
  { name: "9_of_clubs", value: 10, type: "number" },
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
  console.log(deck);
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
    if (val[0].type === "ace" && acc > 21) acc++;
    else acc += val[0].value;
    return acc;
  }, 0);

  // const numAces = hand.reduce((acc, val) => {
  //   if (val[0].type === "ace") {
  //     acc++;
  //   }
  //   return acc;
  // }, 0);

  // if (value > 21 && numAces > 0) {
  //   for (let i = 0; i < numAces; i++) {
  //     while (value > 21) value -= 10;
  //   }
  // }

  return value;
};

// Init function

const init = () => {
  // Restore card deck
  player.hand.forEach((card) => cardDeck.push(card));
  dealer.hand.forEach((card) => cardDeck.push(card));

  // Set Hand Values to Zero
  playerHandValue.text(0);
  dealerHandValue.text(0);

  // Removes Cards
  playerCards.empty();
  dealerCards.empty();

  // Sets new message
  message.text("New game is about to start...");

  // Pauses for 2 seconds
  setTimeout(() => {
    message.text("Starting hands are dealt");
  }, 2000);

  // Deal first two cards to player and one card to dealer

  player.hand.push(shuffle(cardDeck));
  player.hand.push(shuffle(cardDeck));
  dealer.hand.push(shuffle(cardDeck));

  // Display cards for player, evaluate and display hand value
  setTimeout(() => {
    player.hand.forEach((card) => displayCard("player", card[0]));
    playerHandValue.text(evalScore(player.hand));
  }, 3000);

  // Display cards for dealer - // One Card hidden still to be implemented
  setTimeout(() => {
    dealer.hand.forEach((card) => displayCard("dealer", card[0]));
    dealerHandValue.text(evalScore(dealer.hand));
  }, 4000);

  // Evaluate and display hand value for player and dealer without hidden card
};

// Function that evaluates Score

// Event Handler

// Start a new game

newGameBtn.click(() => {
  init();
});

//

displayCard("player", cardDeck[0]);
displayCard("player", cardDeck[1]);
displayCard("dealer", cardDeck[2]);
displayCard("dealer", cardDeck[3]);
