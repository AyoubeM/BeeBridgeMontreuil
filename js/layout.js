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

function updateCarousel() {
  // Distance adaptée à la taille d'écran
  const baseDistance = window.innerWidth < 768 ? 150 : 260; // Réduit de 180 à 150
  
  // Limiter le nombre d'éléments visibles sur mobile
  const maxVisibleOffset = window.innerWidth < 768 ? 1 : 2;

  logos.forEach((logo, index) => {
    let offset = index - currentIndex;

    if (offset > totalLogos / 2) {
      offset -= totalLogos;
    } else if (offset < -totalLogos / 2) {
      offset += totalLogos;
    }

    const absOffset = Math.abs(offset);

    // Sur mobile, masquer les éléments trop éloignés
    if (window.innerWidth < 768 && absOffset > maxVisibleOffset) {
      logo.style.opacity = 0;
      logo.style.transform = `translate(-50%, -50%) scale(0)`;
      return;
    }

    const scale = absOffset === 0 ? 1.1 : 1 - Math.min(absOffset * 0.15, 0.5);
    const opacity = absOffset <= 2 ? 0.4 + (2 - absOffset) * 0.25 : 0;

    logo.style.transform = `translate(-50%, -50%) translateX(${offset * baseDistance}px) scale(${scale})`;
    logo.style.opacity = opacity;
    logo.style.zIndex = 100 - absOffset;

    logo.classList.toggle('active', absOffset === 0);
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}