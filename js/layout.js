fetch("partial/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;

  
    updateFooterPDF(localStorage.getItem("lang") || "fr");
  })
  .catch(err => console.error("Erreur Footer:", err));

fetch("partial/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const langSwitcher = document.getElementById("langSwitcher");
    if (langSwitcher) {
      langSwitcher.addEventListener("change", e => {
        loadLang(e.target.value);
      });

      loadLang(localStorage.getItem("lang") || "fr");
    }
  })
  .catch(err => console.error("Erreur navbar:", err));

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

function updateFooterPDF(lang) {
  const legalLink = document.getElementById("legal-link");
  const privacyLink = document.getElementById("privacy-link");

  if (!legalLink || !privacyLink) return;

  if (lang === "en") {
    legalLink.href = "/BeeBridgeMontreuil/media/ENGLISH - LEGAL NOTICE — BEE BRIDGES INTERACTIVE.pdf";
    privacyLink.href = "/BeeBridgeMontreuil/media/ENGLISH PRIVACY POLICY — BEE BRIDGES INTERACTIVE.pdf";
  } else {
    legalLink.href = "/BeeBridgeMontreuil/media/MENTIONS LÉGALES — BEE BRIDGES INTERACTIVE.pdf";
    privacyLink.href = "/BeeBridgeMontreuil/media/POLITIQUE DE CONFIDENTIALITÉ — BEE BRIDGES INTERACTIVE.pdf";
  }
}
document.addEventListener("DOMContentLoaded", initFAQ);

// Carousel des logos des partenaires
const logos = document.querySelectorAll('.logo-box');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const carouselContainer = document.querySelector('.carousel-container');

if (logos.length > 0 && prevBtn && nextBtn && indicatorsContainer) {
  let currentIndex = 0;
  const totalLogos = logos.length;
  let autoPlayId = null;

  // Génération dynamique des indicateurs
  indicatorsContainer.innerHTML = '';
  logos.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    dot.dataset.index = index;
    indicatorsContainer.appendChild(dot);
  });

  const indicators = indicatorsContainer.querySelectorAll('.indicator');

  function updateCarousel() {
    const isMobile = window.innerWidth < 768;
    
    // Sur mobile : pas de décalage, uniquement le centre
    const baseDistance = isMobile ? 0 : 260;
    const maxVisibleSides = isMobile ? 0 : 2;

    logos.forEach((logo, index) => {
      let offset = index - currentIndex;

      // Normaliser l'offset pour un effet circulaire
      if (offset > totalLogos / 2) {
        offset -= totalLogos;
      } else if (offset < -totalLogos / 2) {
        offset += totalLogos;
      }

      const absOffset = Math.abs(offset);

      // Sur mobile, afficher UNIQUEMENT l'élément central
      if (isMobile) {
        if (absOffset === 0) {
          // Élément actif au centre - AUCUN translateX
          logo.style.transform = 'translate(-50%, -50%) translateX(0px) scale(1)';
          logo.style.opacity = '1';
          logo.style.zIndex = '100';
          logo.style.display = 'flex';
          logo.style.visibility = 'visible';
          logo.classList.add('active');
        } else {
          // Masquer complètement tous les autres
          logo.style.opacity = '0';
          logo.style.display = 'none';
          logo.style.visibility = 'hidden';
          logo.style.transform = 'translate(-50%, -50%) translateX(0px) scale(0)';
          logo.classList.remove('active');
        }
      } else {
        // Mode desktop - comportement normal
        logo.style.visibility = 'visible';
        
        if (absOffset > maxVisibleSides) {
          logo.style.opacity = '0';
          logo.style.transform = `translate(-50%, -50%) translateX(0px) scale(0.5)`;
          logo.style.zIndex = '-1';
          logo.classList.remove('active');
          logo.style.display = 'flex';
        } else {
          const scale = absOffset === 0 ? 1.1 : 1 - Math.min(absOffset * 0.15, 0.5);
          const opacity = absOffset === 0 ? 1 : 0.4;
          
          logo.style.transform = `translate(-50%, -50%) translateX(${offset * baseDistance}px) scale(${scale})`;
          logo.style.opacity = opacity;
          logo.style.zIndex = 100 - absOffset;
          logo.style.display = 'flex';
          logo.classList.toggle('active', absOffset === 0);
        }
      }
    });

    // Mise à jour des indicateurs
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

  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoPlay();
  });

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      currentIndex = parseInt(indicator.dataset.index, 10);
      updateCarousel();
      restartAutoPlay();
    });
  });

  carouselContainer.addEventListener('mouseenter', stopAutoPlay);
  carouselContainer.addEventListener('mouseleave', startAutoPlay);

  window.addEventListener('resize', updateCarousel);

  updateCarousel();
  startAutoPlay();
}