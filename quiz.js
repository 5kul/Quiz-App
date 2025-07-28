document.addEventListener("DOMContentLoaded", function () {
  const categoriesContainer = document.querySelector(".categories");
  const randomBtn = document.getElementById("randomQuizBtn");

  //  Safety checks
  if (!categoriesContainer || !randomBtn) {
    console.error("Missing DOM elements: .categories or #randomQuizBtn");
    return;
  }

  //  Define all categories
  const categories = [
    "Indian History",
    "General Knowledge",
    "Science",
    "Mathematics",
    "Indian Geography",
    "Indian Literature",
    "World History",
    "Technology",
  ];

  // Map images for categories
  const imageMap = {
    "General Knowledge": "https://surjeet-quizapp.netlify.app/img/gk.jpg",
    "Science": "https://surjeet-quizapp.netlify.app/img/science%20(1).jpg",
    "Mathematics": "https://surjeet-quizapp.netlify.app/img/maths.jpg",
    "Indian History": "https://surjeet-quizapp.netlify.app/img/history.jpg",
    "Indian Geography": "https://surjeet-quizapp.netlify.app/img/geography%202.jpg",
    "Technology": "https://surjeet-quizapp.netlify.app/img/techonology.jpg",
    "World History": "https://surjeet-quizapp.netlify.app/img/world%20history.jpeg",
    "Indian Literature": "https://surjeet-quizapp.netlify.app/img/literature.jpeg"
  };

  //  Create category cards dynamically
  categories.forEach(category => {
    const card = document.createElement("div");
    card.className = "category-card";

    const imageSrc = imageMap[category] || "https://via.placeholder.com/150";

    card.innerHTML = `
      <img src="${imageSrc}" alt="${category}" />
      <button>${category.toUpperCase()}</button>
    `;

    // ✅ Click event to redirect to quiz.html with category query param
    card.addEventListener("click", () => {
      const categoryParam = encodeURIComponent(category);
      window.location.href = `quiz.html?category=${categoryParam}`;
    });

    categoriesContainer.appendChild(card);
  });

  // ✅ Random quiz button click
  randomBtn.addEventListener("click", () => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryParam = encodeURIComponent(randomCategory);
    window.location.href = `quiz.html?category=${categoryParam}`;
  });
});
