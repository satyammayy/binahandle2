const chalk = require('chalk');
const {WAConnection} = require('@adiwajshing/baileys');
const {StringSession} = require('./whatsasena/');
const fs = require('fs');

async function whatsAsena () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [2, 2119, 6]
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;
    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.italic('AsenaString Kodu Alıcı')}
${chalk.blue.italic('ℹ️  Connecting to Whatsapp... Please Wait.')}`);
    });
    

    conn.on('open', () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('Asena String Kodunuz: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );
        
        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `ASENA_SESSION="${st}"`);
        }
        if (conn.user.jid.startsWith('90')) {
            conn.sendMessage(conn.user.jid,st, MessageType.text)
            conn.sendMessage(conn.user.jid,'*Bu Kodu Kimseyle Paylaşmayın!*', MessageType.text)
        }
        else {
            conn.sendMessage(conn.user.jid,st, MessageType.text)
            conn.sendMessage(conn.user.jid,'*Do Not Share This Code With Anyone!*', MessageType.text)
        }
        console.log(
            chalk.blue.bold('Locale kuruyorsanız node bot.js ile botu başlatabilirsiniz.')
        );
        process.exit(0);
    });

    await conn.connect();
}

whatsAsena()