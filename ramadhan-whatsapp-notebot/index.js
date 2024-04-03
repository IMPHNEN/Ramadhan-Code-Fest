const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const moment = require('moment-timezone');
const fs = require('fs')

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: [
		'--no-sandbox',
	       '--disable-setuid-sandbox'
	]
    },
    authStrategy: new LocalAuth({
        clientId: "client"
    })
});

client.on('qr', qr => {
	console.log('Scan the QR below:', qr)
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.clear();
    const banner = './assets/banner.txt';
    fs.readFile(banner, 'utf-8', (err, data) => {
        console.log(data);
    });
});

client.on('call', async call => {
    console.log('Incoming call from: ' + call.from);
    call.reject();
});

client.on('message', async message => {
    if (message.body.startsWith('.a')) {
        const parts = message.body.split(' ');
        if (parts.length >= 3) {
            const time  = parts[1];
            const text  = parts.slice(2).join(' '); 
            const tz    = 'Asia/Jakarta';
            const regex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
            if (!regex.test(time)) {
                message.reply('Format waktu tidak valid. Pastikan waktu yang dimasukkan dalam format HH:mm (misalnya, 18:00).');
                console.log('Perintah error. Incoming message from: ' + message.from);
                return;
            } else {
                message.reply('Perintah diatur pada pukul ' + time + ' untuk mengirim pesan tersebut.');
                console.log('Perintah diatur pada pukul ' + time + ' untuk mengirim pesan: ' + text + '. Incoming message from: ' + message.from);
            }

            const target    = moment.tz(time, 'HH:mm', tz);
            const timenow   = moment().tz(tz);
            const delay     = target.diff(timenow);
            
            if (delay > 0) {
                setTimeout(() => {
                    message.reply(text);
                }, delay);
            }
        } else {
            message.reply('Format perintah salah. Gunakan: .a jam pesan | contoh .a 18:00 Pesan yang akan ditampilkan.');
            console.log('Perintah error. Incoming message from: ' + message.from);
        }
    }
});

client.initialize();
