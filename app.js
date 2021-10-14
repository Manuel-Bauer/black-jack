// Bugs
// Disable all buttons while dealing
// If Player has 21 and dealer has 21, player wins

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
const dealingMsg = "Dealing starting hands...";
const playMsg = "It's your turn - Hit or Stand?";
const anotherCardMsg = "Dealing...";
const resultUserMsg = "You Won! - Try again!";
const resultDealerMsg = "You Lost! - Try again!";
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
  // Disable Buttons
  newGameBtn.attr("disabled", true);
  hitBtn.attr("disabled", true);
  standBtn.attr("disabled", true);

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

  // Setting message
  message.text(dealingMsg).css("color", "black");

  // Deal first two cards to user and one card to dealer
  setTimeout(() => {
    shuffle("user");
  }, 1000);

  setTimeout(() => {
    shuffle("user");
  }, 2000);

  // After dealing got his card, message will change, hit and stand Btn enabled
  setTimeout(() => {
    shuffle("dealer");
    message.text(playMsg);
    standBtn.attr("disabled", false);
    hitBtn.attr("disabled", false);
  }, 3000);
};

// Function that gets executed when user wants another card by pressing the Hit button
const hit = () => {
  // Disable hit and stand button
  hitBtn.attr("disabled", true);
  standBtn.attr("disabled", true);

  // Set Message
  message.text(anotherCardMsg);
  // User gets new card, scores and UI gets updated
  setTimeout(() => {
    shuffle("user");
    // If the player overshoots (handscore > 21) the game is over and the dealer has won. If not Hit and Stand button will be enabled again
    if (user.handValue > 21) {
      dealerWins();
      hitBtn.attr("disabled", true);
      standBtn.attr("disabled", true);
      newGameBtn.attr("disabled", false);
    } else {
      message.text(playMsg);
      hitBtn.attr("disabled", false);
      standBtn.attr("disabled", false);
    }
  }, 1000);
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
  // Set message
  message.text(anotherCardMsg);

  // Stand and Hit buttons are disabled, New Game button enabled
  standBtn.attr("disabled", true);
  hitBtn.attr("disabled", true);

  // Function resolves a Promise that get's resolved each second with done if dealer's hand value is >= 17
  // Inspiration from: https://stackoverflow.com/questions/17217736/while-loop-with-promises#17238793

  const promise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dealer.handValue >= 17 ? "done" : "not done");
      }, 1000);
    });
  };

  // If the promise resolves in done, the fuction calls the evalResult() function, which evaluates the end result. If not the shuffle function will get called again (dealer draws another card) and function calls itself again. This goes on until dealer's hand value is >= 17 and Promise resolves with "done"

  const shuffleloop = () => {
    promise().then((res) => {
      if (res === "done") {
        evalResult();
        newGameBtn.attr("disabled", false);
      } else {
        shuffle("dealer");
        return shuffleloop();
      }
    });
  };

  shuffleloop();
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
