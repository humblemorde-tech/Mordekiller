```md
# Morde Killer Bot v3.0 🔥

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2Z6Z3R2cXJ0Z3Z4c2F0Z2N2d2N2Z3J5dGJ5dXZ5Z3J6ZQ/example.gif" alt="Morde Killer Bot Animation" width="100%"/>
</p>

Public WhatsApp bot using Baileys. Pair + Deploy your own instance in 2 mins. No terminal needed.

<p align="center">
  <a href="https://github.com/yourusername/morde-killer-bot/actions/workflows/pair.yml">
    <img src="https://img.shields.io/badge/PAIR_WHATSAPP-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Pair WhatsApp"/>
  </a>
  <a href="https://heroku.com/deploy?template=https://github.com/yourusername/morde-killer-bot">
    <img src="https://img.shields.io/badge/Deploy_to_Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" alt="Deploy to Heroku"/>
  </a>
  <a href="https://render.com/deploy">
    <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render"/>
  </a>
  <a href="https://railway.app/template/your-template-id">
    <img src="https://railway.app/button.svg" alt="Deploy on Railway"/>
  </a>
  <a href="https://www.tiktok.com/@morde591?_r=1&_t=ZS-96zhW262Jsb">
    <img src="https://img.shields.io/badge/Follow_on_TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white" alt="TikTok"/>
  </a>
</p>

---

### 🚀 Deploy Steps - 3 Clicks

| Step | Action |
| --- | --- |
| **1. Pair** | Click **PAIR WHATSAPP** button above > Run workflow > Enter `254731070008` |
| **2. Get Code** | Check Actions logs for pairing code `XXXX-XXXX` + `SESSION_ID` |
| **3. Deploy** | Click **Deploy to Heroku/Render/Railway** > Paste `SESSION_ID` > Deploy |

### 📱 WhatsApp Linking
After getting the pairing code from GitHub Actions:
1. Open WhatsApp > `Settings` > `Linked Devices`
2. Tap `Link a device` > `Link with phone number instead` 
3. Enter the 8-digit code from logs
4. Bot will print `[SESSION_ID]` in GitHub Actions. Copy it.

### ⚙️ Environment Variables
Set these on Heroku/Render/Railway:

| Variable | Value | Required |
| --- | --- | --- |
| `SESSION_ID` | Long string from Pair step | ✅ Yes |
| `OWNER_NUMBER` | `254731070008@s.whatsapp.net` | ✅ Yes |
| `PREFIX` | `!` | No |
| `BOT_NAME` | `Morde Killer` | No |

### 🔥 Features
- **37 Commands**: `!ping`, `!menu`, `!sticker`, `!tagall`, `!play`, `!ai`, `!ytmp3` + 31 more
- **Anti-Ban**: 1-2s delays on all actions
- **Session-Based**: No QR scan on servers. Uses pairing code
- **Public Deploy**: Anyone can fork and run their own instance
- **Multi-Platform**: Heroku, Render, Railway, Koyeb, Docker

### 📋 Commands List
```
📍 GENERAL:   !ping, !menu, !info, !owner, !runtime, !script
🎨 MEDIA:     !sticker, !toimg, !meme
👥 GROUP:     !tagall, !hidetag, !groupinfo, !linkgc, !promote, !demote, !kick
📥 DOWNLOADER:!play, !ytmp3, !ytmp4, !tiktok, !igdl
🤖 AI & FUN:  !ai, !joke, !quote, !fact, !truth, !dare
🛠 TOOLS:     !calc, !weather, !qr, !tts, !translate, !ss
👑 OWNER:     !join, !leave, !broadcast, !session, !block, !unblock
```

### 🎵 Follow Me
**TikTok**: [@morde591](https://www.tiktok.com/@morde591?_r=1&_t=ZS-96zhW262Jsb) - Bot updates + tutorials
