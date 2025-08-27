// =============================
// 1) QUESTIONS
// =============================
const questions = [
  {
    text: "Combien de couches comporte le modèle OSI ?",
    type: "single",
    choices: ["3", "5", "7", "9"],
    correct: 2,
  },
  {
    text: "Quelles couches appartiennent au modèle OSI ?",
    type: "multi",
    choices: ["Application", "Transport", "Présentation", "Base de données"],
    correct: [0, 1, 2],
  },
  {
    text: "La couche Réseau s'occupe du routage des paquets.",
    type: "single",
    choices: ["Vrai", "Faux"],
    correct: 0,
  },
];

// =============================
// 2) GÉNÉRER LE QUIZ
// =============================
const main = document.querySelector(".details");
main.innerHTML = `
  <form id="quiz-form" class="quiz-form">
    <h2>Répondez à toutes les questions :</h2>
    <div id="quiz-questions"></div>
    <button type="submit" id="submitBtn">Valider mes réponses</button>
  </form>
`;

const quizContainer = document.getElementById("quiz-questions");

// Crée les blocs pour chaque question
questions.forEach((q, index) => {
  const questionBlock = document.createElement("div");
  questionBlock.classList.add("quiz-question");

  const questionTitle = document.createElement("p");
  questionTitle.textContent = `${index + 1}. ${q.text}`;
  questionBlock.appendChild(questionTitle);

  q.choices.forEach((choice, i) => {
    const label = document.createElement("label");
    label.classList.add("choice");

    const input = document.createElement("input");
    input.type = q.type === "multi" ? "checkbox" : "radio";
    input.name = `question-${index}`;
    input.value = i;

    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));
    questionBlock.appendChild(label);
  });

  quizContainer.appendChild(questionBlock);
});

// =============================
// 3) VALIDATION DU FORMULAIRE
// =============================
document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;

  questions.forEach((q, index) => {
    const selectedInputs = [...document.querySelectorAll(`input[name="question-${index}"]:checked`)].map(
      (input) => parseInt(input.value)
    );

    const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];

    const isCorrect =
      selectedInputs.length === correctAnswers.length &&
      selectedInputs.every((val) => correctAnswers.includes(val));

    if (isCorrect) {
      score++;
    }
  });

  alert(`Votre score : ${score} / ${questions.length}`);
});
