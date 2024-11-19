import { fetchData } from "../fetch.js";
import { getFirstPosts, getLastPosts } from "../utils.js";
import { loadMore } from "../eventListeners.js";

const url = "/posts.json";

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
    return post;
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
    return createBlogsPage;
  } catch (error) {
    console.error("Error in displayPosts:", error);
  }
}

// function to render the html for the blog page with the parameters included.
export async function createBlogsPage(post, parentElement) {
  try {
    const anchorElement = document.createElement("a");
    anchorElement.href = `blogpage.html?id=${post.id}`;
    parentElement.appendChild(anchorElement);

    const articleElement = document.createElement("div");
    articleElement.classList.add("blog-card");
    articleElement.style.backgroundImage = `url(${post.acf.post_image})`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("post-text", "card-padding");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("margin");
    titleElement.textContent = post.acf.title;

    const summaryText = document.createElement("p");
    summaryText.classList.add("summary");
    summaryText.textContent = post.acf.summary;

    const readMoreButton = document.createElement("a");
    readMoreButton.classList.add("readmore-btn");
    readMoreButton.href = `blogpage.html?id=${post.id}`;
    readMoreButton.textContent = `read more...`;

    const buttonsDivElement = document.createElement("div");
    buttonsDivElement.classList.add("blog-card-tag");

    const categoryButton = document.createElement("a");
    categoryButton.classList.add("category-emblem");
    categoryButton.href = `blogpage.html?id=${post.id}`;
    categoryButton.textContent = post.acf.category;

    const publishedElement = document.createElement("p");
    publishedElement.classList.add("published");
    publishedElement.textContent = `Published on `;

    const dateSpan = document.createElement("span");
    dateSpan.textContent = ` // ${post.acf.post_date}`;
    dateSpan.classList.add("date-color");

    anchorElement.appendChild(articleElement);
    articleElement.appendChild(buttonsDivElement);
    buttonsDivElement.appendChild(categoryButton);
    articleElement.appendChild(textContainer);
    publishedElement.appendChild(dateSpan);
    textContainer.appendChild(publishedElement);
    textContainer.appendChild(titleElement);
    textContainer.appendChild(summaryText);
    summaryText.appendChild(readMoreButton);

    return anchorElement;
  } catch (error) {
    console.error("Error in createBlogsPage:", error);
  }
}
