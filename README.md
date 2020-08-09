# Discord-AutoReply

Node.JS application for automatically replying to messages.

## Installation

To install, just follow these simple steps.

1. Clone or download this repository.
2. Run `npm i` to install all project dependencies.
3. Run `node setup.js` to get the configuration set up.
4. After configuring the app, run `node index.js` to start.

## Usage

After starting the app, you can send `%!on` to enable AutoReply or `%!off` to disable AutoReply.

If someone messages you via DM after turning on AutoReply, your account will automatically send the message you configured in the setup.

But what if you wanted to change the message? That can be done easily with `%!setmsg`. Use `%!setmsg <msg>` to set the AutoReply message.

To check if AutoReply is turned on or off, run `%!value`.
