
 
 // function that makes a return button. 
        export function returnButton(text, link, parentElement) { 

            const returnButtonDiv = document.createElement("div");
            returnButtonDiv.classList.add("return-btn-container"); 
            parentElement.appendChild(returnButtonDiv)

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