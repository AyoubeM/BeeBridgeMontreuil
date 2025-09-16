let currentLang;

// 1. Détecter langue enregistrée ou celle du navigateur
if (localStorage.getItem("lang")) {
  currentLang = localStorage.getItem("lang");
} else {
  currentLang = navigator.language.startsWith("en") ? "en" : "fr";
  localStorage.setItem("lang", currentLang);
}

// 2. Charger le fichier JSON de traduction
function loadLang(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      // Remplacer tous les textes avec data-translate
      document.querySelectorAll("[data-translate]").forEach(el => {
        let key = el.getAttribute("data-translate");
        if (data[key]) {
          el.textContent = data[key];
        }
      });
    });
}