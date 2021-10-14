// DOM items

const message = $("#message");
const userCards = $("#user-cards");
const dealerCards = $("#dealer-cards");
const userHandValue = $("#user-hand-value");
const dealerHandValue = $("#dealer-hand-value");
const userScore = $("#user-score");
const dealerScore = $("#dealer-score");
const hitBtn = $("#hit");
const standBtn = $("#stand");
const newGameBtn = $("#new-game");

// Messages
const startMsg = "Welcome to Black Jack - Click New Game";
const playMsg = "It's your turn - Hit or Miss?";
const resultUserMsg = "Congratulations - You Won! - Try again!";
const resultDealerMsg = "Tough Luck - You Lost! - Try again!";
const resultDrawMsg = "It's a draw - Try again!";

// Data structure
let cardDeck = [
  { name: "2_of_clubs", value: 2 },
  { name: "2_of_diamonds", value: 2 },
  { name: "2_of_hearts", value: 2 },
  { name: "2_of_spades", value: 2 },
  { name: "3_of_clubs", value: 3 },
  { name: "3_of_diamonds", value: 3 },
  { name: "3_of_hearts", value: 3 },
  { name: "3_of_spades", value: 3 },
  { name: "4_of_clubs", value: 4 },
  { name: "4_of_diamonds", value: 4 },
  { name: "4_of_hearts", value: 4 },
  { name: "4_of_spades", value: 4 },
  { name: "5_of_clubs", value: 5 },
  { name: "5_of_diamonds", value: 5 },
  { name: "5_of_hearts", value: 5 },
  { name: "5_of_spades", value: 5 },
  { name: "6_of_clubs", value: 6 },
  { name: "6_of_diamonds", value: 6 },
  { name: "6_of_hearts", value: 6 },
  { name: "6_of_spades", value: 6 },
  { name: "7_of_clubs", value: 7 },
  { name: "7_of_diamonds", value: 7 },
  { name: "7_of_hearts", value: 7 },
  { name: "7_of_spades", value: 7 },
  { name: "8_of_clubs", value: 8 },
  { name: "8_of_diamonds", value: 8 },
  { name: "8_of_hearts", value: 8 },
  { name: "8_of_spades", value: 8 },
  { name: "9_of_diamonds", value: 9 },
  { name: "9_of_hearts", value: 9 },
  { name: "9_of_spades", value: 9 },
  { name: "9_of_clubs", value: 9 },
  { name: "10_of_diamonds", value: 10 },
  { name: "10_of_hearts", value: 10 },
  { name: "10_of_spades", value: 10 },
  { name: "10_of_clubs", value: 10 },
  { name: "jack_of_diamonds", value: 10 },
  { name: "jack_of_hearts", value: 10 },
  { name: "jack_of_spades", value: 10 },
  { name: "jack_of_clubs", value: 10 },
  { name: "queen_of_diamonds", value: 10 },
  { name: "queen_of_hearts", value: 10 },
  { name: "queen_of_spades", value: 10 },
  { name: "queen_of_clubs", value: 10 },
  { name: "king_of_diamonds", value: 10 },
  { name: "king_of_hearts", value: 10 },
  { name: "king_of_spades", value: 10 },
  { name: "king_of_clubs", value: 10 },
  { name: "ace_of_diamonds", value: 11 },
  { name: "ace_of_hearts", value: 11 },
  { name: "ace_of_spades", value: 11 },
  { name: "ace_of_clubs", value: 11 },
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
  message.css("color", "black").text(startMsg);

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
    if (val[0].value === 11) acc++;
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
  message.text(resultUserMsg).css("color", "green");
  user.totalScore++;
  userScore.text(user.totalScore);
};

// Function for updating scores when dealer won
const dealerWins = () => {
  message.text(resultDealerMsg).css("color", "red");
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

  // Deal first two cards to user and one card to dealer
  shuffle("user");
  shuffle("user");
  shuffle("dealer");

  // Sets a new message, enable hit and miss buttons, disables new game button

  message.text(playMsg).css("color", "black");
  standBtn.attr("disabled", false);
  hitBtn.attr("disabled", false);
  newGameBtn.attr("disabled", true);
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
    newGameBtn.attr("disabled", false);
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
      message.text(resultDrawMsg);
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
    message.text(resultDrawMsg);
    return;
  }
};

// Function that gets exectued when user does not want to draw another card by pressing the Stand button
const stand = () => {
  // Stand and Hit buttons are disabled, New Game button enabled
  standBtn.attr("disabled", true);
  hitBtn.attr("disabled", true);
  newGameBtn.attr("disabled", false);

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
