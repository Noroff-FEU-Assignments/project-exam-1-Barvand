
import { fetchData } from "../fetch.js";
import { returnButton } from "../utils.js";
import { renderModal } from "../modal.js";

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard";

const blogPageFlexContainer = document.querySelector(".flex-wrapper-blogpage")
const blogPage = document.querySelector(".blogpage"); 
const queryString = document.location.search;
const params = new URLSearchParams(queryString) 
const id = params.get("id"); 

export async function renderBlogPage() {
    const post = await fetchData(url);
    blogPage.innerHTML = "";

    const queryStringId = id.toString();

    for (let i = 0; i < post.length; i++) {
        const posts = post[i];
        const postId = posts.id.toString();

    
        if (postId === queryStringId) {
            const title = posts.acf.title;
            const date = posts.acf.post_date; 
            const author = posts.acf.author; 
            const image = posts.acf.post_image;   

            identicalTitle(title);
            createContainerPublisher(date, author)
            displayBlogContent(posts); 
            returnButton("Return to blogs", "blogs.html", blogPageFlexContainer)
        }
    }
}; 
    

// this renders the title 
async function identicalTitle(title) {
    const blogTitle = document.createElement("h1"); 
    blogTitle.classList.add("blog-title")
    blogTitle.innerText = title; 
    blogPage.appendChild(blogTitle);
}


// This renders the date and the author
async function createContainerPublisher(date, author) { 
    const publishContainer = document.createElement("div"); 
    publishContainer.classList.add("publish-container")
    blogPage.appendChild(publishContainer);
    
    const publishedDate = document.createElement("p"); 
    publishedDate.classList.add("publishedBlog"); 
    publishedDate.innerText = `Published on `; 
    publishContainer.appendChild(publishedDate)

    const dateSpan = document.createElement("span");
    dateSpan.textContent = `${date}`;
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


// This renders the actual html blog content + onclick modal function 
async function displayBlogContent(posts) { 

    const subHeader = document.createElement("h2"); 
    subHeader.classList.add("blog-header"); 
    subHeader.textContent = posts.acf.subheader; 
    blogPage.appendChild(subHeader)

    const imageElement = document.createElement("img"); 
    imageElement.classList.add("blog-post-img"); 
    imageElement.src = posts.acf.post_image;
    imageElement.alt = posts.acf.alt; 
    blogPage.appendChild(imageElement)

    // onclick function that renders the modal once clicked on the image. 
    imageElement.onclick = function() {
        renderModal(imageElement.src, imageElement.alt, blogPage);
    }

    const heading1 = document.createElement("h3"); 
    heading1.classList.add("blog-header-h3"); 
    heading1.textContent = posts.acf.heading1; 
    blogPage.appendChild(heading1)

    const paragraph1 = document.createElement("p"); 
    paragraph1.classList.add("blog-paragraph"); 
    paragraph1.textContent = posts.acf.paragraph1; 
    blogPage.appendChild(paragraph1)

    const heading2 = document.createElement("h3"); 
    heading2.classList.add("blog-header-h3"); 
    heading2.textContent = posts.acf.heading2; 
    blogPage.appendChild(heading2)
    
    const paragraph2 = document.createElement("p"); 
    paragraph2.classList.add("blog-paragraph"); 
    paragraph2.textContent = posts.acf.paragraph2; 
    blogPage.appendChild(paragraph2)

    const heading3 = document.createElement("h3"); 
    heading3.classList.add("blog-header-h3"); 
    heading3.textContent = posts.acf.heading3; 
    blogPage.appendChild(heading3)

    const paragraph3 = document.createElement("p"); 
    paragraph3.classList.add("blog-paragraph"); 
    paragraph3.textContent = posts.acf.paragraph3; 
    blogPage.appendChild(paragraph3)

    const heading4 = document.createElement("h3"); 
    heading4.classList.add("blog-header-h3"); 
    heading4.textContent = posts.acf.heading4; 
    blogPage.appendChild(heading4)

    const paragraph4 = document.createElement("p"); 
    paragraph4.classList.add("blog-paragraph"); 
    paragraph4.textContent = posts.acf.paragraph4; 
    blogPage.appendChild(paragraph4)

    const heading5 = document.createElement("h3"); 
    heading5.classList.add("blog-header-h3"); 
    heading5.textContent = posts.acf.heading5; 
    blogPage.appendChild(heading5)

    const paragraph5 = document.createElement("p"); 
    paragraph5.classList.add("blog-paragraph"); 
    paragraph5.textContent = posts.acf.paragraph5; 
    blogPage.appendChild(paragraph5)
}






