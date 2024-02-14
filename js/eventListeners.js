// load more of the array after clicking the load more btn has been clicked.
export function loadMore(
  array,
  getLastPosts,
  currentPosts,
  displayPosts,
  parentElement
) {
  try {
    const loadMoreButton = document.createElement("a");
    loadMoreButton.id = "load-more-btn";
    loadMoreButton.innerText = "Load More";
    parentElement.appendChild(loadMoreButton);

    setTimeout(() => {
      // Your existing setTimeout code
    }, 1000); // Adjust the delay time in milliseconds (e.g., 1000 ms = 1 second)

    // Adding an event listener to the "Load More" button
    // with this event listener we call the 2nd array with the click event.
    parentElement.addEventListener("click", async () => {
      const lastPosts = getLastPosts(currentPosts);
      displayPosts(lastPosts);

      // Check if the array.length has been reached, if reached. Remove button.
      if (array.length === array.length) {
        loadMoreButton.remove();
      }
      return loadMoreButton;
    });
  } catch (error) {
    console.error("Error in loadMore:", error);
  }
}
