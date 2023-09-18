
# YouTube Comments Scraper

This project is a web scraper that extracts comments, user IDs, and dates from a YouTube video and saves them to a CSV file.

## Table of Contents

- [YouTube Comments Scraper](#youtube-comments-scraper)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

The YouTube Comments Scraper is a tool built using Puppeteer and Node.js to extract comments from a YouTube video. It automates the process of scrolling through comments, collecting relevant information, and saving it to a CSV file for further analysis.

## Features

- Automatically scrolls through the YouTube video page to load all comments.
- Extracts user IDs, dates, and comment text from the comments section.
- Saves the extracted data to a CSV file for easy analysis and manipulation.

## Installation

1. Clone the repository or download the ZIP file.

```bash
git clone https://github.com/yourusername/youtube-comments-scraper.git
cd youtube-comments-scraper
```

2. Install the project dependencies using npm.

```bash
npm install
```

## Usage

1. Replace the `videoUrl` variable in the `index.js` file with the YouTube video URL from which you want to scrape comments.

```javascript
const videoUrl = 'https://www.youtube.com/watch?v=NaaSpRMBHjg&ab_channel=STILLIRISEMotivation';
```

2. Run the scraper using Node.js.

```bash
node index.js
```

3. The comments will be saved to a CSV file named `comments.csv`.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add a new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).