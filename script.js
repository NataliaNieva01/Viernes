const filterButtons = document.querySelectorAll(".filter-chip");
const productCards = document.querySelectorAll(".product-card");
const emptyMessage = document.querySelector(".empty-message");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    productCards.forEach((card) => {
      const isVisible = category === "Todas" || card.dataset.category === category;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    emptyMessage.hidden = visibleCount > 0;
  });
});

const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector(".toast");
let itemCount = 0;
let toastTimeout;

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    cartCount.textContent = String(itemCount);
    toast.textContent = `${button.dataset.name} se sumó al carrito`;
    toast.classList.add("visible");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2200);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  mainNav.classList.toggle("open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mainNav.classList.remove("open");
  });
});

document.querySelector(".club-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.querySelector("#email");
  const formMessage = document.querySelector(".form-message");

  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  formMessage.textContent = "¡Listo! Te esperamos en el club.";
  emailInput.value = "";
});
