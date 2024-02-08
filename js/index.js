import { fetchData } from "./fetch.js";
import { renderCarousel } from "./Functions/renderindex.js";
import { initSlider } from "./Functions/carousel.js";
import { displayBlogsPage } from "./Functions/renderblogs.js";
import { renderBlogPage } from "./Functions/renderblogpage.js";
import { setupHamburgerMenu } from "./Functions/hamburgermenu.js";

const url =
  "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard&per_page=20";

const errorContainer = document.querySelector(".flex-wrapper");
const errorContainerBlogPage = document.querySelector(".flex-wrapper-blogpage");

async function displayCorrectFunction() {
  try {
    const post = await fetchData(url);
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
      initSlider();
    } else if (webUrl.includes("blogs")) {
      await displayBlogsPage();
    } else if (webUrl.includes("blogpage")) {
      renderBlogPage();
    } else if (webUrl.includes("contact")) {
    } else if (webUrl.includes("warning")) {
    } else {
    }

    // After fetching data and rendering, initialize the slider
  } catch (error) {
    console.error("Error in displayCorrectFunction:", error);

    if (errorContainer) {
      errorContainer.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
    } else {
      if (errorContainerBlogPage) {
        errorContainerBlogPage.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
      }
    }
  }
}

displayCorrectFunction();
setupHamburgerMenu();
