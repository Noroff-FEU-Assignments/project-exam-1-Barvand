export async function fetchCategory(termLink) {
    const termResponse = await fetch(termLink); 
    const termData = await termResponse.json(); 
    return termData[0].name;
}

export async function fetchFeaturedMedia(featuredMediaLink) {
    const mediaResponse = await fetch(featuredMediaLink);
    return await mediaResponse.json();
}

export function createPostHolder(imageUrl) {
    const elementPostHolder = document.createElement("div");
    elementPostHolder.classList.add("post-holder");
    elementPostHolder.style.backgroundImage = `url(${imageUrl})`;
    return elementPostHolder;
}

export function createPostText(title) {
    const elementPostText = document.createElement("div");
    elementPostText.classList.add("post-text");

    const h3Post = document.createElement("h3");
    h3Post.classList.add("margin");
    h3Post.innerText = `${title}`;
    elementPostText.appendChild(h3Post);

    return elementPostText;
}

export function createCarouselBtns() {
    const carouselBtnElement = document.createElement("div");
    carouselBtnElement.classList.add("carousel-btns");
    return carouselBtnElement;
}

export function createReadMoreBtn() {
    const anchorBtn = document.createElement("a"); 
    anchorBtn.classList.add("readmore-btn"); 
    anchorBtn.innerText = `Read more...`; 
    anchorBtn.href = "index.html";
    return anchorBtn;
}

export function createCategoryEmblem(category) {
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






export function createBlogText(title) {
    const elementBlogText = document.createElement("div");
    elementBlogText.classList.add("blog-card-text");
    const h3Post = document.createElement("h3");
    h3Post.classList.add("margin");
    h3Post.innerText = `${title}`;
    elementBlogText.appendChild(h3Post);

    return elementBlogText;
}

export function createBtns() {
    const btnsElement = document.createElement("div");
    btnsElement.classList.add("carousel-btns");
    return btnsElement;
}


export function createBlogCard(imageUrl) {
    const elementBlogCard = document.createElement("div");
    elementBlogCard.classList.add("blog-card");
    elementBlogCard.style.backgroundImage = `url(${imageUrl})`;
    return elementBlogCard;
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

            const elementBlogText = createBlogText(post.title.rendered);
            elementBlogCard.appendChild(elementBlogText);

            const btnsElement = createCarouselBtns();
            elementBlogText.appendChild(btnsElement);

            const anchorBtn = createReadMoreBtn();
            btnsElement.appendChild(anchorBtn);

            const anchorBtnCategory = createCategoryEmblem(category);
            btnsElement.appendChild(anchorBtnCategory);
        }
    } catch (error) {
        console.error("Error in renderLatestPosts:", error);
        const flexWrapper = document.querySelector(".flex-wrapper");
        flexWrapper.innerHTML = `<div class="error-message"> Oops!! Something went wrong and it is our fault </div>`;
    }
}