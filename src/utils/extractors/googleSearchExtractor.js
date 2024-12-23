export async function extractSearchLink(page, searchQuery, linkCondition) {
  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
    await page.waitForSelector('div.g', { timeout: 5000 });
    
    const link = await page.evaluate((condition) => {
      const links = Array.from(document.querySelectorAll('div.g a'));
      const foundLink = links.find(link => condition(link.href));
      return foundLink ? foundLink.href : null;
    }, linkCondition.toString());

    return link;
  } catch (error) {
    console.error(`Error extracting search link: ${error.message}`);
    return null;
  }
}