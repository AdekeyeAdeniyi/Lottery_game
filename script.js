
const pickBtn = document.getElementById("pickBtn");
const reset = document.getElementById("reset");
const resultsDiv = document.getElementById("resultsDiv");

const lotto = {
  results: [],
  maxResultsLength: 6,
  numOfBalls: 59,
  userGuess: []
}

const {
  results,
  maxResultsLength,
  numOfBalls,
  userGuess,
} = lotto;

const setBallValueInterval = setInterval(randomNum, 10, numOfBalls)
window.pickBtn.addEventListener('click', pickBall);


function randomNum(numOfBalls) {
  ball = Math.floor(Math.random() * Math.floor(numOfBalls) + 1);
  if (ball > 9){
  resultsDiv.innerText = "Your lucky dips are: " + results + " " + ball;
  } else { resultsDiv.innerText = "Your lucky dips are: " + results + " " + "0" + ball;

  }
}

reset.addEventListener("click", function(){
    location.reload();
})

function pickBall() {
  if (!results.includes(ball)) {
    results.push(ball);
  } else {
    randomNum(numOfBalls);
    pickBall();
  }
  if (results.length === maxResultsLength) {
    clearInterval(setBallValueInterval);
    pickBtn.removeEventListener('click', pickBall);
    pickBtn.style.display = "none";
    reset.style.display ="block";
    const matches = userGuess.filter(function (value) {
      return results.includes(value);
    });

    if(matches.length == 3){
        printResult(50);
    }else if (matches.length == 4){
        printResult(100);
    }else if(matches.length == 5){
        printResult(200);
    }else if(matches.length == 6){
        printResult(500);
    }else{
        printResult(0);
    }
  }
}
const printResult = function(value){
    resultsDiv.innerText = `You score: ${value} points`;
}
const updateStyles = function () {
  submitBtn.style.visibility = "hidden";
  pickBtn.style.visibility = "visible";
  resultsDiv.style.visibility = "visible";
  Array.from(lottoLineNumbers).forEach(element => {
    element.style.backgroundColor = "white";
    element.style.color = "rgba(0, 0, 0, 1)"
    element.style.mixBlendMode = "screen"
  });
}


//Capture form input
const submitBtn = document.getElementById("submitBtn");
const lottoGuessForm = document.getElementById("lottoGuessForm");
const lottoLineNumbers = document.getElementsByClassName("lottoLineNumbers");

lottoGuessForm.addEventListener('submit', function (e) {
  e.preventDefault();
  Array.from(e.target).forEach(element => {
    if (userGuess.length < maxResultsLength) {
      userGuess.push(parseInt(element.value))
    } else {
      console.log(userGuess);
      updateStyles();
    }
  });
})
