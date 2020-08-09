const inquirer = require('inquirer');
const fs = require('fs');
let baseConfig = fs.readFileSync("./config_base.txt", "utf8");

let prompts = [{
    type: "input",
    name: "token",
    message: "Please enter your user token."
}, {
    type: "input",
    name: "message",
    message: "Please enter your AutoReply message."
}];

(async function() {
    console.log("Setting up AutoReply configuration...");
    const answers = await inquirer.prompt(prompts);
    baseConfig = baseConfig.replace("{{token}}", answers.token)
        .replace("{{message}}", answers.message);
    fs.writeFileSync("./config.json", baseConfig);
    console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
    console.log("You can change the reply message with %!setmsg <message>");
    console.log("Configuration has been written, enjoy!");
})();