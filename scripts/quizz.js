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
// ==========================
// 4) Validation du quiz
// ==========================
const form = document.getElementById("quiz-form");
const popup = document.getElementById("popup");
const popupScore = document.getElementById("popup-score");
const retryBtn = document.getElementById("retryBtn");
const closePopupBtn = document.getElementById("closePopupBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement

  const questionBlocks = document.querySelectorAll(".quiz-question");
  let allAnswered = true;
  let score = 0;

  questionBlocks.forEach((block, index) => {
    const inputs = block.querySelectorAll("input");
    let answered = false;

    inputs.forEach((input) => {
      if (input.checked) {
        answered = true;
      }
    });

    if (!answered) {
      allAnswered = false;
      block.style.border = "2px solid orange";
    } else {
      block.style.border = "none";
    }
  });

  if (!allAnswered) {
    alert("Veuillez répondre à toutes les questions avant de valider !");
    return;
  }

  // Calcul du score et correction
  questionBlocks.forEach((block, index) => {
    const q = quiz[index];
    const inputs = block.querySelectorAll("input");
    let userAnswers = [];

    inputs.forEach((input) => {
      if (input.checked) {
        userAnswers.push(parseInt(input.value));
      }
    });

    let isCorrect;
    if (q.type === "single") {
      isCorrect = userAnswers.length === 1 && userAnswers[0] === q.correct;
    } else {
      isCorrect =
        userAnswers.length === q.correct.length && userAnswers.every((val) => q.correct.includes(val));
    }

    if (isCorrect) {
      block.style.backgroundColor = "#d4edda"; // vert
      score++;
    } else {
      block.style.backgroundColor = "#f8d7da"; // rouge

      if (!block.querySelector(".correct-answer")) {
        const correctAnswer = document.createElement("p");
        correctAnswer.classList.add("correct-answer");
        correctAnswer.style.color = "green";
        correctAnswer.style.fontStyle = "italic";

        let correctText;
        if (Array.isArray(q.correct)) {
          correctText = q.correct.map((idx) => q.choices[idx]).join(", ");
        } else {
          correctText = q.choices[q.correct];
        }

        correctAnswer.textContent = `La réponse est : ${correctText}`;
        block.appendChild(correctAnswer);
      }
    }
  });

  popupScore.textContent = `Vous avez eu ${score} bonnes réponses sur ${quiz.length}`;
  popup.classList.remove("hidden");
  retryBtn.classList.remove("hidden");
});

// ==========================
// 5) Bouton Fermer Pop-up
// ==========================
closePopupBtn.addEventListener("click", function () {
  popup.classList.add("hidden");
});

// ==========================
// 6) Bouton Recommencer
// ==========================
retryBtn.addEventListener("click", function () {
  // Réinitialiser les réponses et styles
  document.querySelectorAll(".quiz-question").forEach((block) => {
    block.style.backgroundColor = "transparent";
    block.style.border = "none";
    block.querySelectorAll("input").forEach((input) => {
      input.checked = false;
    });

    // Supprimer les corrections affichées
    const correction = block.querySelector(".correct-answer");
    if (correction) {
      correction.remove();
    }
  });

  popup.classList.add("hidden");
  retryBtn.classList.add("hidden");
});
