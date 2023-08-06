import axios from "axios";

export interface UnsplashImage {
  id: string;
  url: string;
  // Other properties you might need from the API response
}

export async function fetchUnsplashImage(): Promise<UnsplashImage> {
  try {
    const response = await axios.get("https://picsum.photos/200/300");

    const image: UnsplashImage = {
      id: Date.now().toString(), // Generate a unique ID for the image
      url: response.request.responseURL, // Use the responseURL directly as the image URL
    };

    return image;
  } catch (error) {
    // Handle errors here
    throw new Error("Error fetching image from Lorem Picsum API");
  }
}
