export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}


export async function fetchCategory(termLink) {
    const termResponse = await fetch(termLink); 
    const termData = await termResponse.json(); 
    return termData[0].name;
}

export async function fetchFeaturedMedia(featuredMediaLink) {
    const mediaResponse = await fetch(featuredMediaLink);
    return await mediaResponse.json();
}