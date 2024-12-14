# TikTok Feeds Bot  

Fetch TikTok video feeds and send them directly to Discord channels via webhooks. You can also modify the code to change the destination as needed.

## Features  
- Automatically fetches the latest TikTok videos for specified accounts.  
- Sends video links to Discord via webhook.  
- Stores post history to prevent duplicate notifications.  
- Easily configurable through `tt_feeds.json` and `posts.json`.

---

## Prerequisites  
1. Install **Node.js v20.x.x** or higher.  
2. Basic knowledge of editing JSON files for configuration.

---

## Installation and Setup  

1. Clone or download the repository.  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Configure TikTok IDs and Discord webhooks in `tt_feeds.json`:  
   ```json
   {
     "tiktok_user1": {
       "webhook": "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"
     },
     "tiktok_user2": {
       "webhook": "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"
     }
   }
   ```
4. Run the bot:  
   ```bash
   node .
   ```

---

## Configuration  

### `tt_feeds.json`  
This file stores the TikTok usernames and their corresponding Discord webhooks:  
   ```json
   {
     "tiktok_user1": {
       "webhook": "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"
     },
     "tiktok_user2": {
       "webhook": "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"
     }
   }
   ```

### `posts.json`  
This file is generated automatically to track which posts have already been shared to Discord. Example:  
   ```json
   {
     "tiktok_user1": ["123456789", "987654321"],
     "tiktok_user2": ["234567890", "876543219"]
   }
   ```

---

## Notes  
- The bot checks for new posts every 5 minutes by default. You can adjust this interval in the script by modifying the `interval` value.  
- Ensure that all webhooks are valid and active.

---

## Contact  

For help or customizations, feel free to reach out:  
- **Discord**: @uoaio  
- **Fiverr**: [fiverr.com/aryanali945](https://fiverr.com/aryanali945)  
- **YouTube**: [youtube.com/@uoaio](https://youtube.com/@uoaio)  
- **GitHub**: [github.com/uo1428](https://github.com/uo1428)
