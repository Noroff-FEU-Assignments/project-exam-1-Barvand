import { fetchData } from "../fetch.js";

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?_embed";

const blogContainer = document.querySelector(".blog-container") 

export async function createBlogsPage(image, title, category, date, id) { 
    

    const divElement = document.createElement("div"); 
    divElement.classList.add("blog-card")
    blogContainer.appendChild(divElement)
    
    const anchorTag = document.createElement("a"); 
    anchorTag.href = `blogpage.html?id=${id}`; 
    divElement.appendChild(anchorTag)

    const imageElement = document.createElement("img")
    imageElement.src = `${image}`; 
    imageElement.alt = `${title}`; 
    anchorTag.appendChild(imageElement)

   
    
    const titleElement = document.createElement("h2"); 
        titleElement.classList.add("margin"); 
        titleElement.innerText = title; 


    
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
    
        divElement.appendChild(publishedElement)
        divElement.appendChild(titleElement); 
        divElement.appendChild(buttonsDivElement); 
        buttonsDivElement.appendChild(readMoreButton)
        buttonsDivElement.appendChild(categoryButton)
        
        
        }

 
export async function displayBlogsPage () {
    const post = await fetchData(url)
    blogContainer.innerHTML = "";

    for (let i = 0; i <post.length; i++) { 
        const posts = post[i]; 

        const image = posts._embedded['wp:featuredmedia'][0].source_url; 
        const category = posts._embedded['wp:term'][0][0].name;  
        const title = posts.title.rendered;
        const date = posts.date; 
        const id = posts.id; 

        console.log(id)


        const dateString = posts.date;
        // Create a Date object from the string
        const dateObject = new Date(dateString);
        
        // Get the day and date components
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        
        createBlogsPage(image, title, category, formattedDate, id)
        
    }
}


