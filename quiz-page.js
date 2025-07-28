document.addEventListener("DOMContentLoaded", function () {
  const titleElement = document.getElementById("quiz-title");
  const quizContent = document.getElementById("quiz-content");
  const nextBtn = document.getElementById("nextBtn");
  const resultBox = document.getElementById("result");

  fetch("quiz-data.json")
    .then(response => response.json())
    .then(data => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");

      if (!category) {
        titleElement.textContent = "No category selected!";
        quizContent.innerHTML = "<p>Please go back and select a quiz category.</p>";
        return;
      }

      titleElement.textContent = category.toUpperCase();

      // Case-insensitive and trimmed match
      const section = data.sections.find(
        sec => sec.sectionTitle.toLowerCase().trim() === category.toLowerCase().trim()
      );

      if (!section) {
        quizContent.innerHTML = "<p>No questions found for this category.</p>";
        return;
      }

      let current = 0;
      let score = 0;

      function loadQuestion() {
        const q = section.questions[current];
        quizContent.innerHTML = "";

        const questionEl = document.createElement("h3");
        questionEl.textContent = `Q${current + 1}. ${q.question}`;
        questionEl.style.marginBottom = "20px";
        quizContent.appendChild(questionEl);

        let inputEl;

        if (q.questionType === "mcq") {
          const optionsContainer = document.createElement("div");
          optionsContainer.style.display = "flex";
          optionsContainer.style.flexDirection = "column";
          optionsContainer.style.gap = "12px";

          q.options.forEach(opt => {
            const label = document.createElement("label");
            label.style.backgroundColor = "#9575cd";
            label.style.padding = "12px";
            label.style.borderRadius = "10px";
            label.style.cursor = "pointer";
            label.style.fontWeight = "bold";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "answer";
            radio.value = opt;
            radio.style.marginRight = "10px";

            label.appendChild(radio);
            label.append(opt);
            optionsContainer.appendChild(label);
          });

          quizContent.appendChild(optionsContainer);
        } else {
          inputEl = document.createElement("input");
          inputEl.type = q.questionType === "number" ? "number" : "text";
          inputEl.name = "answer";
          inputEl.required = true;
          inputEl.autofocus = true;
          inputEl.style.width = "100%";
          inputEl.style.padding = "10px";
          inputEl.style.borderRadius = "8px";
          quizContent.appendChild(inputEl);
        }

        nextBtn.style.display = "inline-block";
        nextBtn.onclick = function () {
          let userAnswer;

          if (q.questionType === "mcq") {
            const selected = document.querySelector('input[name="answer"]:checked');
            if (!selected) return alert("Please select an answer.");
            userAnswer = selected.value;
          } else {
            userAnswer = inputEl.value.trim();
            if (!userAnswer) return alert("Please enter an answer.");
          }

          const correctAnswer = q.answer.toString().toLowerCase();
          const userInput = userAnswer.toString().toLowerCase();

          const isCorrect =
            (q.questionType === "number" && parseInt(userAnswer) === parseInt(q.answer)) ||
            (q.questionType !== "number" && userInput === correctAnswer);

          if (isCorrect) score++;

          current++;
          if (current < section.questions.length) {
            loadQuestion();
          } else {
            showResult();
          }
        };
      }

      function showResult() {
        quizContent.innerHTML = "";
        nextBtn.style.display = "none";
        resultBox.innerHTML = `<h2>Your Score: ${score} / ${section.questions.length}</h2>`;
      }

      loadQuestion();
    })
    .catch(err => {
      console.error("Failed to load quiz data:", err);
      quizContent.innerHTML = "<p>Could not load quiz data.</p>";
    });
});
