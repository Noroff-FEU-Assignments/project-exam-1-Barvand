
import { fetchData } from "../fetch.js";

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard";

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

    
        if (postId === queryStringId) {
            const title = posts.acf.title;
            const date = posts.acf.post_date; 
            const author = posts.acf.author; 
            const image = posts.acf.post_image;   

            console.log()

    
            identicalTitle(title);
            createContainerPublisher(date, author)
            displayBlogContent(posts); 
        


            
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


async function displayBlogContent(posts) { 

    const subHeader = document.createElement("h2"); 
    subHeader.classList.add("blog-header"); 
    subHeader.textContent = posts.acf.subheader; 
    blogPage.appendChild(subHeader)

    const image = document.createElement("img"); 
    image.classList.add("blog-post-img"); 
    image.src = posts.acf.post_image;
    image.alt = posts.acf.title; 
    image.onclick = function() {
        renderModal(image.src, image.alt);
    }

    blogPage.appendChild(image)

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



// this creates the modal div 
function renderModal(imageSrc, title) {
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal"); 
    modalDiv.id = "myModal"; 
    blogPage.appendChild(modalDiv); 

    // onclick function to remove the modal from the screen when pressing the image/ div container
    modalDiv.onclick = function() { 
        modalDiv.remove();
    } 
 
    // this creates the X icon by using a Span
    const close = document.createElement("span"); 
    close.classList.add("close"); 
    close.innerHTML = `&times;`;
    modalDiv.appendChild(close);

    // click function to remove the modal when clicked on the X icon. 
    close.onclick = function() {
        modalDiv.remove();
    }
 
    // the actual image of the modal. 
    const modalImage = document.createElement("img"); 
    modalImage.classList.add("modal-image"); 
    modalImage.src = imageSrc; // Assign the image source
    modalImage.alt = title; 
    modalDiv.appendChild(modalImage); 

     // the alt text of the image shown under the image when modal is opened. 
    const modalAlt = document.createElement("p"); 
    modalAlt.id = "caption"; 
    modalAlt.innerText = title; 
    modalDiv.appendChild(modalAlt); 
    }



