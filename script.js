function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Afficher/Masquer le bouton selon le scroll
window.addEventListener("scroll", () => {
  const scrollBtn = document.getElementById("scrollToTop");
  if (window.scrollY > 300 && document.getElementById("lightbox").style.display !== "flex") {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Lors de l'ouverture du lightbox → cacher le bouton
function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("scrollToTop").style.display = "none";
}

// Lors de la fermeture → réévaluer l’affichage du bouton
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  if (window.scrollY > 300) {
    document.getElementById("scrollToTop").style.display = "block";
  }
}

//Affichage du bouton pour remonter la page
const scrollToTopBtn = document.getElementById("scrollToTop");

// Affiche le bouton seulement après défilement
window.addEventListener("scroll", () => {
  scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// Scroll fluide vers le haut
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
