const { Client, useSingleFileAuthState } = require('whatsapp-web.js');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./session.json');

const client = new Client({
    authStrategy: useSingleFileAuthState('./session.json'),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    },
    auth: state
});

client.on('qr', (qr) => {
    console.log('Scan this QR Code in terminal OR use pair code via console.');
});

client.on('pairing-code', (code) => {
    console.log('===== PAIRING CODE =====');
    console.log(code);
    console.log('========================');
});

client.on('ready', () => {
    console.log('✅ GREENHACKER V5 BOT is now connected via Pairing Code!');
});

client.on('message', async message => {
    const chat = await message.getChat();

    await chat.sendStateTyping();

    if (message.body === '!tagall') {
        if (!chat.isGroup) return;
        let text = '';
        for (let participant of chat.participants) {
            text += `@${participant.id.user} `;
        }
        chat.sendMessage(text, {
            mentions: chat.participants.map(p => p.id)
        });
    }

    if (message.body === '!antilink on') {
        message.reply('✅ Anti-link mode is now ON!');
    }

    if (message.body === '!bug') {
        message.reply('✅ GREENHACKER V5 is stable. No bugs detected!');
    }
});

client.on('auth_failure', () => {
    console.log('❌ Authentication failed. Try re-pairing.');
});

client.initialize();
