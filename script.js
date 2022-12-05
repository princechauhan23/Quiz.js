// TODO 1: Declare & assign variables pointing to the corresponding element(s)
// statement should be the "statement" div
// optionButtons should be all the elements within the "options" div
// explanation should be the "explanation" div
const statement = document.getElementById("statement");
const options = document.querySelectorAll("button");
const explanation = document.getElementById("explanation");
const next = document.getElementById("nextbtn");
const main = document.getElementsByTagName("main");
// console.log(main[0])

console.log(options);

// TODO 2: Declare & assign a variable called fact
// Its value should be an object with a statement, true/false answer, and explanation
const fact = [
  {
    statement: "JavaScript is a programming language",
    answer: true,
    explanation:
      "JavaScript is a programming language that is used to make web pages interactive.",
  },
  {
    statement: "1 + 1 = 3",
    answer: false,
    explanation:
      "JavaScript is a programming language that is used to make web pages interactive.",
  },
  {
    statement: "Was the first Air Jordan sneaker was released in 1985?",
    answer: false,
    explanation: "the first Air Jordan sneaker was released in 1984",
  },
  {
    statement: "Is the movie Moneyball based on real-life events",
    answer: true,
    explanation: "The movie Moneyball is based on real-life events",
  },
];

// TODO 3: Set the text of the statement element to the fact's statement
// fact.statement = statement.textContent;

// TODO 4: Declare disable & enable functions to set or remove the "disabled" attribute from a given button element
// disable(button) should set the button element's attribute "disabled" to the value ""
// enable(button) should remove the attribute "disabled" from the button element
const disable = (button) => {
  button.setAttribute("disabled", "");
};
const enable = (button) => {
  button.removeAttribute("disabled");
};

// TODO 5: Declare an isCorrect function that compares a guess to the right answer
// isCorrect(guess) should return true if the guess matches the fact's answer
const isCorrect = (guessString, factans) => {
  return guessString === factans.toString();
};

var x = 0;
// for initial load
statement.textContent = fact[x].statement;

// function for the next fact
const nextFact = () => {
  x++;
  if (x == fact.length - 1) {
    next.textContent = "Finish";
  }
  if (x > fact.length - 1) {
    next.textContent = "";
    main[0].textContent = "You have completed the quiz";
  }
  statement.textContent = fact[x].statement;
  explanation.textContent = "";
  options.forEach((option) => {
    enable(option);
    option.classList.remove("correct", "incorrect");
  });

}

next.addEventListener("click", nextFact);

// TODO 6A: Use a for loop to add a click event listener to each of the optionButtons
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", () => {
    if (isCorrect(options[i].value, fact[x].answer)) {
      options[i].classList.add("correct");
    } else {
      options[i].classList.add("incorrect");
    }

    // TODO 6B: Within the event handler function, display the fact's explanation by setting the text of the explanation element
    explanation.textContent = fact.explanation;
    // TODO 7: Within the event handler function,
    // Use a for loop to disable all the option buttons
    for (let j = 0; j < options.length; j++) {
      disable(options[j]);
    }
  });
}

// TODO 8: Within the event handler function,
// Get the guessed value from the clicked button
// Use a conditional to compare the guess to the fact's answer
// and add the "correct"/"incorrect" class as appropriate





var returnedSuggestion = "";
let editor, doc, cursor, line, pos;
document.addEventListener("keydown", (event) => {
  setTimeout(() => {
    editor = event.target.closest(".CodeMirror");
    if (editor) {
      doc = editor.CodeMirror.getDoc();
      cursor = doc.getCursor();
      line = doc.getLine(cursor.line);
      pos = { line: cursor.line, ch: line.length };
      if (event.key == "Enter") {
        var query = doc.getRange(
          { line: Math.max(0, cursor.line - 10), ch: 0 },
          { line: cursor.line, ch: 0 }
        );
        window.postMessage({
          source: "getSuggestion",
          payload: { data: query },
        });
        //displayGrey(query)
      } else if (event.key == "ArrowRight") {
        acceptTab(returnedSuggestion);
      }
    }
  }, 0);
});

function acceptTab(text) {
  if (suggestionDisplayed) {
    doc.replaceRange(text, pos);
    suggestionDisplayed = false;
  }
}
function displayGrey(text) {
  var element = document.createElement("span");
  element.innerText = text;
  element.style = "color:grey";
  var lineIndex = pos.line;
  editor
    .getElementsByClassName("CodeMirror-line")
    [lineIndex].appendChild(element);
  suggestionDisplayed = true;
}
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.source == "return") {
    returnedSuggestion = event.data.payload.data;
    displayGrey(event.data.payload.data);
  }
});
