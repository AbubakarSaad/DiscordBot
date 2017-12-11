const Discord = require('discord.js');
const auth = require('./auth.json');
const axios = require('axios');

const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Connected:');
});

function getPrices() {
    let result = axios.get('https://api.coindesk.com/v1/bpi/currentprice/CAD.json')
    .then((response) => {
        return response.data.bpi;
    })
    .catch((error) => {
        console.log(error);
    });
    return result;
}


bot.on('message', (message) => {
    if (message.content.startsWith("!")) {
        console.log(message.content);
        if (message.content.substring(0,1) == '!') {
            let args = message.content.substring(1).split(' ');
            const cmd = args[0];

            args = args.splice(1);
            switch(cmd) {
                case 'bitcad':
                    // get the price from API coinbase for now
                    getPrices().then((res) => {
                        message.channel.send('$' + res.CAD.rate + ' CAD');
                    });
                    
                    break;
                case 'bitusd':
                    getPrices().then((res) => {
                        message.channel.send('$' + res.USD.rate + ' USD');
                    });
                    break;
                default:
                    message.channel.send('wasting my time');
            }
        }
    }
});

bot.login(auth.token);