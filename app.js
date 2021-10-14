// DOM items

let message = $("#message");
let userCards = $("#user-cards");
let dealerCards = $("#dealer-cards");
let userHandValue = $("#user-hand-value");
let dealerHandValue = $("#dealer-hand-value");
let userScore = $("#user-score");
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

let user = {
  hand: [],
  handValue: 0,
  totalScore: 0,
};

let dealer = {
  hand: [],
  handValue: 0,
  totalScore: 0,
};

const init = () => {
  // Set message
  message.css("color", "black").text("Start new game!");

  // Disable Hit and Stand Button
  standBtn.attr("disabled", true);
  hitBtn.attr("disabled", true);
};

// Function that shuffles card to either user or dealer, updates scores and UI

const shuffle = (player) => {
  // Define random number based on number ofcards that are still in the deck
  let max = cardDeck.length - 1;
  let random = Math.floor(Math.random() * max);
  // Draw card from the deck
  let card = cardDeck.splice(random, 1);
  // Add the card to the players/dealers hand
  if (player === "user") user.hand.push(card);
  else dealer.hand.push(card);
  // Display card to UI
  displayCard(card, player);
  // Evaluate score of total hand and assign to user or player, update UI
  if (player === "user") {
    user.handValue = evalScore(user.hand, "user");
    userHandValue.text(user.handValue);
  } else {
    dealer.handValue = evalScore(dealer.hand, "dealer");
    dealerHandValue.text(dealer.handValue);
  }
};

// Function that displays card to UI

const displayCard = (card, player) => {
  let html = `<img src=img\\deck\\${card[0].name}.png alt="${player}-card"/>`;
  $(`#${player}-cards`).append(`${html}`);
};

// Function that evaluates score for total hand. Uses different logic for player and dealer
const evalScore = (hand, player) => {
  // Calculates base value of hand with each ace counting 11
  let value = hand.reduce((acc, val) => {
    acc += val[0].value;
    return acc;
  }, 0);

  // Finds the number of aces in the hand
  let numAces = hand.reduce((acc, val) => {
    if (val[0].type === "ace") acc++;
    return acc;
  }, 0);

  // While the user's base value is >21 and she has still aces, 10 gets deducted
  if (player === "user") {
    while (value > 21 && numAces > 0) {
      value = value - 10;
      numAces--;
    }
  }

  // The dealer want's also transform Aces to a 1 when her base value is above 17 and that base value is lower than the hand of the user, so she has the opportunity to draw another card.

  if (player === "dealer") {
    while (
      (value > 21 && numAces > 0) ||
      (value >= 17 && value <= user.handValue && numAces > 0)
    ) {
      value = value - 10;
      numAces--;
    }
  }
  return value;
};

// Function for updating scores when user won
const userWins = () => {
  message.text("You Win");
  message.css("color", "green");
  user.totalScore++;
  userScore.text(user.totalScore);
};

// Function for updating scores when dealer won
const dealerWins = () => {
  message.text("Dealer Wins - Start New Game");
  message.css("color", "red");
  dealer.totalScore++;
  dealerScore.text(dealer.totalScore);
};

// Function that will be executed if new game starts

const newGame = () => {
  // Restore card deck
  user.hand.forEach((card) => cardDeck.push(card[0]));
  dealer.hand.forEach((card) => cardDeck.push(card[0]));

  // Remove cards from User and Dealer
  user.hand = [];
  dealer.hand = [];

  // Set Hand Values to Zero
  userHandValue.text(0);
  dealerHandValue.text(0);

  // Removes Cards from UI
  userCards.empty();
  dealerCards.empty();

  // Sets new message
  message.text("Dealing...").css("color", "black");

  // Deal first two cards to user and one card to dealer
  shuffle("user");
  shuffle("user");
  shuffle("dealer");

  // Sets a new message and disables hit and miss buttons

  message.text("It's your turn. Hit or Stand?");
  standBtn.attr("disabled", false);
  hitBtn.attr("disabled", false);
};

// Function that gets executed when user wants another card by pressing the Hit button
const hit = () => {
  // User gets new card, scores and UI gets updated
  shuffle("user");
  // If the player overshoots (handscore > 21) the game is over and the dealer has won
  if (user.handValue > 21) {
    dealerWins();
    hitBtn.attr("disabled", true);
    standBtn.attr("disabled", true);
  }
};

// Function that evaluates end result

const evalResult = () => {
  if (dealer.handValue > 21) {
    userWins();
    return;
  }
  // If both have 21 it is a draw, unless one player has a black-jack and the other not
  if (dealer.handValue === 21 && user.handValue === 21) {
    if (dealer.hand.length === 2 && user.hand.length > 2) {
      dealerWins();
      return;
    } else if (dealer.hand.length === 2 && user.hand.length === 2) {
      message.text("Draw");
      return;
    } else {
      userWins();
      return;
    }
  } else if (dealer.handValue > user.handValue) {
    dealerWins();
    return;
  } else if (user.handValue > dealer.handValue) {
    userWins();
    return;
  } else {
    message.text("Draw - Start New Game");
    return;
  }
};

// Function that gets exectued when user does not want to draw another card by pressing the Stand button
const stand = () => {
  // Stand and Hit buttons are disabled
  standBtn.attr("disabled", true);
  hitBtn.attr("disabled", true);
  // Set new message
  message.text("Dealer's turn");

  while (dealer.handValue < 17) {
    shuffle("dealer");
  }

  let p = new Promise((resolve, reject) => {
    if (dealer.handValue >= 17) {
      resolve();
    } else {
      reject();
    }
  });

  p.then(() => {
    evalResult();
  });
};

// Event Handler
newGameBtn.click(() => {
  newGame();
});

hitBtn.click(() => {
  hit();
});

standBtn.click(() => {
  stand();
});

init();
