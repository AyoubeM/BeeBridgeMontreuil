let currentLang;

// Détection langue enregistrée ou navigateur
if (localStorage.getItem("lang")) {
  currentLang = localStorage.getItem("lang");
} else {
  currentLang = navigator.language.startsWith("en") ? "en" : "fr";
  localStorage.setItem("lang", currentLang);
}

// ----------- CHARGER LA LANGUE -----------
function loadLang(lang) {
  fetch("/BeeBridgeMontreuil/lang/" + lang + ".json")
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-translate]").forEach(el => {
        let key = el.getAttribute("data-translate");
        if (data[key]) el.textContent = data[key];
      });
    })
    .catch(err => console.error("Erreur langue:", err));

  localStorage.setItem("lang", lang);
  updateFlag(lang);
}


// ----------- METTRE À JOUR LE DRAPEAU -----------
function updateFlag(lang) {

  let img = document.querySelector("#langSwitcher img");

  // Si navbar n'est pas encore chargée → on retry
  if (!img) {
    setTimeout(() => updateFlag(lang), 100);
    return;
  }

  if (lang === "fr") {
    img.src = "/BeeBridgeMontreuil/media/fr.png";
    img.alt = "Français";
  } else {
    img.src = "/BeeBridgeMontreuil/media/uk.png";
    img.alt = "English";
  }
}


// ----------- INITIALISER SWITCHER APRÈS CHARGEMENT NAVBAR -----------
function initLangSwitcher() {

  const btn = document.getElementById("langSwitcher");

  if (!btn) {
    // Navbar encore pas chargée → retry
    setTimeout(initLangSwitcher, 100);
    return;
  }

  btn.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    loadLang(currentLang);
  });
}


// ----------- LANCER LORSQUE TOUT EST CHARGÉ -----------
document.addEventListener("DOMContentLoaded", () => {
  initLangSwitcher();
  loadLang(currentLang);
});
