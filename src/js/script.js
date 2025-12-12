// Script JavaScript principal - Type module

// Gestion du menu
const menuToggle = document.querySelector(".header__menu-toggle")
const menuClose = document.querySelector(".menu__close")
const menu = document.getElementById("menu")

// Fonction pour ouvrir le menu
function openMenu() {
  menu.classList.add("menu--open")
  menuToggle.classList.add("header__menu-toggle--active")
  menuToggle.setAttribute("aria-expanded", "true")
  // Empêcher le scroll du body quand le menu est ouvert
  document.body.style.overflow = "hidden"
}

// Fonction pour fermer le menu
function closeMenu() {
  menu.classList.remove("menu--open")
  menuToggle.classList.remove("header__menu-toggle--active")
  menuToggle.setAttribute("aria-expanded", "false")
  // Réactiver le scroll du body
  document.body.style.overflow = ""
}

// Événement : Clic sur le bouton hamburger
menuToggle.addEventListener("click", () => {
  if (menu.classList.contains("menu--open")) {
    closeMenu()
  } else {
    openMenu()
  }
})

// Événement : Clic sur le bouton fermeture (croix)
menuClose.addEventListener("click", closeMenu)

// Événement : Fermer le menu si on clique sur un lien
const menuLinks = document.querySelectorAll(".menu__link")
menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu)
})

function setActiveMenuLink() {
  // Récupérer le nom du fichier HTML actuel (ex: "index.html", "contact.html")
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  // Extraire le nom de la page sans l'extension (ex: "contact" depuis "contact.html")
  const pageName = currentPage.replace(".html", "")

  // Trouver tous les liens du menu
  const menuLinks = document.querySelectorAll(".menu__link")

  // Parcourir les liens et ajouter la classe active au lien correspondant
  menuLinks.forEach((link) => {
    const linkPage = link.getAttribute("data-page")

    if (linkPage === pageName) {
      // Ajouter la classe active au lien correspondant
      link.classList.add("menu__link--active")
    } else {
      // Retirer la classe active des autres liens
      link.classList.remove("menu__link--active")
    }
  })
}

// Appeler la fonction au chargement de la page
setActiveMenuLink()


// menu voir https://lumimix.pierre-mouilleseaux-lhuillier.fr/artiste


// Gestion des FAQ accordéons
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-item__button")

    button.addEventListener("click", () => {
      // Fermer tous les autres items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("faq-item--active")) {
          otherItem.classList.remove("faq-item--active")
        }
      })

      // Toggle l'item courant
      item.classList.toggle("faq-item--active")
    })
  })
})


// faq lien https://lumimix.pierre-mouilleseaux-lhuillier.fr/info_pratique


// Simple carousel module for artist gallery
const carousels = document.querySelectorAll('[data-carousel]');
if (carousels.length === 0) {
  // nothing to do
} else {
  carousels.forEach(initCarousel);
}

function initCarousel(root) {
  const track = root.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const prevButton = root.querySelector('.carousel__btn--prev');
  const nextButton = root.querySelector('.carousel__btn--next');
  const nav = root.querySelector('.carousel__nav');

  let currentIndex = 0;
  let autoplayInterval = null;

  function setSlidePositions() {
    slides.forEach((slide, index) => {
      slide.style.left = (100 * index) + '%';
    });
  }

  function createDots() {
    slides.forEach((_, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'carousel__indicator';
      if (idx === 0) btn.classList.add('is-selected');
      btn.addEventListener('click', () => moveTo(idx));
      nav.appendChild(btn);
    });
  }

  function updateDots(idx) {
    const dots = Array.from(nav.children);
    dots.forEach((d, i) => d.classList.toggle('is-selected', i === idx));
  }

  function moveTo(targetIndex) {
    track.style.transform = `translateX(-${100 * targetIndex}%)`;
    updateDots(targetIndex);
    currentIndex = targetIndex;
  }

  prevButton.addEventListener('click', () => {
    const target = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    moveTo(target);
  });

  nextButton.addEventListener('click', () => {
    const target = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    moveTo(target);
  });

  // keyboard navigation
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevButton.click();
    if (e.key === 'ArrowRight') nextButton.click();
  });

  // autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => nextButton.click(), 4500);
  }
  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', startAutoplay);

  window.addEventListener('resize', setSlidePositions);

  // Initialize
  setSlidePositions();
  createDots();
  startAutoplay();

  // make carousel focusable for keyboard
  if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '0');
}

export { };

//carousel https://lumimix.pierre-mouilleseaux-lhuillier.fr/card_artiste
