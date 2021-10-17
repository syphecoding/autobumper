const Discord = require('discord.js');
const d = require('./data.js');
const bump = require('./bump.js');
const fs = require('fs');
const client = new Discord.Client();
const puppeteer = require("puppeteer");
const fetch = require('node-fetch');
var config = require('./config');

const cookiePath = __dirname + '/cookies.txt';
const fileName = __dirname + '/file.json';
const threads = __dirname + '/file.json';

const filePath = './cookies.txt';

const file = require(fileName)

var browser;

client.on('ready', async() => {

});

client.on('message', async msg => {

  if (!msg.author.bot && (msg.content.startsWith('#add'))) {
    let data = JSON.parse(fs.readFileSync(threads));

    let split = msg.content.slice(5).replace(/\s/g, '').split(',');
    
    split.forEach((e)=> { 
      console.log(data)
      data.threads.push({"thread":e, "lastbump":new Date(1999, 1).toJSON()})
    })

    fs.writeFileSync(fileName, JSON.stringify(data, null, 4));

    msg.channel.send(embed("Added threads."));

  }

  if (!msg.author.bot && msg.content.startsWith('#rm')) {
    let key = msg.content.split(" ")[1]

    let data = JSON.parse(fs.readFileSync(threads));
    for(let i = 0; i < data['threads'].length; ++i){
      if(data["threads"][i].thread === key)
      data["threads"].splice(i,1);
    }
    fs.writeFileSync(fileName, JSON.stringify(data, null, 4));

    msg.channel.send(embed("Deleted thread."))


  }

  if (!msg.author.bot && (msg.content.startsWith('#view'))) {
    let data = JSON.parse(fs.readFileSync(threads));
    let res = [];
    data.threads.forEach(e=>{
      res.push(e.thread)
    })

    if(res.length === 0){
      msg.channel.send(embed("None found."))
    }
    else{
      msg.channel.send(embed(res)) 
    }

  }

  if(!msg.author.bot && msg.content.startsWith('#auth')) {
    const file = msg.attachments.first()?.url;
    const response = await fetch(file);
    if(!response.ok) return msg.channel.send('Error getting file.');
    const text = await response.text();
    if(text.length > 100)
      msg.channel.send(embed("Adding cookie."))
    fs.writeFileSync(filePath, text);
  }

   else if(!msg.author.bot && msg.content.startsWith('#msg')) {
  const data = JSON.parse(fs.readFileSync(fileName));

  if(msg.content.split(" ")[1]){
    data["userdata"].message = msg.content.slice(5);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
    msg.channel.send(embed("Message updated."))
  }
  else
    msg.channel.send(embed("Please add using format #message [message]"))

  }

  else if (!msg.author.bot && msg.content.startsWith('#reset')) {
    const data = JSON.parse(fs.readFileSync(fileName));

    data["threads"].length=0;
    msg.channel.send(embed("Deleted all threads."))
    fs.writeFileSync(fileName, JSON.stringify(data, null, 4));

  }
  
  else if(!msg.author.bot && msg.content === '**cookie'){
    var data = fs.readFileSync(cookiePath, 'utf8');
    msg.channel.send(embed(data.toString()));
  }


  if(!msg.author.bot && msg.content == "#setup"){
    msg.reply(embed(`\

    \nThanks for using my auobumper. Please follow these instructions for setup:\n
    1. Make sure your VPS IP is whitelisted on the Sythe donor panel. If not,
    do so and wait an hour.
    2. Log on with your Sythe credentials using #login username:password
    3. To log onto 2fa (required to use autobumpers), wait until the 2fa code
    on your phone refreshes, then enter #2fa 234567 where the numbers are your code
    4. Use the command #validate to check if the 2fa worked then add a test thread and wait 30 seconds for it to bump.\n
    Contact me with any issues and I'll be glad to help. #help for other commands.

    `))
  }


  else if (!msg.author.bot && (msg.content == '#help' || msg.content == '#h')) {
    msg.reply(embed(`\

    \nView Threads: #view \
    \nAdd Thread: #add my_thread (comma separate multiple adds)\
    \nRemove: #rm thread_url\
    \nReset all threads: #reset\
    \nauthenticate: #auth <cookie>\
    \n#validate: check if 2fa login was successful
    \nSet Message: #msg my_message\
    \nView msg: #data \
    \n\nTo set up, login then add cookie. Update cookie each month.

    `))

  }


});

function embed(text){
    return new Discord.MessageEmbed().setFooter(text);
}

//Add Config File

client.login(config.key);