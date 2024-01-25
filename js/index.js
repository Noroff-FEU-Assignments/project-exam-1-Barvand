import { fetchData } from "./fetch.js"
import { postHolderDiv } from "./Functions/RenderHTML.js"
import { createBlogsPage } from "./Functions/RenderHTML.js"
import { indexPost } from "./Functions/RenderHTML.js";

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?_embed";
const carousel = document.querySelector(".carousel-latest-posts")
const textParent = document.querySelector(".post-holder")

indexPost()

async function router() {
    try {
      const post = await fetchData(url);
      const urls = window.location.href;
  
      if (urls.includes("index")) {
      } 
    } catch (error) {
      console.error("Error in displayCorrectFunction:", error);
    }
  }
  
  router();
    
    


const blogContainer = document.querySelector(".blog-container") 
 
async function displayBlogPage () {
    const post = await fetchData(url)
    blogContainer.innerHTML = "";

    for (let i = 0; i <post.length; i++) { 
        const posts = post[i]; 

        const image = posts._embedded['wp:featuredmedia'][0].source_url; 
        const category = posts._embedded['wp:term'][0][0].name;  
        const title = posts.title.rendered;
        const date = posts.date; 
        const id = posts.id; 

        console.log(id)


        const dateString = posts.date;
        // Create a Date object from the string
        const dateObject = new Date(dateString);
        
        // Get the day and date components
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        
        createBlogsPage(image, title, category, formattedDate, id)
        
    }
}

displayBlogPage(); 


function handleRenderError(error) {
    console.error("Error in renderLatestPosts:", error);
    flexWrapper.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
}




const blogPage = document.querySelector(".blogpage"); 
const queryString = document.location.search;
const params = new URLSearchParams(queryString) 
const id = params.get("id"); 

const publishDateParent = document.querySelector(".blog-title");

async function renderBlogPage() {
    const post = await fetchData(url);
    blogPage.innerHTML = "";
    
    const queryStringId = id.toString();

    for (let i = 0; i < post.length; i++) {
        const posts = post[i];
        const postId = posts.id.toString();
         

        const dateString = posts.date;
        // Create a Date object from the string
        const dateObject = new Date(dateString);
        
        // Get the day and date components
        const options = { year: 'numeric', month: 'long' , day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);


        if (postId === queryStringId) {
            const title = posts.title.rendered;
            const content = posts.content.rendered; 
            const author = posts._embedded['author'][0].name;   
        
            identicalTitle(title);
            createContainerPublisher(formattedDate, author)
            displayBlogContent(content); 

            
            
        }
    }
}
    

async function identicalTitle(title) {
    const blogTitle = document.createElement("h1"); 
    blogTitle.classList.add("blog-title")
    blogTitle.innerText = title; 
    blogPage.appendChild(blogTitle);
}

async function createContainerPublisher(date, author) { 
    const publishContainer = document.createElement("div"); 
    publishContainer.classList.add("publish-container")
    blogPage.appendChild(publishContainer);
    
    const publishedDate = document.createElement("p"); 
    publishedDate.classList.add("publishedBlog"); 
    publishedDate.innerText = `Published on `; 
    publishContainer.appendChild(publishedDate)

    const dateSpan = document.createElement("span");
    dateSpan.innerText = ` // ${date}`;
    dateSpan.classList.add("date-color")
    publishedDate.appendChild(dateSpan)

    const publishedWhoElement = document.createElement("p"); 
    publishedWhoElement.classList.add("publishedBlog"); 
    publishedWhoElement.innerText = `Published by `; 
        publishContainer.appendChild(publishedWhoElement)

    const whoSpan = document.createElement("span");
    whoSpan.innerText = ` // ${author}`;
    whoSpan.classList.add("date-color")
    publishedWhoElement.appendChild(whoSpan)
} 


async function displayBlogContent(content) { 
    const blogContent = document.createElement("div"); 
    blogContent.classList.add("blogContent"); 
    blogContent.innerHTML = content;
    blogPage.appendChild(blogContent)
}



renderBlogPage()


const initSlider = () => { 
    const imageList = document.querySelector(".slider-wrapper .image-list"); 
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button"); 
    const sliderScrollBar = document.querySelector(".carousel-container .slider-scrollbar"); 
    const scrollBarThumb = document.querySelector(".scrollbar-thumb"); 
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth; 

    // handle scrollbar thumb drag
    scrollBarThumb.addEventListener("mousedown", (e) => {{ 
        const startX = e.clientX; 
        const thumbPosition = scrollBarThumb.offsetLeft; 


        // update thumb positon on mouse move
        const handleMouseMove = (e) => { 
            const deltaX = e.clientX - startX; 
            const newThumbPosition = thumbPosition + deltaX; 
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollBarThumb.offsetWidth; 

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;  

            scrollBarThumb.style.left = `${boundedPosition}px`; 
            imageList.scrollLeft = scrollPosition; 
        }

        const handleMouseUp = () => { 
            document.removeEventListener("mousemove", handleMouseMove); 
            document.removeEventListener("mouseup", handleMouseUp); 
        }

        // add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove); 
        document.addEventListener("mouseup", handleMouseUp); 

    }})
    
    // Slide images according to the slide button clicks
    slideButtons.forEach(button =>{
        button.addEventListener("click", () => { 
            const direction = button.id === "prev-slide" ? -1 : 1; 
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" }); 
        });
    });

    const handleSlideButtons = () => { 
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block"; 
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block"; 
    }

    // update scroll thumb positoin based on image scroll 
    const updateScrollThumbPosition = () => { 
        const scrollPosition = imageList.scrollLeft; 
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);
        scrollBarThumb.style.left = `${thumbPosition}px`; 
    }
    imageList.addEventListener("scroll", () => {
        handleSlideButtons(); 
        updateScrollThumbPosition(); 
    }); 
}

window.addEventListener("load", initSlider); 

const imageContainer = document.querySelector(".image-list")

async function displayCarousel() { 
    const post = await fetchData(url)

    imageContainer.innerHTML = ""; 

    for (let i = 0; i <post.length; i++) { 
        const posts = post[i]; 

        const image = posts._embedded['wp:featuredmedia'][0].source_url; 
        const category = posts._embedded['wp:term'][0][0].name;  
        const title = posts.title.rendered;
        const date = posts.date; 
        const id = posts.id; 
    
        
        
        // carouselImage(image)
        postHolderDiv(image, title, category, id )
        
}}

displayCarousel()


export async function renderCarousel() { 
    const post = await fetchData(url)
    
    carousel.innerHTML = ""; 
    for (let i = 0; i <3; i++) { 
        const posts = post[i]; 

        const image = posts._embedded['wp:featuredmedia'][0].source_url; 
        const category = posts._embedded['wp:term'][0][0].name;  
        const title = posts.title.rendered; 
        const id = posts.id; 

        postHolderDiv(image, title, category, id) 
       
    
    }
}




