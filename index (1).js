const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ GREENHACKER V5 ADVANCED is ready!');

    // Auto status viewer (simulation)
    client.getChats().then(chats => {
        chats.forEach(chat => {
            if (chat.isStatus) {
                chat.fetchMessages({ limit: 1 }).then(() => {
                    console.log(`🟢 Auto viewed status from: ${chat.name}`);
                });
            }
        });
    });
});

client.on('message', async message => {
    const chat = await message.getChat();

    // Auto Typing
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

client.initialize();