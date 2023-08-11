'use strict';

// Selecting elements
const $player0 = document.querySelector('.player--0');
const $player1 = document.querySelector('.player--1');
const $score0 = document.querySelector('#score--0');
const $score1 = document.getElementById('score--1');
const $current0 = document.getElementById('current--0');
const $current1 = document.getElementById('current--1');

const $dice = document.querySelector('.dice');
const $btnNew = document.querySelector('.btn--new');
const $btnRoll = document.querySelector('.btn--roll');
const $btnHold = document.querySelector('.btn--hold');

// Starting conditions

let scores, currentScore, activePlayer, isPlaying;

const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  $score0.textContent = 0;
  $score1.textContent = 0;
  $current0.textContent = 0;
  $current1.textContent = 0;
  $dice.classList.add('hidden');

  scores[0] = 0;
  scores[1] = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  // 2. is player 0 active ? ok : switch
  if (!$player0.classList.contains('player--active')) switchPlayer();

  // 3. turn isPlaying to true
  isPlaying = true;
};
initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  $player0.classList.toggle('player--active');
  $player1.classList.toggle('player--active');
};

//Rolling dice functionality
$btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    $dice.src = `dice-${dice}.png`;

    // 2. Display dice
    $dice.classList.remove('hidden');

    // 3. Check for rolled 1; if true, switch to next player

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

$btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100 -> Finish the game
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      $dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // If not, switch player.
      switchPlayer();
    }
  }
});

$btnNew.addEventListener('click', initialization);
