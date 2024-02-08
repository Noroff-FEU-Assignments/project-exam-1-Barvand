// this creates the modal div 
export function renderModal(imageSrc, title, parentElement) {
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal"); 
    modalDiv.id = "myModal"; 
    parentElement.appendChild(modalDiv); 

    // onclick function to remove the modal from the screen when pressing the image/ div container
    modalDiv.onclick = function() { 
        modalDiv.remove();
    } 
 
    // this creates the X icon by using a Span
    const close = document.createElement("span"); 
    close.classList.add("close"); 
    close.innerHTML = `&times;`;
    modalDiv.appendChild(close);

    // click function to remove the modal when clicked on the X icon. 
    close.onclick = function() {
        modalDiv.remove();
    }
 
    // the actual image of the modal. 
    const modalImage = document.createElement("img"); 
    modalImage.classList.add("modal-image"); 
    modalImage.src = imageSrc; // Assign the image source
    modalImage.alt = title; 
    modalDiv.appendChild(modalImage); 

     // the alt text of the image shown under the image when modal is opened. 
    const modalAlt = document.createElement("p"); 
    modalAlt.id = "caption"; 
    modalAlt.innerText = title; 
    modalDiv.appendChild(modalAlt); 
    }