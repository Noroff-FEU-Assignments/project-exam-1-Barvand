// Hamburger menu interactivity
export function setupHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active-menu");
    navMenu.classList.toggle("active-menu");
  });

  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active-menu");
      navMenu.classList.remove("active-menu");
    })
  );
}
