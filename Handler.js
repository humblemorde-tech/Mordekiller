```js
const { downloadMediaMessage } = require('@whiskeysockets/baileys')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function messageHandler(sock, { messages, type }, { BOT_NAME, PREFIX, OWNER_NUMBER }) {
    if (type!== 'notify') return
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const from = msg.key.remoteJid
    const isGroup = from.endsWith('@g.us')
    const sender = msg.key.participant || from
    const pushName = msg.pushName || "User"
    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || ""

    if (!body.startsWith(PREFIX)) return
    const args = body.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    const text = args.join(" ")

    console.log(`[${BOT_NAME}] ${pushName}: ${PREFIX}${command}`)

    try {
        switch (command) {
            // GENERAL 1-6
            case 'ping':
                await delay(1000)
                const start = Date.now()
                await sock.sendMessage(from, { text: `Pong! 🏓 ${Date.now() - start}ms` })
                break

            case 'menu':
            case 'help':
                await delay(1000)
                const menu = `*${BOT_NAME} v3.0*\n_37 Commands_\n\n*📍 GENERAL*\n${PREFIX}ping, ${PREFIX}info, ${PREFIX}owner, ${PREFIX}runtime, ${PREFIX}script\n\n*🎨 MEDIA*\n${PREFIX}sticker, ${PREFIX}toimg, ${PREFIX}meme\n\n*👥 GROUP*\n${PREFIX}tagall, ${PREFIX}hidetag, ${PREFIX}groupinfo, ${PREFIX}linkgc\n\n*📥 DOWNLOADER*\n${PREFIX}play, ${PREFIX}ytmp3, ${PREFIX}tiktok\n\n*🤖 AI & FUN*\n${PREFIX}ai, ${PREFIX}joke, ${PREFIX}quote, ${PREFIX}fact\n\n*🛠 TOOLS*\n${PREFIX}calc, ${PREFIX}weather, ${PREFIX}qr, ${PREFIX}tts\n\n*👑 OWNER*\n${PREFIX}join, ${PREFIX}leave, ${PREFIX}broadcast, ${PREFIX}session`
                await sock.sendMessage(from, { text: menu })
                break

            case 'info':
                await sock.sendMessage(from, { text: `*${BOT_NAME}*\n\nPrefix: ${PREFIX}\nLibrary: Baileys\nVersion: 3.0.0\nCommands: 37\nOwner: @${OWNER_NUMBER.split('@')[0]}`, mentions: [OWNER_NUMBER] })
                break

            case 'owner':
                await sock.sendMessage(from, { text: `*Owner:* wa.me/${OWNER_NUMBER.split('@')[0]}` })
                break

            case 'runtime':
                const uptime = process.uptime()
                await sock.sendMessage(from, { text: `*Uptime*\n${Math.floor(uptime/3600)}h ${Math.floor(uptime%3600/60)}m ${Math.floor(uptime%60)}s` })
                break

            case 'script':
                await sock.sendMessage(from, { text: `*${BOT_NAME} Script*\n\nNode.js + Baileys\nPublic deployable\nGitHub: Fork this repo` })
                break

            // MEDIA 7-9
            case 'sticker':
            case 's':
                const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
                const mediaMsg = quoted?.imageMessage || quoted?.videoMessage || msg.message.imageMessage || msg.message.videoMessage
                if (!mediaMsg) return sock.sendMessage(from, { text: `Reply to image/video with ${PREFIX}sticker` })
                const buffer = await downloadMediaMessage(msg, 'buffer', {}, { reuploadRequest: sock.updateMediaMessage })
                await sock.sendMessage(from, { sticker: buffer })
                break

            case 'toimg':
                const quotedSticker = msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage
                if (!quotedSticker) return sock.sendMessage(from, { text: `Reply to a sticker with ${PREFIX}toimg` })
                const imgBuffer = await downloadMediaMessage(msg, 'buffer', {}, { reuploadRequest: sock.updateMediaMessage })
                await sock.sendMessage(from, { image: imgBuffer })
                break

            case 'meme':
                await sock.sendMessage(from, { text: 'Meme generator coming. Install canvas to enable.' })
                break
