let randomNumber;

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+1)) + min;
}
//
// $('#button__confidence--js').on('click', function() {
//   $('#section__goal--exceed--js').removeClass('hide');
// })

// UPDATE Button handler
$('#submit-range-button').on('click', function(event) {
  event.preventDefault();
  $('#range-start').text($('#min-range-input').val())
  $('#range-end').text($('#max-range-input').val())
  randomNumber = getRandomNumber($('#min-range-input').val(), $('#max-range-input').val())
  console.log(randomNumber)
})

// SUBMIT GUESS button handler
$('#submit-guess-button').on('click', function(event) {
  event.preventDefault();
  requireCompletedInputs();
  validGuessWithinRange('#guess-one-input', '#guess-one-error');
  validGuessWithinRange('#guess-two-input', '#guess-two-error');
  displayNamesAndGuesses();
  giveGuessFeedback('#guess-one-input', '.high-low-one');
  giveGuessFeedback('#guess-two-input', '.high-low-two');
})

const validGuessWithinRange = (guess, display) => {
  if ($(guess).val() < Number($('#range-start').text())) {
    $(display).removeAttr('hidden')
  } else if ($(guess).val() > Number($('#range-end').text())) {
    $(display).removeAttr('hidden')
  } else {
     $(display).attr('hidden', true)
  }
}

const displayNamesAndGuesses = () => {
  $('#score-card-name-one').text($('#name-one-input').val())
  $('#score-card-name-two').text($('#name-two-input').val())
  $('.challenger-one-guess').text($('#guess-one-input').val())
  $('.challenger-two-guess').text($('#guess-two-input').val())
}

const giveGuessFeedback = (guess, display) => {
  if ($(guess).val() > randomNumber) {
    $(display).text("that's too high")
  } else if ($(guess).val() < randomNumber) {
    $(display).text("that's too low")
  } else {
    $(display).text("that's correct!")
  }
}

const requireCompletedInputs = () => {
  if (!$('#name-one-input').val() || !$('#name-two-input').val() || !$('#guess-one-input').val() || !$('#guess-two-input').val()) {
    $('#incomplete-input-error').removeAttr('hidden')
  } else {
    $('#incomplete-input-error').attr('hidden', true)
  }
}
