export function carouselSlide() {
  try {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".carousel-container button");

    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const scrollAmount = carousel.offsetWidth; // Width of the carousel depending on the size. Shame it does not include gap or padding.
        carousel.scrollLeft += btn.id === "left" ? -scrollAmount : scrollAmount;
      });
    });
  } catch (error) {
    console.error("Error in identicalTitle:", error);
  }
}
