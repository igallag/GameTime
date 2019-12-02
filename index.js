const {Client, Attachment} = require('discord.js');
const client = new Client();
const auth = require('./auth.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
});
// this is where the message checker is
// reads all messages sent in the server to respond
// should probably add the auth.prefix so it only checks the full message if there is the proper prefix
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ping') {
    msg.reply('pong');
  } else if(msg.content === '!code') {
      msg.channel.send('https://youtu.be/u3CKgkyc7Qo?t=20')
  } else if(msg.content === 'info') {
      msg.channel.send('sup')
  } else if(msg.content.toLowerCase() === 'who is here') {
      let users = []
      client.guilds.forEach(async (guild) => {
        await guild.members.forEach((el) => {
            users.push(el.displayName)
        })
      })
      msg.channel.send(`${users} are all here!`)
  }
});


client.login(auth.token);
