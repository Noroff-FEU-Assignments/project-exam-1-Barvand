import { fetchData } from "./fetch.js"
import { postHolderDiv } from "./Functions/RenderHTML.js"
import { createBlogsPage } from "./Functions/RenderHTML.js"

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?_embed";
const carousel = document.querySelector(".carousel-latest-posts")
const textParent = document.querySelector(".post-holder")


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

    async function router() {
        try {
          const post = await fetchData(url);
          const urls = window.location.href;
      
          if (!urls.includes("blogs")) {
            renderCarousel();
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

const urlId = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?_embed/" + id; 


async function renderBlogPage() {
    const post = await fetchData(urlId);
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
            
        
            identicalTitle(title);
            publishedDate(formattedDate); 
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

async function publishedDate(date) { 
    const publishedElement = document.createElement("p"); 
        publishedElement.classList.add("publishedBlog"); 
        publishedElement.innerText = `Published on `; 
        blogPage.appendChild(publishedElement)

    const dateSpan = document.createElement("span");
        dateSpan.innerText = ` // ${date}`;
        dateSpan.classList.add("date-color")
        publishedElement.appendChild(dateSpan)
} 

async function displayBlogContent(content) { 
    const blogContent = document.createElement("div"); 
    blogContent.classList.add("blogContent"); 
    blogContent.innerHTML = content;
    blogPage.appendChild(blogContent)
}



renderBlogPage()