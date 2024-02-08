import { fetchData } from "../fetch.js";

const url =
  "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard";

// This renders the whole index page. //
const imageContainer = document.querySelector(".image-list");

export async function carouselContent(image, title, category, id) {
  try {
    const anchor = document.createElement("a");
    anchor.href = `blogpage.html?id=${id}`;
    anchor.classList.add("post-link");
    imageContainer.appendChild(anchor);

    const divElement = document.createElement("div");
    divElement.classList.add("post-holder");
    divElement.style.background = "url(" + image + ")";
    divElement.style.backgroundSize = "cover";
    anchor.appendChild(divElement);

    const textElement = document.createElement("div");
    textElement.classList.add("post-text");

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
    divElement.appendChild(textElement);

    return divElement;
  } catch (error) {
    console.error("Error in carouselContent:", error);
  }
}

const carousel = document.querySelector(".carousel-latest-posts");

export async function renderCarousel() {
  try {
    const post = await fetchData(url);

    imageContainer.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const posts = post[i];

      const image = posts.acf.post_image;
      const category = posts.acf.category;
      const title = posts.title.rendered;
      const id = posts.id;

      carouselContent(image, title, category, id);
    }
  } catch (error) {
    console.error("Error in renderCarousel:", error);
  }
}
