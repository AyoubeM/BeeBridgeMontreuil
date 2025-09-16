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

  localStorage.setItem("lang", lang);
  document.getElementById("langSwitcher").value = lang;
}

// Changement de langue
document.getElementById("langSwitcher").addEventListener("change", e => {
  loadLang(e.target.value);
});

// Chargement initial
loadLang(currentLang);
  