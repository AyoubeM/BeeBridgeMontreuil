fetch("partial/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(err => console.error("Erreur Footer:", err));

fetch("partial/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Changer de langue
    const langSwitcher = document.getElementById("langSwitcher");
    if (langSwitcher) {
      langSwitcher.addEventListener("change", e => {
        loadLang(e.target.value);
      });

      // Appliquer directement la langue enregistrée
      loadLang(localStorage.getItem("lang") || "fr");
    }
  })
  .catch(err => console.error("Erreur navbar:", err));

function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      // Toggle flèche
      question.classList.toggle("active");

      // Réponse correspondante
      const answer = question.nextElementSibling;
      answer.classList.toggle("hidden");
    });
  });
}
// pour eviter les crash

document.addEventListener("DOMContentLoaded", initFAQ);
// Carousel des logos des partenaires
  const logos = document.querySelectorAll('.logo-box');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 1;
  const totalLogos = logos.length;

  function updateCarousel() {
    logos.forEach((logo, index) => {
      logo.classList.toggle('active', index === currentIndex);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalLogos;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalLogos) % totalLogos;
    updateCarousel();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
