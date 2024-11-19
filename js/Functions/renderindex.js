import { fetchData } from "../fetch.js";
import { createBlogsPage } from "./renderblogs.js";

const url = "/posts.json";

// This renders the whole index page. //

const carouselCard = document.querySelector(".card");

export async function renderCarousel() {
  try {
    const posts = await fetchData(url);

    const carouselCards = document.querySelectorAll(".carousel-card");

    carouselCards.forEach((carouselCard) => {
      carouselCard.innerHTML = "";

      const index = Array.from(carouselCards).indexOf(carouselCard); // Get the index of the current card
      const postIndex = index % posts.length; // Calculate the index for the post

      const post = posts[postIndex];

      createBlogsPage(post, carouselCard);

      return carouselCard;
    });
  } catch (error) {
    console.error("Error in renderCarousel:", error);
  }
}
