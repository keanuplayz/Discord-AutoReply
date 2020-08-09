var d = function d() { return new Date(); }
var bootstart = d()
const configpath = "./bin/config.json";
const Discord = require("discord.js");
const config = require(configpath);
const tokenpath = require("./token.json")
const os = require('os')
const PREFIX = "%!";
var autoReply = false

var bot = new Discord.Client();

function botstartupmode() {
    try {
        if (config.loginmode === "normal") {
            var TOKEN = tokenpath.selfbottoken;
            bot.login(TOKEN)
        } else if (config.loginmode === "test") {
            var TOKEN = tokenpath.selfbottesttoken;
            bot.login(TOKEN)
        } else {
            console.log(LOGWARN + "Error logging in.")
            return;
        }
    } catch(err) {
        console.log(LOGWARN + "Error logging in: " + err)
    }
}

bot.on("ready", async function() {
    console.log(" ")
    console.log("*---------------------*")
    console.log("Started diekebot for " + bot.user.tag + " (" + config.status + ").")
    if (os.platform == "linux") console.log("I'm running on Linux...") 
    if (os.platform == "win32") console.log("I'm running on Windows...")
    console.log("Time: " + d())
    bot.user.setStatus("online");
});

bot.on('message', async (msg) => {
    // const guildTag =
    //   msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
    // const channelTag =
    //   msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
    // console.log(
    //   `${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`,
    // );

    if (msg.author.tag !== bot.user.tag) return;
    // if (msg.guild === null) return;
    // if (autoReply === true) {
    //     msg.reply('unavailable.')
    // }

    if (msg.content.startsWith(`${PREFIX}test`)) {
        msg.edit(msg.author.id);
    }

    if (msg.content.startsWith(`${PREFIX}on`)) {
        autoReply = true;
        msg.channel.send(`Turned AutoReply on.`);
    }
    
    if (msg.content.startsWith(`${PREFIX}off`)) {
        autoReply = false;
        msg.channel.send(`Turned AutoReply off.`);
    }

    if (msg.content.startsWith(`${PREFIX}value`)) {
        if (autoReply == true){
            msg.channel.send(`AutoReply is turned on.`);
        }
        else {
            msg.channel.send(`AutoReply is turned off.`);
        }
    }

});

botstartupmode();