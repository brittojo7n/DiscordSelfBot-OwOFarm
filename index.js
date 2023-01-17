require('dotenv').config()
const { Client } = require('discord.js-selfbot-v13');
const config = require('./config.json')
const server = require('server');

// Config
const TOKEN = JSON.parse(process.env.TOKEN)
const reportChannelId = config.reportChannelId || config.channelId
const authorId = config.id, owoId = config.owoId
const { get, post } = server.router;

// Anticipate that the commands are not running at the same time
const random = (number = 10) => {
  return Math.floor(Math.random() * number)
}

// Handle requests to the url "/" ( http://localhost:3000/ )
server([
  get('/', ctx => 'Hello world!')
]);

// Can run many bots depending on device capacity
for (const token of TOKEN) {
  let statusBot = true
  let statusAfk = false
  let channelId = token.split('xxxxx')[1] || config.channelId // (Default channel for send owo)

  // sendOwo function along with random extra time so it is not detected (trial)
  const sendOwo = (text, time = 15000) => {
    setTimeout(async () => {
      if (!statusBot || statusAfk) return sendOwo(text, time)
      console.log(`(${client.user.username}) send ${text}`)
      let channel = client.channels.cache.get(channelId);
      await channel.send(text)
      sendOwo(text, time)
    }, time + (random(9) * 1000))
  }

  const autoAfk = (time, on = 70000) => {
    setTimeout(() => {
      if (!statusBot) return autoAfk(1000)
      statusAfk = !statusAfk
      autoAfk(on)
    }, time)
  }

  const client = new Client({
    checkUpdate: false
  })

  client.login(token.split('xxxxx')[0]);

  client.on('ready', async () => {
    console.log(`(${client.user.tag}) ready for auto farming`);
    client.user.setStatus('invisible');
    sendOwo('owo h')
    sendOwo('owo b')
    sendOwo('owo pray', 300000)
    sendOwo('owo', 60000)
    autoAfk(50000)
  })

  client.on('messageCreate', async (msg) => {
    if (msg.author.id === String(owoId) || msg.author.id === String(config.authorId)) {
      if (msg.content.toLowerCase().match(/human|captcha|dm|banned|https:\/\/owobot.com\/captcha|Beep|human\?/g) || msg.channel.type == 'dm') {
        if (msg.content.match(new RegExp(`${client.user.username}`))) {
          console.log(`(${client.user.username}) Owo need captcha`)
          statusBot = false
          let getChannel = await client.channels.cache.get(reportChannelId)
          let attachments = msg.attachments.map(e => e)
          if (attachments.length == 0) return getChannel.send(`**[MSG]** ${msg.content}\n ${msg.guild ? `**[Server]** : ${msg.guild.name} (${msg.channel.name})\n<@${authorId}>` : ''}`)
          return getChannel.send(`**[OwO]** ${msg.content}\nServer : [ ${msg.guild ? `**[Server]** : ${msg.guild.name} (${msg.channel.name})` : ''} ]\n**Link** : ${attachments[0].url || 'Null'}\n<@${authorId}>`)
        }
      }

      if (msg.content.toLowerCase().match(/and caught a|and caught an/g)) {
        let channel = client.channels.cache.get(channelId)
        console.log(`(${client.user.username}) Using Gems [default: Epic]`)
        statusBot = false
        setTimeout(function(){channel.send(`owo use 54`)}, 1000)
        setTimeout(function(){channel.send(`owo use 68`)}, 8000)
        setTimeout(function(){
          channel.send(`owo use 75`)
          statusBot = true
          console.log(`(${client.user.username}) Started auto-farm!`)
        }, 16000)
      }
    }

    if (msg.content.match(/!say/g) && msg.author == config.id) {
      return msg.channel.send(msg.content.replace('!say ', ''))
    }

    // Message from Owo
    if (msg.author.id == owoId && msg.channel.type == 'DM') {
      if (msg.content.match(/👍|verified|Thank you! :3/g)) {
        statusBot = true
        console.log(`(${client.user.tag}) Continue bot(s)`)
      }
      let getId = client.users.cache.get(authorId)
      try {
        return getId.send(`**[OWO SAY]** ${msg.content}`)
      } catch (error) {
        console.log('Unable to send')
      }
    }

    if (msg.content.match(new RegExp(`!${client.user.username}`))) {
      let getId = client.users.cache.get(owoId)
      getId.send(msg.content.replace(`!${client.user.username} `, '')).catch((e) => console.log('Unable to send'))
    }
  })
}
