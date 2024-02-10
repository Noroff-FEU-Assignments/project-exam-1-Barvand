import { fetchData } from "../fetch.js";

const url =
  "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard";

// This renders the whole index page. //

const carouselCard = document.querySelector(".card");

export async function renderCarousel() {
  try {
  const posts = await fetchData(url); 
  
  const carouselCards = document.querySelectorAll(".card");

  carouselCards.forEach((carouselCard) => {
    carouselCard.innerHTML = ""; // Clear the HTML content of each .card element

    const index = Array.from(carouselCards).indexOf(carouselCard); // Get the index of the current card
    const postIndex = index % posts.length; // Calculate the index for the post

    const image = posts[postIndex].acf.post_image; // Get the image corresponding to the post
    const title = posts[postIndex].acf.title;
    const id = posts[postIndex].id;
    const category = posts[postIndex].acf.category;
    const alt = posts[postIndex].acf.alt;
    

    const anchor = document.createElement("a");
    anchor.href = `blogpage.html?id=${id}`;
    anchor.classList.add("post-link");
    carouselCard.appendChild(anchor);

    const imageElement = document.createElement("img");
    imageElement.classList.add("carousel-image");
    imageElement.src = image;
    imageElement.alt = alt; 
    anchor.appendChild(imageElement);

   const textElement = document.createElement("div");
    textElement.classList.add("carousel-text");

    const titleElement = document.createElement("h3");
    titleElement.classList.add("margin");
    titleElement.innerText = title;

    const buttonsDivElement = document.createElement("div");
    buttonsDivElement.classList.add("carousel-btns");

    const readMoreButton = document.createElement("a");
    readMoreButton.classList.add("readmore-btn");
    readMoreButton.href = `blogpage.html?id=${id}`;
    readMoreButton.innerText = `Read more...`;

    const categoryButton = document.createElement("a");
    categoryButton.classList.add("category-emblem");
    categoryButton.href = `blogpage.html?id=${id}`;
    categoryButton.innerText = `${category}`;

    buttonsDivElement.appendChild(readMoreButton);
    buttonsDivElement.appendChild(categoryButton);
    textElement.appendChild(titleElement);
    textElement.appendChild(buttonsDivElement);
    carouselCard.appendChild(textElement);
    
    return carouselCard;
  });
}  catch (error) {
    console.error("Error in renderCarousel:", error);
  }
}; 

