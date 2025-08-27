// =============================
// 1) LISTE DES QUIZZ (préparer pour plusieurs)
// =============================
const allQuizzes = [
  [
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
  ],
  [
    {
      text: "La couche Physique s'occupe de :",
      type: "single",
      choices: ["Adressage IP", "Transmission des bits", "Chiffrement", "Compression"],
      correct: 1,
    },
    {
      text: "Quelles sont des protocoles de la couche Application ?",
      type: "multi",
      choices: ["HTTP", "FTP", "TCP", "SMTP"],
      correct: [0, 1, 3],
    },
  ],
  [
    {
      text: "La couche Transport utilise TCP et UDP.",
      type: "single",
      choices: ["Vrai", "Faux"],
      correct: 0,
    },
    {
      text: "Laquelle de ces couches fait partie du modèle OSI ?",
      type: "single",
      choices: ["Couche Session", "Couche Système", "Couche Données", "Couche Internet"],
      correct: 0,
    },
  ],
];

// Choisir un quiz aléatoire
const quiz = allQuizzes[Math.floor(Math.random() * allQuizzes.length)];

// =============================
// 2) GÉNÉRER LE QUIZ DANS LE DOM
// =============================
const main = document.querySelector(".details");
main.innerHTML = `
  <form id="quiz-form" class="quiz-form">
    <h2>Répondez à toutes les questions :</h2>
    <div id="quiz-questions"></div>
    <button type="submit" id="submitBtn">Valider mes réponses</button>
  </form>
  <button id="retryBtn" class="hidden">Recommencer un nouveau quiz</button>
  <div id="popup" class="popup hidden">
    <div class="popup-content">
      <h2>Résultat</h2>
      <p id="popup-score"></p>
      <button id="closePopupBtn">Fermer</button>
    </div>
  </div>
`;

const quizContainer = document.getElementById("quiz-questions");

// Création des questions
quiz.forEach((q, index) => {
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
// 3) VALIDATION & FEEDBACK
// =============================
document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;

  quiz.forEach((q, index) => {
    const selectedInputs = [...document.querySelectorAll(`input[name="question-${index}"]:checked`)].map(
      (input) => parseInt(input.value)
    );

    const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];

    const isCorrect =
      selectedInputs.length === correctAnswers.length &&
      selectedInputs.every((val) => correctAnswers.includes(val));

    // Colorer les réponses
    const labels = document.querySelectorAll(`input[name="question-${index}"]`);
    labels.forEach((input) => {
      const parent = input.parentElement;
      const val = parseInt(input.value);

      if (correctAnswers.includes(val)) {
        parent.style.backgroundColor = "#d4edda"; // Vert clair
      } else if (selectedInputs.includes(val)) {
        parent.style.backgroundColor = "#f8d7da"; // Rouge clair
      }
      input.disabled = true;
    });

    if (isCorrect) {
      score++;
    }
  });

  // Afficher la pop-up
  const popup = document.getElementById("popup");
  const popupScore = document.getElementById("popup-score");
  popupScore.textContent = `Votre score : ${score} / ${quiz.length}`;
  popup.classList.remove("hidden");

  // Afficher le bouton recommencer
  document.getElementById("retryBtn").classList.remove("hidden");
});

// =============================
// 4) FERMER POPUP (voir erreurs)
// =============================
document.getElementById("closePopupBtn").addEventListener("click", () => {
  document.getElementById("popup").classList.add("hidden");
});

// =============================
// 5) RECOMMENCER (nouveau quiz)
// =============================
document.getElementById("retryBtn").addEventListener("click", () => {
  location.reload();
});
