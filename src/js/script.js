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
