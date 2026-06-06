js
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

async function PairCode() {
    if (!fs.existsSync('./morde_auth')) fs.mkdirSync('./morde_auth')
    const { state, saveCreds } = await useMultiFileAuthState('./morde_auth')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.ubuntu('Chrome'),
        auth: state
    })

    if (!sock.authState.creds.registered) {
        const phoneNumber = await question('Enter your WhatsApp number with country code, e.g 254731070008: ')
        const code = await sock.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ''))
        console.log(`\n[PAIRING CODE]: ${code}`)
        console.log(`\nWhatsApp > Linked Devices > Link with phone number instead\n`)

        sock.ev.on('creds.update', saveCreds)
        sock.ev.on('connection.update', (update) => {
            if (update.connection === 'open') {
                const session = Buffer.from(fs.readFileSync('./morde_auth/creds.json')).toString('base64')
                console.log('\n[SUCCESS] Bot linked!')
                console.log('\n[SESSION_ID] Copy this to Render/Heroku:\n')
                console.log(session, '\n')
                process.exit(0)
            }
        })
    } else {
        console.log('Already paired. Delete morde_auth folder to re-pair.')
        process.exit(0)
    }
}

PairCode()
```
