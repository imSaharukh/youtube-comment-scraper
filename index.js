const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const videoUrl = 'https://www.youtube.com/watch?v=z3FA2kALScU&ab_channel=Motivation2Study'; // Replace with the actual YouTube video URL

const scrapeComments = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the language to English
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });

  await page.goto(videoUrl);

  // Scroll down to load more comments
  let previousHeight;
  while (true) {
    previousHeight = await page.evaluate('document.documentElement.scrollHeight');
    await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
    await page.waitForTimeout(3000); // Wait for comments to load
    const newHeight = await page.evaluate('document.documentElement.scrollHeight');
    if (newHeight === previousHeight) {
      break; // Reached the end of comments
    }
  }

  // Extract comments, user IDs, and dates
  const comments = await page.evaluate(() => {
    const commentElements = document.querySelectorAll('ytd-comment-renderer');
    const commentsArray = [];
    for (const commentElement of commentElements) {
      const userIdElement = commentElement.querySelector('#author-text span');
      const userId = userIdElement ? userIdElement.innerText.trim() : 'Unknown User';
      const dateElement = commentElement.querySelector('.published-time-text a');
      const date = dateElement ? dateElement.innerText.trim() : 'Unknown Date';
      const commentTextElement = commentElement.querySelector('#content-text');
      const commentText = commentTextElement ? commentTextElement.innerText.trim() : 'No comment text';
      commentsArray.push({ userId, date, commentText });
    }
    return commentsArray;
  });

  await browser.close();

  return comments;
};

const run = async () => {
  try {
    const commentsData = await scrapeComments();

    // Create a CSV writer
    const csvWriter = createCsvWriter({
      path: 'comments.csv',
      header: [
        { id: 'userId', title: 'User ID' },
        { id: 'date', title: 'Date' },
        { id: 'commentText', title: 'Comment Text' },
      ],
    });

    // Write comments to CSV
    await csvWriter.writeRecords(commentsData);
    console.log('Comments saved to comments.csv');
  } catch (error) {
    console.error('Error:', error);
  }
};

run();
