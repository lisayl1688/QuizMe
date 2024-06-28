import { IQuiz } from './contract/Iquiz';
import './style.css'

// <button id="buttonStart">Start the Quiz</button>
//   </header>
//   <main>
//     <div id="mainOutput"></div>
//   </main>
//   <footer>
//     <div id="footerCounterOutput"></div>
//   </footer>


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

//?start button erstellen
function sprachAuswahl () {
if (buttonStart) {
  mainOutput.innerHTML = "";
  const textParagraph = document.createElement("p");
  textParagraph.innerHTML = "Wähle eine Sprache/Pick a language";
  mainOutput.appendChild(textParagraph);
  const deutsch = document.createElement("button");
  deutsch.innerHTML = "Deutsch";
  mainOutput.appendChild(deutsch);
  console.log(deutsch);
  const english = document.createElement("button");
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
    textParagraphEnglish.innerHTML = "Pick a level";
    mainOutput.appendChild(textParagraphEnglish);
    const easy = document.createElement("button");
    easy.innerHTML = "Easy";
    mainOutput.appendChild(easy);
    console.log(easy);
    const hard = document.createElement("button");
    hard.innerHTML = "Hard";
    mainOutput.appendChild(hard);
    console.log(hard);
  
    //auch hier clickEvent, damit dann die funktion zum fetchen aufgerufen und eingebunden werden kann!
    easy.addEventListener('click', easyQuizForm);
    // hard.addEventListener('click', niveauAuswahlEnglish);

  }

//?deutsche niveauauswahl ersztellen
function niveauAuswahlDeutsch () {
  mainOutput.innerHTML = "";
  const textParagraphDeutsch = document.createElement("p");
  textParagraphDeutsch.innerHTML = "Wähle ein Niveau";
  mainOutput.appendChild(textParagraphDeutsch);
  const leicht = document.createElement("button");
  leicht.innerHTML = "Leicht";
  mainOutput.appendChild(leicht);
  console.log(leicht);
  const schwer = document.createElement("button");
  schwer.innerHTML = "Schwer";
  mainOutput.appendChild(schwer);
  console.log(schwer);

}





//? englische einfacheVersion fetchen


// function easyQuizz() {
//   fetch(BASEURL)
//     .then((response: Response) => {
//       if (!response.ok) {
//         throw Error(`${response.status} ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then((products: IProduct[]) => {
//       easyQuizForm(products);
//       allProducts = products;
//     });
// }


//? engliche funktion damit beim API fetchen wir die englische version haben (rendern was wir holen)
function easyQuizForm (questions: IQuiz[]){
 // einzelne frage + antwort + ergebnis fetchen  
const singleQuestionDiv= questions.map((question: IQuiz) => {
  const frage = document.createElement("h3");
  frage.innerHTML = question.question;
  mainOutput.appendChild(frage);

  const antwotenDiv = document.createElement('div')
  const antwortenArray: string[] = question.answers;
  console.log(antwortenArray);
  antwortenArray.forEach ((antwort,index)=>{
    const radioButton = document.createElement('button');
    radioButton.value = index.toString();
    radioButton.innerHTML = antwort;
    antwotenDiv.appendChild(radioButton)
  

  })

})
singleQuestionDiv.forEach((product) =>  {
  return mainOutput.appendChild(product); 
});
}





