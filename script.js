//Preguntas y respuestas del Quiz//

const questions = [
  {
    question: "El Aconcagua es el pico más alto del país ¿Cuál es el segundo?",
    answers: [
      { text: "Ojos del salado, Catamarca", correct: false },
      { text: "Monte Pissis, Catamarca/La Rioja", correct: true },
      { text: "Tupungato, Mendoza", correct: false },
    ]
  },
  {
    question: "¿Cuánto mide de alto el Glaciar Perito Moreno?",
    answers: [
      { text: "60 metros", correct: true },
      { text: "70 metros", correct: false },
      { text: "80 metros", correct: false },
    ]
  },
  {
    question: "¿En qué provincia se encuentra la Isla Martín García?",
    answers: [
      { text: "Rio Negro", correct: false },
      { text: "Santa Cruz", correct: false },
      { text: "Buenos Aires", correct: true },
    ]
  },
  {
      question: "¿Cuál es el lago o laguna más grande del país?",
    answers: [
      { text: "Laguna Mar Chiquita, Córdiba", correct: true},
      { text: "Lago Argentino, Santa Cruz", correct: false },
      { text: "Lago Nahuel Huapi, Río Negro y Neuquén", correct: false },
    ]
  }
];

//Declaro mis constantes, otorgando nombre a los valores y los metodos que uso para invocarlas a travez de ID que les di en el index.html//
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Declaro los valores numericos de mis preguntas y puntaje//
let currentQuestionIndex = 0;
let score = 0;

//Funcion para empezar un Quiz, preguntas y respuestas - Le doy valor de 0 a la pregunta 1 y al puntaje, asi comienza desde 0, a su vez, invoco al a funcion showquestion que defino posteriormente//
function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Siguiente";
  showQuestion();
}

//Invoco a las preguntas para que aparezca en lugar de "show question here" y le voy sumando + 1 al hacer click en next//
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  //Invoco las respuestas en el boton de "answer"//
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    //Funcion para hacer click con condicional//
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer); //Mas abajo creo la funcion selectanswer// 
  });
}

//Para que cuando agregue mis respuestas, no aparezca el "answer 1,2,3,4" y solo las respuestas que quiero//
function resetState() { 
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//Funcion para definir si decir correcto o incorrecto segun la respuesta que de en mi quiz//
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; //Se suma de a 1 punto el score//
  } else {
    selectedBtn.classList.add("incorrect");
  }


  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); //Agrega el color verde al boton correcto aunque yo toque en el incorrecto//
    }
    button.disabled = true; //No se podra hacer click en ningun otro boton//
  });
  nextButton.style.display = "block"; //Se despliega el boton de siguiente pregunta//
}

//Funcion para mostrar el puntaje//
function showScore() {
  resetState();
  questionElement.innerHTML = `Tu puntaje ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Juega de nuevo";
  nextButton.style.display = "block";
}

//Funcion para ir a la siguiente pregunta y al final mostrar el score//
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

//Agrego la funcion para hacer click en el boton "siguiente" y que se diriga a la siguiente pregunta//
nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz(); 