
const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts";

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

async function fetchCategory(termLink) {
    const termResponse = await fetch(termLink); 
    const termData = await termResponse.json(); 
    return termData[0].name;
}

async function fetchFeaturedMedia(featuredMediaLink) {
    const mediaResponse = await fetch(featuredMediaLink);
    return await mediaResponse.json();
}

function createPostHolder(imageUrl) {
    const elementPostHolder = document.createElement("div");
    elementPostHolder.classList.add("post-holder");
    elementPostHolder.style.backgroundImage = `url(${imageUrl})`;
    return elementPostHolder;
}

function createPostText(title) {
    const elementPostText = document.createElement("div");
    elementPostText.classList.add("post-text");

    const h3Post = document.createElement("h3");
    h3Post.classList.add("margin");
    h3Post.innerText = `${title}`;
    elementPostText.appendChild(h3Post);

    return elementPostText;
}

function createCarouselBtns() {
    const carouselBtnElement = document.createElement("div");
    carouselBtnElement.classList.add("carousel-btns");
    return carouselBtnElement;
}

function createReadMoreBtn() {
    const anchorBtn = document.createElement("a"); 
    anchorBtn.classList.add("readmore-btn"); 
    anchorBtn.innerText = `Read more...`; 
    anchorBtn.href = "index.html";
    return anchorBtn;
}

function createCategoryEmblem(category) {
    const anchorBtnCategory = document.createElement("a"); 
    anchorBtnCategory.classList.add("category-emblem"); 
    anchorBtnCategory.innerText = `${category}`; 
    anchorBtnCategory.href = "index.html";
    return anchorBtnCategory;
}

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
