// Scroll fluide vers le haut
document.getElementById("scrollToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Affiche ou masque le bouton selon le scroll et la visibilité du lightbox
window.addEventListener("scroll", () => {
  const scrollBtn = document.getElementById("scrollToTop");
  const lightboxVisible = document.getElementById("lightbox").style.display === "flex";
  scrollBtn.style.display = window.scrollY > 200 && !lightboxVisible ? "block" : "none";
});

function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("scrollToTop").style.display = "none";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  if (window.scrollY > 300) {
    document.getElementById("scrollToTop").style.display = "block";
  }
}
