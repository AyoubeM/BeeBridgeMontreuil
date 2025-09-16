let  currentlang;

if (localStorage.getItem("lang")) {
  currentLang = localStorage.getItem("lang");
} else {
  currentLang = navigator.language.startsWith("en") ? "en" : "fr";
  localStorage.setItem("lang", currentLang);
}

function LoadLang(lang){
    fetch(`lang/${lang}.json`)
    .then
}