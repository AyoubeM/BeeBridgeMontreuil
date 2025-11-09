let currentLang;

// Détection langue enregistrée ou navigateur
if (localStorage.getItem("lang")) {
  currentLang = localStorage.getItem("lang");
} else {
  currentLang = navigator.language.startsWith("en") ? "en" : "fr";
  localStorage.setItem("lang", currentLang);
}

// Charger fichier de traduction
function loadLang(lang) {
  fetch("./lang/" + lang + ".json")
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-translate]").forEach(el => {
        let key = el.getAttribute("data-translate");
        if (data[key]) {
          el.textContent = data[key];
        }
      });
    })
    .catch(err => console.error("Erreur langue:", err));

  // Sauvegarder la langue choisie
  localStorage.setItem("lang", lang);

  // Changer le drapeau
  const langBtn = document.getElementById("langSwitcher").querySelector("img");
  if (lang === "fr") {
    langBtn.src = "/media/fr.png";
    langBtn.alt = "Français";
  } else {
    langBtn.src = "img/uk.png";
    langBtn.alt = "/media/uk.png";
  }
}

// Changement de langue au clic
document.getElementById("langSwitcher").addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "en" : "fr";
  loadLang(currentLang);
});

// Chargement initial
loadLang(currentLang);
