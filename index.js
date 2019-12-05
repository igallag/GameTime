const {Client} = require('discord.js')
const client = new Client()
const auth = require('./auth.json')
// const fetch = require('node-fetch');
const axios = require('axios')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
// this is where the message checker is
// reads all messages sent in the server to respond
// should probably add the auth.prefix so it only checks the full message if there is the proper prefix
client.on('message', async msg => {
  //   console.log(msg, 'this is message');

  if (msg.author.username !== 'GameTime') {
    if (msg.content.toLowerCase() === 'ping') {
      console.log(msg.author)
      msg.reply('pong')
    } else if (msg.content === '!code') {
      // This is a dumb test joke, the video is from the movie Hackers
      msg.channel.send('https://youtu.be/u3CKgkyc7Qo?t=20')
    } else if (msg.content.toLowerCase() === 'who is here') {
      // this was a test of being able to read users in the channel
      // seems kind of cumbersome to have nested loops but there are only 3 users in 1 server
      let users = []
      client.guilds.forEach(async guild => {
        await guild.members.forEach(el => {
          users.push(el.displayName)
        })
      })

      msg.channel.send(`${users} are all here!`)
    } else if (msg.content.toLowerCase() === 'fuck') {
      // this was a test for being able to DM certain users
      msg.author.send('Hey pal, maybe cool it with the swears')
    } else if (msg.content.toLowerCase() === 'api test') {
      // this was a test to see if I was able to hit API routes from a discord message

      let {data} = await axios.get(
        `http://localhost:8080/api/users/${msg.author.id}`
      )
      let user = await client.fetchUser(data.discId)

      msg.author.send(
        `You tried hitting an API route for ${user.username}.  [${
          data.subGames
        }] are the games they are subscribed to!`
      )
    }
  }
})

client.on('presenceUpdate', (oldMember, newMember) => {
  if (newMember.presence.game) {
    // newMember.send(`you started playing ${newMember.presence.game.name}`)

    client.guilds.forEach(async guild => {
      await guild.members.forEach(async member => {
        let {data} = await axios.get(
          `http://localhost:8080/api/users/${member.id}`
        )
        if (data.subGames.includes(newMember.presence.game.name)) {
          member.send(
            `${newMember} has started playing ${newMember.presence.game.name}`
          )
        }
      })
    })
  }
})

// This is no logging in at the moment but the token and permissions are correct
client.login(auth.token)
