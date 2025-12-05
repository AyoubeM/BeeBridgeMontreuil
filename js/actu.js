// Gestion des boutons "Lire la suite"
document.addEventListener('DOMContentLoaded', function() {
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Trouve le contenu complet de l'article parent
      const article = this.closest('.blog-article');
      const fullContent = article.querySelector('.article-content-full');
      
      // Toggle l'affichage du contenu
      fullContent.classList.toggle('expanded');
      
      // Change le texte et l'état du bouton
      if (fullContent.classList.contains('expanded')) {
        this.textContent = 'Réduire';
        this.classList.add('active');
        
        // Scroll smooth vers le début de l'article
        setTimeout(() => {
          article.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      } else {
        this.textContent = 'Lire la suite';
        this.classList.remove('active');
      }
    });
  });
  
  // Animation au scroll pour les articles
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Initialise l'animation pour chaque article
  const articles = document.querySelectorAll('.blog-article');
  articles.forEach((article, index) => {
    article.style.opacity = '0';
    article.style.transform = 'translateY(30px)';
    article.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(article);
  });
});