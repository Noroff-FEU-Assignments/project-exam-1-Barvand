import { fetchData } from "../fetch.js";
import { getFirstPosts, getLastPosts } from "../utils.js";
import { loadMore } from "../eventListeners.js";

const url = `https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard&per_page=20`;

const blogContainer = document.querySelector(".blog-container");
const buttonContainer = document.querySelector(".button-container");

// function that displays the whole blogs page.
export async function displayBlogsPage() {
  try {
    const post = await fetchData(url);
    blogContainer.innerHTML = "";

    // Fetch all the posts
    const allPosts = await fetchData(url);

    // Copy the array received from allPosts in order to slice the array.
    const currentPosts = [...allPosts];

    // Display the first array
    const firstPosts = getFirstPosts(currentPosts);
    displayPosts(firstPosts);

    // Get the last posts for loadMore function
    const lastPosts = getLastPosts(currentPosts);

    // Call loadMore function with the appropriate parameters
    loadMore(
      lastPosts,
      getLastPosts,
      currentPosts,
      displayPosts,
      buttonContainer
    );
  } catch (error) {
    console.error("Error in displayBlogsPage:", error);
  }
}

// All data required for the functions to access. With this function you can render the HTML.
function displayPosts(posts) {
  try {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      createBlogsPage(post, blogContainer);
    }
  } catch (error) {
    console.error("Error in displayPosts:", error);
  }
}

// function to render the html for the blog page with the parameters included.
export async function createBlogsPage(post, parentElement) {
  try {
    const divElement = document.createElement("a");
    divElement.classList.add("blog-card");
    divElement.style.backgroundImage = `url(${post.acf.post_image})`;
    divElement.href = `blogpage.html?id=${post.id}`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("post-text");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("margin");
    titleElement.innerText = post.acf.title;

    const summaryText = document.createElement("p");
    summaryText.classList.add("summary");
    summaryText.textContent = post.acf.summary;

    const readMoreButton = document.createElement("a");
    readMoreButton.classList.add("readmore-btn");
    readMoreButton.href = `blogpage.html?id=${post.id}`;
    readMoreButton.innerText = `read more...`;

    const buttonsDivElement = document.createElement("div");
    buttonsDivElement.classList.add("carousel-btns");

    const categoryButton = document.createElement("a");
    categoryButton.classList.add("category-emblem");
    categoryButton.href = `blogpage.html?id=${post.id}`;
    categoryButton.innerText = `${post.acf.category}`;

    const publishedElement = document.createElement("p");
    publishedElement.classList.add("published");
    publishedElement.innerText = `Published on `;

    const dateSpan = document.createElement("span");
    dateSpan.innerText = ` // ${post.acf.post_date}`;
    dateSpan.classList.add("date-color");

    parentElement.appendChild(divElement);
    divElement.appendChild(buttonsDivElement);
    buttonsDivElement.appendChild(categoryButton);
    divElement.appendChild(textContainer);
    publishedElement.appendChild(dateSpan);
    textContainer.appendChild(publishedElement);
    textContainer.appendChild(titleElement);
    textContainer.appendChild(summaryText);
    summaryText.appendChild(readMoreButton);

    return divElement;
  } catch (error) {
    console.error("Error in createBlogsPage:", error);
  }
}
