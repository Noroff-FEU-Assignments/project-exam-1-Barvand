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
      const image = post.acf.post_image;
      const category = post.acf.category;
      const title = post.acf.title;
      const date = post.acf.post_date;
      const id = post.id;
      const summary = post.acf.summary;

      createBlogsPage(image, title, category, date, id, summary, blogContainer);
    }
  } catch (error) {
    console.error("Error in displayPosts:", error);
  }
}

// function to render the html for the blog page with the parameters included.
export async function createBlogsPage(
  image,
  title,
  category,
  date,
  id,
  summary,
  parentElement
) {
  try {
    const divElement = document.createElement("a");
    divElement.classList.add("blog-card");
    divElement.style.backgroundImage = `url(${image})`;
    divElement.href = `blogpage.html?id=${id}`;
    

    const textContainer = document.createElement("div");
    textContainer.classList.add("post-text");
    

    const titleElement = document.createElement("h2");
    titleElement.classList.add("margin");
    titleElement.innerText = title;

    const summaryText = document.createElement("p");
    summaryText.classList.add("summary");
    summaryText.textContent = summary;

    const readMoreButton = document.createElement("a");
    readMoreButton.classList.add("readmore-btn");
    readMoreButton.href = `blogpage.html?id=${id}`;
    readMoreButton.innerText = `read more...`;


    const buttonsDivElement = document.createElement("div");
    buttonsDivElement.classList.add("carousel-btns");
    
    const categoryButton = document.createElement("a");
    categoryButton.classList.add("category-emblem");
    categoryButton.href = `blogpage.html?id=${id}`;
    categoryButton.innerText = `${category}`;

    const publishedElement = document.createElement("p");
    publishedElement.classList.add("published");
    publishedElement.innerText = `Published on `;

    const dateSpan = document.createElement("span");
    dateSpan.innerText = ` // ${date}`;
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




async function searchBar() {
  const allPosts = await fetchData(url);
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("search-button");
  const searchResultsContainer = document.querySelector(".blog-container");

  function performSearch(query) {
    // Clear previous search results
    searchResultsContainer.innerHTML = "";

    // Filter posts based on the query
    const filteredPosts = allPosts.filter((post) => {
      return (
        post.acf.title.toLowerCase().includes(query.toLowerCase()) ||
        post.acf.summary.toLowerCase().includes(query.toLowerCase())
      );
    });

    // Render search results
   filteredPosts.forEach(post => {
    createBlogsPage(
        post.acf.post_image, // Access image property of the post object
        post.acf.title, // Access title property of the post object
        post.acf.category, // Access category property of the post object
        post.acf.date, // Access date property of the post object
        post.id, // Access id property of the post object
        post.acf.summary, // Access summary property of the post object
        searchResultsContainer // Pass searchResultsContainer as argument
    );
});
  }

  // Event listener for search button click
  searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query !== "") {
      performSearch(query);
    }
  });

  // Event listener for Enter key press in the input field
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query !== "") {
        performSearch(query);
      }
    }
  });
}

searchBar();