import { IQuiz } from './contract/Iquiz';
import './style.css'


//?html von header connecten
const startScreen = document.getElementById('startScreen') as HTMLDivElement;
const buttonStart = document.getElementById('buttonStart') as HTMLButtonElement;
//?html von main connecten
const hauptScreen = document.getElementById('hauptScreen') as HTMLDivElement;
const mainOutput = document.getElementById('mainOutput') as HTMLOutputElement;
//?html von footer connecten
const footerOutput = document.getElementById('footerCounterOutput') as HTMLOutputElement;


//?API connecten
const quizUrl = `https://vz-wd-24-01.github.io/typescript-quiz/questions/easy.json`;
const hardQuizUrl = `https://vz-wd-24-01.github.io/typescript-quiz/questions/hard.json`;

const leichtQuizUrl = `https://vz-wd-24-01.github.io/typescript-quiz/questions/leicht.json`;
const schwerQuizUrl = `https://vz-wd-24-01.github.io/typescript-quiz/questions/schwer.json`;

let currentQuestion = 0;
let questionsArray : IQuiz[] = [];
let footerCounter = 1;
let richtigeAntwortenCounter = 0;

function createButton(text: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.id = "buttons"
  button.innerHTML = text;
  button.addEventListener('click', onClick);
  return button;
}

//?start button erstellen
function sprachAuswahl () {
  if (buttonStart) {
    mainOutput.innerHTML = "";
    const textParagraph = document.createElement("p");
    textParagraph.id = "pickLanguangeParagraph";
    textParagraph.innerHTML = "Wähle eine Sprache/Pick a language";
    mainOutput.appendChild(textParagraph);
    const deutsch = document.createElement("button");
    deutsch.id = "deutschButton";
    // deutsch.id = "buttons";
    deutsch.innerHTML = "Deutsch";
    mainOutput.appendChild(deutsch);
    console.log(deutsch);
    const english = document.createElement("button");
    english.id = "englishButton";
    english.innerHTML = "English";
    mainOutput.appendChild(english);
    console.log(english);
    //clickEvent machen, damit dann beim klich auch die andere function ausgeführt wird!
    deutsch.addEventListener('click', niveauAuswahlDeutsch);
    english.addEventListener('click', niveauAuswahlEnglish);
  }
  }
  //?wenn buttonStart gedrückt wird --> führe function sprachAuswahl aus (erstellt die sprachAuswahl buttons)
  if(buttonStart){
    // buttonStart.addEventListener('click', sprachAuswahl)
    buttonStart.addEventListener('click',()=>{
      startScreen.style.display = 'none';
      hauptScreen.style.display = 'block';
      sprachAuswahl();
    })
}


//?englische niveauauswahl erstellen
function niveauAuswahlEnglish () {
    mainOutput.innerHTML = "";
    const textParagraphEnglish = document.createElement("p");
    textParagraphEnglish.id = "niveauAuswahlParagraph";
    textParagraphEnglish.innerHTML = "Pick a level";
    mainOutput.appendChild(textParagraphEnglish);
    const easy = document.createElement("button");
    easy.id = "easyButton";
    easy.innerHTML = "Easy";
    mainOutput.appendChild(easy);
    console.log(easy);
    const hard = document.createElement("button");
    hard.id = "hardButton";
    hard.innerHTML = "Hard";
    mainOutput.appendChild(hard);
    console.log(hard);

    //auch hier clickEvent, damit dann die funktion zum fetchen aufgerufen und eingebunden werden kann!
    easy.addEventListener('click', easyQuizz);
    hard.addEventListener('click', hardQuizz);
    // hard.addEventListener('click', niveauAuswahlEnglish);

}


//?deutsche niveauauswahl ersztellen
function niveauAuswahlDeutsch () {
  mainOutput.innerHTML = "";
  const textParagraphDeutsch = document.createElement("p");
  textParagraphDeutsch.id = "niveauAuswahlParagraph";
  textParagraphDeutsch.innerHTML = "Wähle ein Niveau";
  mainOutput.appendChild(textParagraphDeutsch);
  const leicht = document.createElement("button");
  leicht.id ="hardButton";
  leicht.innerHTML = "Leicht";
  mainOutput.appendChild(leicht);
  console.log(leicht);
  const schwer = document.createElement("button");
  schwer.id ="hardButton";
  schwer.innerHTML = "Schwer";
  mainOutput.appendChild(schwer);
  console.log(schwer);


  leicht.addEventListener('click', leichtQuizz);
  schwer.addEventListener('click', schwerQuizz);
}

//? englische einfacheVersion fetchen
function easyQuizz() {
  fetch(quizUrl)
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((questions: IQuiz[]) => {
      questionsArray = questions;
      console.log(questionsArray.length);
      currentQuestion = 0;
      showNextQuestion();
    });
}

//? englische schwereVersion fetchen
function hardQuizz() {
  fetch(hardQuizUrl)
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((questions: IQuiz[]) => {
      // easyQuizForm(questions);
      questionsArray = questions;
      console.log(questionsArray.length);
      currentQuestion = 0;
      showNextQuestion();
    });
}


//? deutsche leichteVersion fetchen
function leichtQuizz() {
  fetch(leichtQuizUrl)
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((questions: IQuiz[]) => {
      // easyQuizForm(questions);
      questionsArray = questions;
      console.log(questionsArray.length);
      currentQuestion = 0;
      showNextQuestion();
    });
}

//?deutsche schwereVersion fetchen
function schwerQuizz() {
  fetch(schwerQuizUrl)
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((questions: IQuiz[]) => {
      // easyQuizForm(questions);
      questionsArray = questions;
      console.log(questionsArray.length);
      currentQuestion = 0;
      showNextQuestion();
    });
}

function showNextQuestion (){
 // einzelne frage + antwort + ergebnis fetchen
  mainOutput.innerHTML = "";
  console.log("hallo");
  if (currentQuestion < questionsArray.length) {
    const question = questionsArray[currentQuestion];
    const divElement = document.createElement("div");
    const frage = document.createElement("h3");
    frage.id = "frage";
    frage.innerHTML = question.question;
    divElement.appendChild(frage);

    const antwotenDiv = document.createElement('div')
    antwotenDiv.id = "antwortenDiv";
    const formElement = document.createElement('form');

    const antwortenArray: string[] = question.answers;
    console.log(antwortenArray);
    antwortenArray.forEach ((antwort,index)=>{
      const label = document.createElement('label');
      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'antwort'
      radioButton.value = index.toString();
    // const radioButton = document.createElement('button');
    // radioButton.value = index.toString();
    radioButton.innerHTML = antwort;
    antwotenDiv.appendChild(radioButton)
    label.appendChild(radioButton);
      label.appendChild(document.createTextNode(antwort));
    formElement.appendChild(label);
      formElement.appendChild(document.createElement('br'));
    })

    const weiterButton = createButton("Weiter", () => {
      const selectedAnswer = formElement.querySelector('input[name="antwort"]:checked') as HTMLInputElement;
      if (selectedAnswer) {
        const selectedAnswerValue = Number(selectedAnswer.value);
        const correctAnswerIndex = question.correct;
        currentQuestion++;
        showNextQuestion();
        if(selectedAnswerValue === correctAnswerIndex) {
          // selectedAnswer.style.backgroundColor = "red";
          // console.log("die richtige antw ist eine andere");
          richtigeAntwortenCounter ++;
          // window.alert(`die richtige antwort ist: ${question.correct}`)
        }else {
          window.alert(`Die richtige Antwort ist: ${question.answers[correctAnswerIndex]}`);

        }
      } else {
        alert("Bitte wähle eine Antwort.");
      }

      if(footerOutput) {
        footerOutput.innerHTML = "";
        console.log("hier ist der footer");
        console.log(footerCounter);
        footerCounter++;
        const counter = document.createElement('p')
        counter.innerHTML = `${footerCounter} von  ${questionsArray.length}`;
        footerOutput.appendChild(counter);
        if(footerCounter>questionsArray.length) {
          footerOutput.innerHTML = "";

        }
      }

    });

    antwotenDiv.appendChild(formElement);
    antwotenDiv.appendChild(weiterButton);
    divElement.appendChild(antwotenDiv);
    mainOutput.appendChild(divElement);
  } else {
    mainOutput.innerHTML = `Quiz abgeschlossen! Du hast ${richtigeAntwortenCounter} von  ${questionsArray.length} richtig!`;
    const reloadButton = createButton("Try again!/Versuchs erneut!", () => {
      location.reload();
    });
    mainOutput.appendChild(reloadButton);
  }



}





