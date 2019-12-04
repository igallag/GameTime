const {Client, Attachment} = require('discord.js')
const client = new Client()
const auth = require('./auth.json')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
// this is where the message checker is
// reads all messages sent in the server to respond
// should probably add the auth.prefix so it only checks the full message if there is the proper prefix
client.on('message', msg => {
  //   console.log(msg, 'this is message');

  if (msg.author.username !== 'GameTime') {
    if (msg.content.toLowerCase() === 'ping') {
      msg.reply('pong')
    } else if (msg.content === '!code') {
      msg.channel.send('https://youtu.be/u3CKgkyc7Qo?t=20')
    } else if (msg.content === 'info') {
      msg.channel.send('sup')
    } else if (msg.content.toLowerCase() === 'who is here') {
      let users = []
      client.guilds.forEach(async guild => {
        await guild.members.forEach(el => {
          users.push(el.displayName)
        })
      })

      //   let userStr = users.split('');
      msg.channel.send(`${users} are all here!`)
    } else if (msg.content.toLowerCase() === 'fuck') {
      msg.author.send('Hey pal, maybe cool it with the swears')
    }
    // else if(msg.content.toLowerCase() === 'what game') {
    //     let game = msg.author
    // }
  }
})

client.on('presenceUpdate', (oldMember, newMember) => {
  if (newMember.presence.game) {
    newMember.send(`you started playing ${newMember.presence.game.name}`)
    console.log(newMember.presence)
  }
})

// This is no logging in at the moment but the token and permissions are correct
client.login(auth.token)
