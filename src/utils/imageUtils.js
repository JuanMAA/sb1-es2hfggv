export async function downloadImage(url) {
  if (!url) return null;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download image: ${response.statusText}`);
      return null;
    }
    
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
    return null;
  }
}

export async function extractSocialMediaImage(page, platform, selector) {
  if (!page || !selector) return null;

  try {
    const imageElement = await page.$(selector);
    if (!imageElement) {
      console.log(`No image found for ${platform} using selector: ${selector}`);
      return null;
    }

    const imageUrl = await page.evaluate((el) => el.getAttribute('src'), imageElement);
    if (!imageUrl) {
      console.log(`No src attribute found in image for ${platform}`);
      return null;
    }

    return await downloadImage(imageUrl);
  } catch (error) {
    console.error(`Error extracting ${platform} image: ${error.message}`);
    return null;
  }
}