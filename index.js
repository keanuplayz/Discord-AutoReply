var d = function d() { return new Date(); }
var bootstart = d()
const configpath = "./bin/config.json";
const Discord = require("discord.js");
const config = require(configpath);
const tokenpath = require("./token.json")
const os = require('os')
const PREFIX = "%!";

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
});

botstartupmode();