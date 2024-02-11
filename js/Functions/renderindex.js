import { fetchData } from "../fetch.js";
import { createBlogsPage } from "./renderblogs.js";

const url =
  "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard";

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

    const image = posts[postIndex].acf.post_image;
    const title = posts[postIndex].acf.title;
    const id = posts[postIndex].id;
    const category = posts[postIndex].acf.category;
    const summary = posts[postIndex].acf.summary;
    const date = posts[postIndex].acf.post_date;

    
 createBlogsPage(image, title, category, date, id, summary, carouselCard);
  
    return carouselCard;
  });
}  catch (error) {
    console.error("Error in renderCarousel:", error);
  }
}; 

