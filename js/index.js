import { fetchData } from "./fetch.js"
import { postHolderDiv, renderCarousel } from "./Functions/renderindex.js"
import { initSlider } from "./Functions/carousel.js"; 
import { displayBlogsPage } from "./Functions/renderblog.js";
import { renderBlogPage } from "./Functions/renderblogpage.js";




const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?_embed";

const errorContainer = document.querySelector(".flex-wrapper"); 
const errorContainerBlogPage = document.querySelector(".flex-wrapper-blogpage")



async function displayCorrectFunction() {
    try {
      const post = await fetchData(url);
      const webUrl = window.location.href;
  
      // I organized the index page like this, as before I initialized it as if url includes INDEX and this caused some bugs and some functions not to display correctly.
      if (
        !webUrl.includes("blogs") &&
        !webUrl.includes("blogpage")
      ) {
        renderCarousel(); 
        
      } else if (webUrl.includes("blogs")) {
        displayBlogsPage(); 
      } else if (webUrl.includes("blogpage")) {
        renderBlogPage(); 
      } else if (webUrl.includes("contact")) { 
       
      }
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

  window.addEventListener("load", initSlider);
  





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