let challengeText = document.getElementById('challenge');
let inputText = document.getElementById('input');
let resultText = document.getElementById('result');
let retryButton = document.getElementById('retry');

let textArr, currentIndex, currentInput, correctWord, startTime;

function updateText(isValid) {
  challengeText.innerHTML = textArr.map((word, index) => {
    if (correctWord.includes(index)) {
      return `<span style="color: #2ecc71">${word}</span>`;
    } else if (index < currentIndex) {
      return `<span style="color: #ff6961">${word}</span>`;
    } else if (index === currentIndex) {
      if (currentInput.length === 0) {
        return `<span style="font-weight: bold">${word}</span>`;
      } else {
        if (isValid) {
          return `<span style="color: #1b8c4b; font-weight: bold">${word}</span>`;
        } else { 
          return `<span style="color: #c23a32; font-weight: bold">${word}</span>`;
        }
      }
    } else {
      return word;
    }
  }).join(' ');
}

function init() {
  inputText.style = "display: block;"
  resultText.style = "display: none;";
  retryButton.style = "display: none;";
  textArr = createParagraph(50);
  currentIndex = 0;
  currentInput = '';
  correctWord = [];
  startTime = null;
  inputText.innerHTML = 'Start typing to begin...';
  updateText();
}

init();
retryButton.onclick = init;

document.addEventListener('keydown', function(event) {
  if (!startTime) {
    startTime = new Date().getTime();
  }
  const key = event.key;
  if (key === " ") {
    if (currentInput.length > 0) {
      if (currentInput === textArr[currentIndex]) {
        correctWord.push(currentIndex);
      }
      currentInput = '';
      currentIndex++;
      if (currentIndex > textArr.length - 1) {
        const timeTaken = new Date().getTime() - startTime;
        inputText.style = "display: none;"
        resultText.innerHTML = 
          `WPM: ${Math.round(textArr.length / ((timeTaken / 1000) / 60))} - 
          Accuracy: ${((correctWord.length / textArr.length) * 100).toFixed(2)}%`;
        resultText.style = "display: block;";
        retryButton.style = "display: block;";
      }
    }
  } else if (key.length === 1) {
    currentInput = currentInput.concat(key);
  } else if (key === "Backspace" && currentInput.length > 0) { 
    currentInput = currentInput.slice(0, currentInput.length - 1);
  }
  currentInput === textArr[currentIndex].slice(0, currentInput.length) ? 
    updateText(true) :
    updateText(false);
  inputText.innerHTML = currentInput;
});