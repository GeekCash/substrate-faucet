const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('message', message => {
  if (message.content === '!hello') {
    message.channel.send('Hello there!');
  }
}); 

client.login("");
