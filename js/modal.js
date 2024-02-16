// this creates the modal div
export function renderModal(imageSrc, title, parentElement) {
  try {
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");
    modalDiv.id = "myModal";
    parentElement.appendChild(modalDiv);
    document.body.style.overflow = "hidden";

    // onclick function to remove the modal from the screen when pressing the image/ div container
    modalDiv.onclick = function () {
      modalDiv.remove();
      document.body.style.overflow = "";
    };

    // this creates the X icon by using a Span
    const close = document.createElement("span");
    close.classList.add("close");
    close.innerHTML = `&times;`;
    modalDiv.appendChild(close);

    // click function to remove the modal when clicked on the X icon.
    close.onclick = function () {
      modalDiv.remove();
      document.body.style.overflow = "";
    };

    // the actual image of the modal.
    const modalImage = document.createElement("img");
    modalImage.classList.add("modal-image");
    modalImage.src = imageSrc; // Assign the image source
    modalImage.alt = title;
    modalDiv.appendChild(modalImage);

    return modalDiv;
  } catch (error) {
    console.error("Error in renderModal:", error);
  }
}
