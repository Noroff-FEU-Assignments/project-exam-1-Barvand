import { fetchData } from "./fetch.js"
import { postHolderDiv, renderCarousel } from "./Functions/renderindex.js"
import { initSlider } from "./Functions/carousel.js"; 
import { displayBlogsPage } from "./Functions/renderblogs.js";
import { renderBlogPage } from "./Functions/renderblogpage.js";




const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard&per_page=20";

const errorContainer = document.querySelector(".flex-wrapper");
const errorContainerBlogPage = document.querySelector(".flex-wrapper-blogpage");

async function displayCorrectFunction() {
    try {
        const post = await fetchData(url);
        const webUrl = window.location.href;

        if (!webUrl.includes("blogs") && !webUrl.includes("blogpage") && !webUrl.includes("about") 
        && !webUrl.includes("charts") && !webUrl.includes("contact")  && !webUrl.includes("warning")) {
            renderCarousel();
            initSlider();
        } else if (webUrl.includes("blogs")) {
           await displayBlogsPage(); // Make sure displayBlogsPage completes before moving on
        } else if (webUrl.includes("blogpage")) {
            renderBlogPage();
        } else if (webUrl.includes("contact")) {
            // Handle contact page logic if needed
        } else if (webUrl.includes("warning")) { 

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
  





  // Hamburger menu 
 const hamburger = document.querySelector(".hamburger"); 
 const navMenu = document.querySelector(".nav-menu"); 


 hamburger.addEventListener("click", () => { 
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");  
 })

 document.querySelectorAll(".nav-link").forEach(n => n.
  addEventListener("click", () => { 
    hamburger.classList.remove("active"); 
    navMenu.classList.remove("active"); 
  }))