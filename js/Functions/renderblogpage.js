
import { fetchData } from "../fetch.js";

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?_embed";

const blogPage = document.querySelector(".blogpage"); 
const queryString = document.location.search;
const params = new URLSearchParams(queryString) 
const id = params.get("id"); 

const publishDateParent = document.querySelector(".blog-title");

export async function renderBlogPage() {
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
