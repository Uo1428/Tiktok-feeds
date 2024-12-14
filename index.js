const fs = require("node:fs/promises");
const axios = require("axios");
const cheerio = require("cheerio");

const config = {
  feedPath: "./tt_feeds.json", // File containing TikTok users and Discord webhooks
  postsPath: "./posts.json", // File to store fetched post IDs
  interval: 5 * 60 * 1000, // 5 minutes
};

// Helper to read JSON files
async function readJSON(filePath) {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return {};
  }
}

// Helper to write JSON files
async function writeJSON(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error.message);
  }
}

async function fetchTikTokPosts(tt_id) {
  const response = await axios.get(`https://urlebird.com/user/${tt_id}/`);
  if (response.status !== 200) throw new Error("Failed to fetch user page");

  const $ = cheerio.load(response.data);
  const postLinks = [];

  $('a[href*="/video/"]').each((_, element) => {
    const link = $(element).attr("href");
    if (link) {
      postLinks.push(link);
    }
  });

  return postLinks
    .map((url) => {
      const match = url.match(/(\d+)\/?$/);
      return match ? match[1] : null;
    })
    .filter(Boolean);
}

async function handleTikTokFeeds() {
  const feeds = await readJSON(config.feedPath);
  const postsData = await readJSON(config.postsPath);

  for await (const [tt_id, { webhook }] of Object.entries(feeds)) {
    try {
      const ids = await fetchTikTokPosts(tt_id);
      const storedPosts = postsData[tt_id] || [];
      const newPosts = ids
        .filter((id) => !storedPosts.includes(id))
        .splice(0, 10);

      console.log(`[TT] ${tt_id}: Found ${newPosts.length} new posts`);

      for (const id of newPosts) {
        if (!storedPosts.includes(id)) {
          const tt_link = `https://tiktok.com/@${tt_id}/video/${id}`;
          await sendToDiscord(webhook, tt_link);
          storedPosts.push(id); // Add the new post to the list
        }
      }

      postsData[tt_id] = storedPosts.slice(-50); // Keep last 50 posts
    } catch (error) {
      console.error(`[TT] ${tt_id}:`, error.message);
    }
  }

  await writeJSON(config.postsPath, postsData);
  setTimeout(handleTikTokFeeds, config.interval);
}

async function sendToDiscord(webhookUrl, message) {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });
    console.log("Message sent to Discord:", message);
  } catch (error) {
    console.error("Failed to send message to Discord:", error.message);
  }
}

handleTikTokFeeds();

/**
 * discord: @uoaio
 * fiverr: fiverr.com/aryanali945
 * youtube: youtube.com/@uoaio
 * github: github.com/uo1428
 */
