let randomNumber;

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+1)) + min;
}

// UPDATE Button handler
$('#submit-range-button').on('click', function(event) {
  event.preventDefault();
  if (validateCustomRange()) {
    $('#range-start').text($('#min-range-input').val())
    $('#range-end').text($('#max-range-input').val())
    randomNumber = getRandomNumber($('#min-range-input').val(), $('#max-range-input').val())
    console.log(randomNumber)
  }
})

// SUBMIT GUESS button handler
$('#submit-guess-button').on('click', function(event) {
  event.preventDefault();
  if (requireCompletedInputs()) {
    playGameHandler();
  }
})

// handler to fire only if inputs are requireCompletedInputs
const playGameHandler = () => {
  validateGuessWithinRange('#guess-one-input', '#guess-one-error');
  validateGuessWithinRange('#guess-two-input', '#guess-two-error');
  displayNamesAndGuesses();
  giveGuessFeedback('#guess-one-input', '.high-low-one', '#score-card-name-one');
  giveGuessFeedback('#guess-two-input', '.high-low-two', '#score-card-name-one');
}

const validateCustomRange = () => {
  if($('#max-range-input').val() <= $('#min-range-input').val()) {
    $('#range-error').removeAttr('hidden')
    return false
  } else {
    $('#range-error').attr('hidden', true)
    return true
  }
}

const validateGuessWithinRange = (guess, display) => {
  if ($(guess).val() < Number($('#range-start').text())) {
    $(display).removeAttr('hidden')
  } else if ($(guess).val() > Number($('#range-end').text())) {
    $(display).removeAttr('hidden')
  } else {
     $(display).attr('hidden', true)
  }
}

const displayNamesAndGuesses = () => {
  $('.player-one-name').text($('#name-one-input').val())
  $('.player-two-name').text($('#name-two-input').val())
  $('.challenger-one-guess').text($('#guess-one-input').val())
  $('.challenger-two-guess').text($('#guess-two-input').val())
}

const giveGuessFeedback = (guess, display, player) => {
  if ($(guess).val() > randomNumber) {
    $(display).text("that's too high")
  } else if ($(guess).val() < randomNumber) {
    $(display).text("that's too low")
  } else {
    $(display).text("that's correct!")
    let winner = $(player).text();
    addWinnerCard(winner);
  }
}

const addWinnerCard = (winner) => {
  $('#right-column').prepend(`<article class="game-box" id="winner-card">
    <div class="winner-card-top">
      <span class="winner-card-top-span">
        <h5 class="score-card-name-one vs-names player-one-name">${$('#score-card-name-one').text()}</h5>
      </span>
      <p class="vs">vs</p>
      <span class="winner-card-top-span">
        <h5 class="score-card-name-two vs-names player-two-name">${$('#score-card-name-two').text()}</h5>
      </span>
    </div>
    <div class="winner-card-middle-box">
      <div class="winner-card-middle-text-box">
        <span class="winner-card-name">
          <h3 class="winner-card-name"
            id="winner-card-name">${winner}</h3>
        </span>
        <h3>WINNER</h3>
      </div>
    </div>
    <div class="winner-card-bottom">
      <div class="bottom-item">
        <span class="winner-card-stats">47</span>
        <h5 class="lighter-h">GUESSES</h5>
      </div>
      <div class="bottom-item">
        <span class="winner-card-stats">1.35</span>
        <h5 class="lighter-h">MINUTES</h5>
      </div>
      <div class="bottom-item">
        <button class="x-button" type="button" name="x"
          value="x">x</button>
      </div>
    </div>
  </article>`)
}

const requireCompletedInputs = () => {
  if (!$('#name-one-input').val() || !$('#name-two-input').val() || !$('#guess-one-input').val() || !$('#guess-two-input').val()) {
    $('#incomplete-input-error').removeAttr('hidden')
    return false
  } else {
    $('#incomplete-input-error').attr('hidden', true)
    return true
  }
}
