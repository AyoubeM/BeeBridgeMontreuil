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
