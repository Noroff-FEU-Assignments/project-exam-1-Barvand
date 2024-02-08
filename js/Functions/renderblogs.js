import { fetchData } from "../fetch.js";
import { getFirstPosts, getLastPosts } from "../utils.js";

const url = `https://www.bartholomeusberg.com/wp-json/wp/v2/posts?acf_format=standard&per_page=20`;



const blogContainer = document.querySelector(".blog-container");
const buttonContainer = document.querySelector(".button-container")

// fetch all the posts
const allPosts = await fetchData(url); 

// copy the array received from allPosts in order to slice the array. 
const currentPosts = [...allPosts]; 


// function that displays the whole blogs page. 
export async function displayBlogsPage() {
    const post = await fetchData(url);
    blogContainer.innerHTML = "";
    
    // display the first array. 
    const firstPosts = getFirstPosts(currentPosts);
    displayPosts(firstPosts);

    // function that loads the rest of the array once the load more btn has been clicked. 
    loadMore();
}

// All data required for the functions to access. With this function you can render the HTML. 
function displayPosts(posts) {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const image = post.acf.post_image;
        const category = post.acf.category;
        const title = post.acf.title;
        const date = post.acf.post_date;
        const id = post.id;
        const alt = post.acf.alt;
        const summary = post.acf.summary; 

        createBlogsPage(image, title, category, date, id, alt, summary);
    }
}


// function to render the html for the blog page with the parameters included. 
export async function createBlogsPage(image, title, category, date, id, alt, summary) { 
    
    const divElement = document.createElement("div"); 
    divElement.classList.add("blog-card")
    blogContainer.appendChild(divElement)
    
    const anchorTag = document.createElement("a"); 
    anchorTag.href = `blogpage.html?id=${id}`; 
    divElement.appendChild(anchorTag)

    const imageElement = document.createElement("img")
    imageElement.src = image; 
    imageElement.alt = alt; 
    anchorTag.appendChild(imageElement)

    const textContainer = document.createElement("div"); 
    textContainer.classList.add("post-text" , "text-blogs"); 
    divElement.appendChild(textContainer)
    
    const titleElement = document.createElement("h2"); 
        titleElement.classList.add("margin"); 
        titleElement.innerText = title; 

        const summaryText = document.createElement("p"); 
        summaryText.classList.add("margin", "summary"); 
        summaryText.textContent = summary; 
    

    const buttonsDivElement = document.createElement("div"); 
        buttonsDivElement.classList.add("carousel-btns"); 
        
        const readMoreButton = document.createElement("a"); 
        readMoreButton.classList.add("readmore-btn"); 
        readMoreButton.href = `blogpage.html?id=${id}`;
        readMoreButton.innerText = `Read more...`
    
        const categoryButton = document.createElement("a"); 
        categoryButton.classList.add("category-emblem"); 
        categoryButton.href = `blogpage.html?id=${id}`;
        categoryButton.innerText = `${category}`
    
        const publishedElement = document.createElement("p"); 
        publishedElement.classList.add("published"); 
        publishedElement.innerText = `Published on `; 

        const dateSpan = document.createElement("span");
        dateSpan.innerText = ` // ${date}`;
        dateSpan.classList.add("date-color")
        publishedElement.appendChild(dateSpan)
    
        textContainer.appendChild(publishedElement)
        textContainer.appendChild(titleElement); 
        textContainer.appendChild(summaryText); 
        textContainer.appendChild(buttonsDivElement); 
        buttonsDivElement.appendChild(readMoreButton)
        buttonsDivElement.appendChild(categoryButton)
        
        return divElement
        }


        function loadMore() {
            const loadMoreButton = document.createElement("a");
            loadMoreButton.id = "load-more-btn";
            loadMoreButton.innerText = "Load More";
            buttonContainer.appendChild(loadMoreButton);
        
            

            setTimeout(() => {
                // Your existing setTimeout code
            }, 1000); // Adjust the delay time in milliseconds (e.g., 1000 ms = 1 second)
        
            // Adding an event listener to the "Load More" button
            // with this event listener we call the 2nd array with the click event.
            loadMoreButton.addEventListener("click", async () => {
                const lastPosts = getLastPosts(currentPosts);
                displayPosts(lastPosts);
        
                // Check if the array.length has been reached, if reached. Remove button.
                if (currentPosts.length === currentPosts.length) {
                    loadMoreButton.remove();
                }
            });
        }
        
      

       

       