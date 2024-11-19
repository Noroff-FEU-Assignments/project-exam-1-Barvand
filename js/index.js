import { fetchData } from "./fetch.js";
import { renderCarousel } from "./Functions/renderindex.js";
import { displayBlogsPage } from "./Functions/renderblogs.js";
import { renderBlogPage } from "./Functions/renderblogpage.js";
import { setupHamburgerMenu } from "./Functions/hamburgermenu.js";
import { searchBar, createCategories } from "./utils.js";
import { carouselSlide } from "./Functions/carousel.js";

const errorContainer = document.querySelector(".flex-wrapper");
const errorContainerBlogPage = document.querySelector(".flex-wrapper-blogpage");

async function displayCorrectPage() {
  try {
    const webUrl = window.location.href;

    // display index page - set up like this so it does not interfere with netlify as it might change the name of the index page.
    if (
      !webUrl.includes("blogs") &&
      !webUrl.includes("blogpage") &&
      !webUrl.includes("about") &&
      !webUrl.includes("charts") &&
      !webUrl.includes("contact") &&
      !webUrl.includes("warning")
    ) {
      renderCarousel();
      carouselSlide();
    } else if (webUrl.includes("blogs")) {
      await displayBlogsPage();
      searchBar();
      createCategories();
    } else if (webUrl.includes("blogpage")) {
      renderBlogPage();
    } else if (webUrl.includes("contact")) {
    } else if (webUrl.includes("warning")) {
    }
  } catch (error) {
    console.error("Error in displayCorrectPage:", error);

    if (errorContainer) {
      errorContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
    } else {
      if (errorContainerBlogPage) {
        errorContainerBlogPage.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
      }
    }
  }
}

displayCorrectPage();
setupHamburgerMenu();
