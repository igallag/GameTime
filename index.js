/* eslint-disable max-statements */
/* eslint-disable complexity */
/* The Above things should be deleted as I clean up the client logic but for testing I will
*  Keep it disabled
*/

const {Client} = require('discord.js')
const client = new Client()
const auth = require('./auth.json')
// const setTotalTimeThunk = require('./client/store/game')
const axios = require('axios')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
// this is where the message checker is
// reads all messages sent in the server to respond
// should probably add the auth.prefix so it only checks the full message if there is the proper prefix

/*
* This is probably too complex given how many nested else ifs
* but most are for testing
*/

client.on('message', async msg => {
  let time = new Date()

  if (msg.author.username !== 'GameTime') {
    if (msg.content.toLowerCase() === 'ping') {
      // This is used for testing to get a user's discord ID
      console.log(msg.author)
      msg.reply('pong')
    } else if (msg.content === '!code') {
      // This is a dumb test joke, the video is from the movie Hackers
      msg.channel.send('https://youtu.be/u3CKgkyc7Qo?t=20')
    } else if (msg.content.toLowerCase() === 'who is here') {
      // this was a test of being able to read users in the channel
      // seems kind of cumbersome to have nested loops but there are only 4 users in 1 server
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
    } else if (msg.content.startsWith('!addGame')) {
      /*
      This will trim everything after the initial command and add it to the db
      There are no protections as to the name and how the presence is read but it works
      in a proof of concept.
      */
      let gameName = msg.content.slice(8).trim()
      let {data} = await axios.post(
        `http://localhost:8080/api/users/${msg.author.id}`,
        {game: gameName}
      )
      msg.author.send(`You subscribed to ${gameName}`)
    } else if (msg.content.toLowerCase().startsWith('start test')) {
      console.log('test started')
      let gameName = msg.content.slice(10).trim()
      // this is just a temp test and will probably be moved
      gameName = gameName
        .replace(/\s/g, '_')
        .replace(/\W/g, '')
        .replace(/_/g, '-')
        .toLowerCase()

      time = time.getTime()

      let {data} = await axios.put(
        `http://localhost:8080/api/games/${msg.author.id}/${gameName}`,
        {startTime: time}
      )
    } else if (msg.content.toLowerCase().startsWith('end test')) {
      console.log('test ended')
      let gameName = msg.content.slice(8).trim()

      // this is just a temp test and will probably be moved
      gameName = gameName
        .replace(/\s/g, '_')
        .replace(/\W/g, '')
        .replace(/_/g, '-')
        .toLowerCase()
      let currGame = await axios.get(
        `http://localhost:8080/api/games/${msg.author.id}/${gameName}`
      )
      currGame = currGame.data

      let endTime = Date.now()
      let startTime = Date.parse(currGame.startTime)

      let finalTotal = endTime - startTime

      finalTotal = Math.floor(finalTotal / 60000)
      let {data} = await axios.put(
        `http://localhost:8080/api/games/${msg.author.id}/${gameName}`,
        {total: finalTotal}
      )

      console.log(
        `the current session was: ${finalTotal} mins long.  The total time played is ${
          data.timePlayed
        }`
      )
    }
  }
})

client.on('presenceUpdate', (oldMember, newMember) => {
  if (newMember.presence.game) {
    // newMember.send(`you started playing ${newMember.presence.game.name}`)

    let gameName = newMember.presence.game.name

    console.log(newMember.presence.game, 'This is newMember')

    /*
    This will probably become too much if too many people have too many games given
    this is basically a tripple nested loop 2x forEach and 1x .includes seems like O(n^3)
    */
    // This notifies a user if someone in their server started playing a game they are subscribed to
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

client.login(auth.token)
