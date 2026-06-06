```js
require('dotenv').config()
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const P = require('pino')
const fs = require('fs')
const { messageHandler } = require('./src/handler')

// Bot Config
const BOT_NAME = process.env.BOT_NAME || "Morde Killer"
const PREFIX = process.env.PREFIX || "!"
const OWNER_NUMBER = process.env.OWNER_NUMBER || "254731070008@s.whatsapp.net"
const SESSION_ID = process.env.SESSION_ID || ""
const PORT = process.env.PORT || 3000

// Restore session from SESSION_ID env
async function restoreSession() {
    if (!SESSION_ID) return false
    try {
        if (!fs.existsSync('./morde_auth')) fs.mkdirSync('./morde_auth')
        const decoded = Buffer.from(SESSION_ID, 'base64').toString('utf-8')
        fs.writeFileSync('./morde_auth/creds.json', decoded)
        console.log('[SESSION] Restored from SESSION_ID')
        return true
    } catch (e) {
        console.log('[SESSION] Invalid SESSION_ID:', e.message)
        return false
    }
}

async function startMordeKiller() {
    await restoreSession()
    
    const { state, saveCreds } = await useMultiFileAuthState('./morde_auth')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.ubuntu('Chrome'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' }))
        },
        getMessage: async () => ({ conversation: `${BOT_NAME}` })
    })

    // Save creds + print new SESSION_ID
    sock.ev.on('creds.update', async () => {
        await saveCreds()
        try {
            const newSession = Buffer.from(fs.readFileSync('./morde_auth/creds.json')).toString('base64')
            console.log('\n[NEW SESSION_ID] Copy this to Render/Heroku:\n')
            console.log(newSession)
            console.log('\n')
        } catch {}
    })

    // Connection handling
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom) && 
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
            console.log(`[${BOT_NAME}] Connection closed. Reconnecting:`, shouldReconnect)
            if (shouldReconnect) {
                setTimeout(startMordeKiller, 3000)
            } else {
                console.log('[SESSION] Logged out. Delete SESSION_ID and re-pair.')
            }
        } else if (connection === 'open') {
            console.log(`[${BOT_NAME}] v3.0.0 Connected!`)
            console.log(`[PREFIX] ${PREFIX}`)
            console.log(`[OWNER] ${OWNER_NUMBER}`)
            await sock.sendMessage(OWNER_NUMBER, { text: `✅ ${BOT_NAME} is online\nPrefix: ${PREFIX}\n37 commands loaded` })
        }
    })

    // Handle all messages
    sock.ev.on('messages.upsert', async (m) => {
        await messageHandler(sock, m, { BOT_NAME, PREFIX, OWNER_NUMBER })
    })

    // Keep alive for Render/Railway
    if (process.env.RENDER || process.env.RAILWAY_ENVIRONMENT) {
        const express = require('express')
        const app = express()
        app.get('/', (req, res) => res.send(`${BOT_NAME} is running`))
        app.listen(PORT, () => console.log(`[SERVER] Running on port ${PORT}`))
    }
}

startMordeKiller().catch(err => console.log(`[FATAL]`, err))
```
