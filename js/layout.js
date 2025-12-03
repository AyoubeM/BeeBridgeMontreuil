// ===== FOOTER =====
fetch("partial/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(err => console.error("Erreur Footer:", err));

// ===== NAVBAR =====
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

// ===== FAQ =====
function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");

      const answer = question.nextElementSibling;
      answer.classList.toggle("hidden");
    });
  });
}

document.addEventListener("DOMContentLoaded", initFAQ);

// ===== CARROUSEL PARTENAIRES =====
const logos = document.querySelectorAll(".logo-box");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.querySelector(".carousel-indicators");
const carouselContainer = document.querySelector(".carousel-container");

if (logos.length > 0 && prevBtn && nextBtn && indicatorsContainer) {
  let currentIndex = 0;
  const totalLogos = logos.length;
  let autoPlayId = null;

  // Création des indicateurs
  indicatorsContainer.innerHTML = "";
  logos.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("indicator");
    dot.dataset.index = index;
    indicatorsContainer.appendChild(dot);
  });

  const indicators = indicatorsContainer.querySelectorAll(".indicator");

  function updateCarousel() {
    const baseDistance = window.innerWidth < 768 ? 180 : 260;

    logos.forEach((logo, index) => {
      let offset = index - currentIndex;

      // On ramène l’offset dans [-N/2, N/2]
      if (offset > totalLogos / 2) offset -= totalLogos;
      else if (offset < -totalLogos / 2) offset += totalLogos;

      const absOffset = Math.abs(offset);

      // Logos trop loin → on réduit pour ne plus casser le layout
      if (absOffset > 2) {
        logo.style.opacity = 0;
        logo.style.transform = "translate(-50%, -50%) scale(0.5)";
        logo.style.zIndex = 1;
        return;
      }

      const scale =
        absOffset === 0 ? 1.1 : 1 - Math.min(absOffset * 0.15, 0.5);
      const opacity = 0.4 + (2 - absOffset) * 0.25;

      logo.style.transform = `translate(-50%, -50%) translateX(${
        offset * baseDistance
      }px) scale(${scale})`;
      logo.style.opacity = opacity;
      logo.style.zIndex = 100 - absOffset;

      logo.classList.toggle("active", absOffset === 0);
    });

    // Mise à jour indicateurs
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
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

  function startAutoPlay() {
    if (autoPlayId === null) {
      autoPlayId = setInterval(nextSlide, 4000);
    }
  }

  function stopAutoPlay() {
    if (autoPlayId !== null) {
      clearInterval(autoPlayId);
      autoPlayId = null;
    }
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Boutons
  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoPlay();
  });

  // Indicateurs
  indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
      currentIndex = parseInt(indicator.dataset.index, 10);
      updateCarousel();
      restartAutoPlay();
    });
  });

  // Pause sur hover
  carouselContainer.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer.addEventListener("mouseleave", startAutoPlay);

  window.addEventListener("resize", updateCarousel);

  // Init
  updateCarousel();
  startAutoPlay();
}
