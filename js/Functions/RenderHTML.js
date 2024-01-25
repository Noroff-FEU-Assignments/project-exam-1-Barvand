import { fetchData } from "../fetch.js";

const url = "https://www.bartholomeusberg.com/wp-json/wp/v2/posts?_embed";


// This renders the whole index page. //
const imageContainer = document.querySelector(".image-list")

export async function postHolderDiv(image, title, category, id ) { 
    const divElement = document.createElement("div")
    divElement.classList.add("post-holder")
    divElement.style.background = 'url(' + image + ')';
    divElement.style.backgroundSize = 'cover';
    imageContainer.appendChild(divElement)
    
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
    readMoreButton.innerText = `Read more...`

    const categoryButton = document.createElement("a"); 
    categoryButton.classList.add("category-emblem"); 
    categoryButton.href = `blogpage.html?id=${id}`;
    categoryButton.innerText = `${category}`
    
    buttonsDivElement.appendChild(readMoreButton)
    buttonsDivElement.appendChild(categoryButton)
    textElement.appendChild(titleElement); 
    textElement.appendChild(buttonsDivElement)
    divElement.appendChild(textElement);
}


export async function renderCarousel() { 
    const post = await fetchData(url)
    
    imageContainer.innerHTML = ""; 
    for (let i = 0; i <post.length; i++) { 
        const posts = post[i]; 

        const image = posts._embedded['wp:featuredmedia'][0].source_url; 
        const category = posts._embedded['wp:term'][0][0].name;  
        const title = posts.title.rendered; 
        const id = posts.id; 

        postHolderDiv(image, title, category, id) 

        
    }
}


// This renders the whole blog page //

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




        //renders the date and author on the Risk of the day post
        export async function indexPost() { 
            const post = await fetchData(url)
            
            for (let i = 0; i <3; i++) { 
                const posts = post[i];
                
                const dateString = posts.date;
                // Create a Date object from the string
                const dateObject = new Date(dateString);
                
                // Get the day and date components
                const options = { year: 'numeric', month: 'long' , day: 'numeric' };
                const formattedDate = dateObject.toLocaleDateString('en-US', options);
                const author = posts._embedded['author'][0].name;   
        
        const dateChange = document.querySelector(".date")
        dateChange.innerHTML = formattedDate; 
        const authorChange = document.querySelector(".author")
        authorChange.innerHTML = author;
        
        }};