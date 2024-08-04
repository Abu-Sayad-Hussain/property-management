import puppeteer from 'puppeteer';

export const scrapeProperty = async (searchTerm: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = 'https://apps.hhs.texas.gov/LTCSearch/namesearch.cfm';

  try {
    // Increase the timeout for navigation to 60 seconds
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 120000});

    // Wait for the search input to be visible and type the search term
    await page.waitForSelector('#searchterm', { visible: true });
    await page.type('#searchterm', searchTerm);

    await page.click('[class="ctaButton"]');
    
    // Wait for the results table to load
    await page.waitForSelector('[class="sortabletable"]');
    console.log('called wait sort table');

    // Extract property data from the table
    const properties = await page.evaluate(() => {
      const propertyElements = Array.from(document.querySelectorAll('.sortabletable tbody tr'));

      return propertyElements.map((element: Element) => {
        const name = (element.querySelector('td:nth-child(1) a') as HTMLElement).innerText;
        const address = (element.querySelector('td:nth-child(2)') as HTMLElement).innerText;
        const city = (element.querySelector('td:nth-child(3)') as HTMLElement).innerText;
        const zipCode = (element.querySelector('td:nth-child(4)') as HTMLElement).innerText;
        const county = (element.querySelector('td:nth-child(5)') as HTMLElement).innerText;
        const type = (element.querySelector('td:nth-child(6)') as HTMLElement).innerText;

        return { name, address, city, zipCode, county, type };
      });
    });

    await browser.close();

    return properties;
  } catch (error) {
    console.error('Error scraping data:', error);
    await browser.close();
    throw error;
  }
};