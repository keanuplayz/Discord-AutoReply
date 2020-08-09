var d = function d() {
    return new Date();
}
const Discord = require("discord.js");
const fs = require('fs');
const config = require("./config.json")
const os = require('os')
const PREFIX = "%!";
var autoReply = false

var bot = new Discord.Client();

function botstartupmode() {
    try {
        var TOKEN = config.token;
        bot.login(TOKEN)
    } catch (err) {
        console.log(LOGWARN + "Error logging in: " + err)
    }
}

bot.on("ready", async function () {
    console.log(" ")
    console.log("*---------------------*")
    console.log("Started AutoReply for " + bot.user.tag)
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
    
    const guildornot = msg.channel.type === 'text' ? `[${msg.guild.name}]` : "[DM]";
    
    if (guildornot === "[DM]" && autoReply == true) {
        if (msg.author.tag !== bot.user.tag) {
            const jsonConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));
            var replymsg = jsonConfig.message;
            msg.channel.send(replymsg);
        }
        if (msg.author.tag === bot.user.tag) {
            if (msg.content.startsWith(`${PREFIX}off`)) {
                autoReply = false;
                msg.channel.send(`Turned AutoReply off.`);
            }
        }
    }

    if (msg.author.tag !== bot.user.tag) return;

    if (msg.content.startsWith(`${PREFIX}test`)) {
        msg.edit(msg.author.id);
    }

    if (msg.content.startsWith(`${PREFIX}on`)) {
        autoReply = true;
        msg.channel.send(`Turned AutoReply on.`);
    }

    if (msg.content.startsWith(`${PREFIX}value`)) {
        if (autoReply == true) {
            msg.channel.send(`AutoReply is turned on.`);
        } else {
            msg.channel.send(`AutoReply is turned off.`);
        }
    }

    if (msg.content.startsWith(`${PREFIX}setmsg`)) {
        const message = msg.content.replace(`${PREFIX}setmsg `, '');
        const jsonConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));
        jsonConfig.message = message;
        fs.writeFile("./config.json", JSON.stringify(jsonConfig), err => {
            if (err) console.log(err);
        });
        msg.channel.send(`Reply message changed to:\n\`${message}\``);
    }

});

botstartupmode();