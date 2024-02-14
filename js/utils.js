import { fetchData } from "./fetch.js";
import { createBlogsPage } from "./Functions/renderblogs.js";

const url =
  "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard&per_page=20";
// function that makes a return button.
export function returnButton(text, link, parentElement) {
  const returnButtonDiv = document.createElement("div");
  returnButtonDiv.classList.add("return-btn-container");
  parentElement.appendChild(returnButtonDiv);

  const returnButton = document.createElement("a");
  returnButton.classList.add("return-btn");
  returnButton.textContent = text;
  returnButton.href = link;
  returnButtonDiv.appendChild(returnButton);

  return returnButtonDiv;
}

// Function to get the first set of posts, you can update the amount of posts want to be display with the slice function.
export function getFirstPosts(array) {
  return array.slice(0, 9);
}

// Function to get the second set of posts, you can update the amount of posts want to be display with the slice function.
export function getLastPosts(array) {
  return array.slice(9);
}

// This is the function that creates the search Bar and function.
export async function searchBar() {
  try {
    const allPosts = await fetchData(url);

    const searchInput = document.getElementById("search");
    const searchResultsContainer = document.querySelector(".blog-container");
    const loadButton = document.querySelector(".button-container");

    function performSearch(query) {
      searchResultsContainer.innerHTML = "";

      // Using firstPosts instead of allPosts in order to not load the whole array once the search bar has been emptied after searching.
      const firstPosts = getFirstPosts(allPosts);

      // If query is an empty string
      if (query === "") {
        firstPosts.forEach((post) => {
          createBlogsPage(post, searchResultsContainer);
        });
        loadButton.style.display = "block"; // Show load more button
        return;
      }

      // Filter posts based on the query
      const filteredPosts = allPosts.filter((post) => {
        return (
          query === "" ||
          post.acf.title.toLowerCase().includes(query.toLowerCase()) ||
          post.acf.summary.toLowerCase().includes(query.toLowerCase())
        );
      });

      const displayedPosts = filteredPosts;

      // Render search results
      displayedPosts.forEach((post) => {
        createBlogsPage(post, searchResultsContainer);
      });
      loadButton.style.display = "none"; // Hide load more button when searching
    }

    // Event listener for input field value changes
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim();
      performSearch(query);
    });

    // Initial rendering of all posts
    performSearch(""); // Perform an initial search with an empty query
  } catch (error) {
    console.error("Error in categoryInvestment:", error);
  }
}

// This function displays all the categories and fetches the array.
const informationButton = document.getElementById("information");
const newsButton = document.getElementById("news");
const investmentButton = document.getElementById("investment");
const technicalButton = document.getElementById("technical");
const allPostsButton = document.getElementById("all-posts");
const loadButton = document.querySelector(".button-container");

// Needed to fetch to prevent fetching within all the functions and so I could use a copy in order to speed up the loading time.
const allPosts = await fetchData(url);

// pushes all posts with the category INFORMATION and renders it
async function categoryInformation() {
  try {
    const searchResultsContainer = document.querySelector(".blog-container");

    const posts = [...allPosts];
    let informationPosts = [];

    searchResultsContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const category = posts[i].acf.category;

      if (category === "Information") {
        informationPosts.push(posts[i]);
        createBlogsPage(posts[i], searchResultsContainer);
        loadButton.style.display = "none"; // Hide load more button when searching
      }
    }
    return informationPosts;
  } catch (error) {
    console.error("Error in categoryInvestment:", error);
  }
}

// pushes all posts with the category NEWS and renders it
async function categoryNews() {
  try {
    const searchResultsContainer = document.querySelector(".blog-container");

    const posts = [...allPosts];
    let newsPosts = [];

    searchResultsContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const category = posts[i].acf.category;

      if (category === "News") {
        newsPosts.push(posts[i]);
        createBlogsPage(posts[i], searchResultsContainer);
        loadButton.style.display = "none"; // Hide load more button when searching
      }
    }
    return newsPosts;
  } catch (error) {
    console.error("Error in categoryInvestment:", error);
  }
}

// pushes all posts with the category INVESTMENT and renders it.
async function categoryInvestment() {
  try {
    const searchResultsContainer = document.querySelector(".blog-container");

    const posts = [...allPosts];
    let investmentPosts = [];

    searchResultsContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const category = posts[i].acf.category;

      if (category === "Investment") {
        investmentPosts.push(posts[i]);
        createBlogsPage(posts[i], searchResultsContainer);
        loadButton.style.display = "none"; // Hide load more button when searching
      }
    }
    return investmentPosts;
  } catch (error) {
    console.error("Error in categoryInvestment:", error);
  }
}

// pushes all posts with the category TECHNICAL and renders it.
async function categoryTechnical() {
  try {
    const searchResultsContainer = document.querySelector(".blog-container");

    const posts = [...allPosts];
    let technicalPosts = [];

    searchResultsContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const category = posts[i].acf.category;

      if (category === "Technical") {
        technicalPosts.push(posts[i]);
        createBlogsPage(posts[i], searchResultsContainer);
        loadButton.style.display = "none"; // Hide load more button when searching
      }
    }
    return technicalPosts;
  } catch (error) {
    console.error("Error in categoryTechnical:", error);
  }
}

// Here I use the function getFirstPosts in order to slice the array to have the original blogs page with the load more button.
async function returnToAllPosts() {
  try {
    const searchResultsContainer = document.querySelector(".blog-container");

    const posts = [...allPosts];
    const firstPosts = getFirstPosts(allPosts);

    let fullPosts = [];

    searchResultsContainer.innerHTML = "";

    for (let i = 0; i < firstPosts.length; i++) {
      const category = posts[i].acf.category;

      if ((category === "Information", "News", "Investment", "Technical")) {
        fullPosts.push(posts[i]);
        createBlogsPage(posts[i], searchResultsContainer);
        loadButton.style.display = "block"; // show btn
      }
    }
    return fullPosts;
  } catch (error) {
    console.error("Error in returnToAllPosts:", error);
  }
}

const allButtons = document.querySelectorAll(".category-emblem");

allButtons.forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.toggle("active");
  });
});

// Bundled all functions to one functions and exported it to Index page.
export function createCategories() {
  try {
    informationButton.addEventListener("click", categoryInformation);
    newsButton.addEventListener("click", categoryNews);
    investmentButton.addEventListener("click", categoryInvestment);
    technicalButton.addEventListener("click", categoryTechnical);
    allPostsButton.addEventListener("click", returnToAllPosts);

    categoryNews();
    categoryTechnical();
    categoryInvestment();
    categoryInformation();
    returnToAllPosts();
  } catch (error) {
    console.error("Error in createCategories:", error);
  }
}
