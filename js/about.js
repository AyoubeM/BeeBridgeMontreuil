fetch("partial/about.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("about").innerHTML = data;
  })
  .catch(err => console.error("Erreur navbar:", err));
