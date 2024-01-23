import { fetchData, fetchCategory, fetchFeaturedMedia } from "./fetch.js";
import { createPostHolder, createPostText, createCarouselBtns, createReadMoreBtn, createCategoryEmblem, createBlogCard } from "./Functions/RenderHTML.js";

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts";




export async function renderLatestPosts() {
    try {
        const result = await fetchData(url);
        const carousel = document.querySelector(".carousel-latest-posts");
        carousel.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            const post = result[i];
            const featuredMediaLink = post._links["wp:featuredmedia"][0].href;
            const termLink = post._links["wp:term"][0].href; 

            const category = await fetchCategory(termLink);
            const mediaData = await fetchFeaturedMedia(featuredMediaLink);
            const imageUrl = mediaData.source_url;

            const elementPostHolder = createPostHolder(imageUrl);
            carousel.appendChild(elementPostHolder);

            const elementPostText = createPostText(post.title.rendered);
            elementPostHolder.appendChild(elementPostText);

            const carouselBtnElement = createCarouselBtns();
            elementPostText.appendChild(carouselBtnElement);

            const anchorBtn = createReadMoreBtn();
            carouselBtnElement.appendChild(anchorBtn);

            const anchorBtnCategory = createCategoryEmblem(category);
            carouselBtnElement.appendChild(anchorBtnCategory);
        }
    } catch (error) {
        console.error("Error in renderLatestPosts:", error);
        const flexWrapper = document.querySelector(".flex-wrapper");
        flexWrapper.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
    }
}


export async function renderBlogs() {
    try {
        const result = await fetchData(url);
        const blogContainer = document.querySelector(".blog-container");
        blogContainer.innerHTML = "";

        for (let i = 0; i < result.length; i++) {
            const post = result[i];

            const featuredMediaLink = post._links["wp:featuredmedia"][0].href;
            const termLink = post._links["wp:term"][0].href; 

            const category = await fetchCategory(termLink);
            const mediaData = await fetchFeaturedMedia(featuredMediaLink);
            const imageUrl = mediaData.source_url;

            const elementBlogCard =  createBlogCard(imageUrl);
            blogContainer.appendChild(elementBlogCard);

            const elementPostText = createPostText(post.title.rendered);
            elementBlogCard.appendChild(elementPostText);

            const carouselBtnElement = createCarouselBtns();
            elementPostText.appendChild(carouselBtnElement);

            const anchorBtn = createReadMoreBtn();
            carouselBtnElement.appendChild(anchorBtn);

            const anchorBtnCategory = createCategoryEmblem(category);
            carouselBtnElement.appendChild(anchorBtnCategory);
        }
    } catch (error) {
        console.error("Error in renderLatestPosts:", error);
        const flexWrapper = document.querySelector(".flex-wrapper");
        flexWrapper.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
    }
}

// Call the function to fetch and render latest posts


async function router() { 
    const url = window.location.href; 

    if (!url.includes("blogs")) {
        renderLatestPosts();
    } else {
        renderBlogs();
    }
}

router();


// async function renderLatestPosts() {
//     try {
//         const result = await fetchData(url);

//         carousel.innerHTML = "";

//         for (let i = 0; i < 3; i++) {
//             const post = result[i];
//             const elementPostHolder = createPostHolder(post);
//             carousel.appendChild(elementPostHolder);

//             const category = await fetchCategory(post._links["wp:term"][0].href);
            
//             const imageUrl = await fetchImageUrl(post._links["wp:featuredmedia"][0].href);

//             setBackgroundImage(elementPostHolder, imageUrl);

//             const elementPostText = createPostText(post);
//             elementPostHolder.appendChild(elementPostText);

//             createReadMoreButton(elementPostText, "product.html");
//             createCategoryEmblem(elementPostText, category, "index.html");
//         }
//     } catch (error) {
//         handleRenderError(error);
//     }
// }

// renderLatestPosts()

// async function fetchData(url) {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return await response.json();
// }

// async function fetchCategory(termLink) {
//     const termResponse = await fetch(termLink);
//     const termData = await termResponse.json();
//     return termData[0].name;
// }

// async function fetchImageUrl(featuredMediaLink) {
//     const mediaResponse = await fetch(featuredMediaLink);
//     const mediaData = await mediaResponse.json();
//     return mediaData.source_url;
// }

// function setBackgroundImage(element, imageUrl) {
//     element.style.backgroundImage = `url(${imageUrl})`;
// }

// function createPostHolder(post) {
//     const elementPostHolder = document.createElement("div");
//     elementPostHolder.classList.add("post-holder");
//     return elementPostHolder;
// }

// function createPostText(post) {
//     const elementPostText = document.createElement("div");
//     elementPostText.classList.add("post-text");

//     const h3Post = document.createElement("h3");
//     h3Post.classList.add("margin");
//     h3Post.innerText = `${post.title.rendered}`;
//     elementPostText.appendChild(h3Post);

//     const carouselBtnElement = document.createElement("div");
//     carouselBtnElement.classList.add("carousel-btns");
//     elementPostText.appendChild(carouselBtnElement);

//     return elementPostText;
// }

// function createReadMoreButton(parentElement, href) {
//     const anchorBtn = document.createElement("a");
//     anchorBtn.classList.add("readmore-btn");
//     anchorBtn.innerText = "Read more...";
//     anchorBtn.href = href;
//     parentElement.appendChild(anchorBtn);
// }

// function createCategoryEmblem(parentElement, category, href) {
//     const anchorBtnCategory = document.createElement("a");
//     anchorBtnCategory.classList.add("category-emblem");
//     anchorBtnCategory.innerText = category;
//     anchorBtnCategory.href = href;
//     parentElement.appendChild(anchorBtnCategory);
// }

// function handleRenderError(error) {
//     console.error("Error in renderLatestPosts:", error);
//     flexWrapper.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
// }


