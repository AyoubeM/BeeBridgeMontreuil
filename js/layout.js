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
  

fetch("partial/raph.html")  
  .then(res =>res.text())
  .then(data =>{
    document.getElementById("raphael").innerHTML = data;
  })
  .catch(err => console.error("Erreur Footer:", err));

fetch("partial/hamaza.html")  
  .then(res =>res.text())
  .then(data =>{
    document.getElementById("hamza").innerHTML = data;
  })
  .catch(err => console.error("Erreur Footer:", err));
 
  fetch("partial/maxsen.html")  
  .then(res =>res.text())
  .then(data =>{
    document.getElementById("maxen").innerHTML = data;
  })
  .catch(err => console.error("Erreur Footer:", err));