var express = require('express');
var router = express.Router();

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');



/* GET home page. */
router.get('/', function(req, res, next) {
  async function fetchWebsiteContent(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching website content:', error);
    }
}

// Function to extract text content from HTML body using Cheerio


// Function to check if website content has changed
async function checkWebsiteChange(url) {
    // Fetch current website content
    const currentContent = await fetchWebsiteContent(url);
    const $ = cheerio.load(currentContent);
    const textContent = $('#fusion-app > div.high-impact-vertstyles__StickyHighImpactLayoutWrapperStyled-sc-cuy9q8-1.kfiScF > div.layout-container > div > div.Box-sc-1hpkeeg-0.bmfazk > div.Box-sc-1hpkeeg-0.eOgpSu > div.price-page-currency-detail > div:nth-child(1) > div > div > div > div.Box-sc-1hpkeeg-0.column-1 > div.Box-sc-1hpkeeg-0.HhvhU > div.Box-sc-1hpkeeg-0.dmKGkL > span.currency-pricestyles__Price-sc-1v249sx-0.fcfNRE').text();

    // Retrieve stored previous content (assuming it's stored in localStorage)
    // const previousContent = localStorage.getItem('previousContent');

    // If no previous content is found, store the current content and return
    // if (!previousContent) {
    //     localStorage.setItem('previousContent', currentContent);
    //     console.log('No previous content found. Storing current content.');
    //     return;
    // }
    const filePath = './example.txt';
    // Compare current content with previous content
    fs.readFile(filePath, 'utf8', function(err, fileContent) {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        
    
        if (fileContent == String(textContent)) {
          axios.post('https://studynotification.app.n8n.cloud/webhook/64e9e6b2-0695-415a-a82e-9e498942915f',{title: 'Bitcoin Price has not changed yet'})
            console.log("website did not change");
        } else {
            fs.writeFile(filePath, textContent, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                axios.post('https://studynotification.app.n8n.cloud/webhook/64e9e6b2-0695-415a-a82e-9e498942915f',{title: 'Bitcoin Price is $'+textContent})
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
                console.log('website has changed');

                // console.log(findStringDifference(fileContent,textContent));
            });
        }
    });
}


function findStringDifference(str1, str2) {
    const maxLength = Math.max(str1.length, str2.length);
    let difference = '';

    for (let i = 0; i < maxLength; i++) {
        if (str1[i] !== str2[i]) {
            difference += str2[i];
        }
    }

    return difference;
}
// Example usage
const websiteUrl = 'https://www.coindesk.com/price/bitcoin/';
checkWebsiteChange(websiteUrl);
  res.render('index', { title: 'Express' });
});

module.exports = router;
