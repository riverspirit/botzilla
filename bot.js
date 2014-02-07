// jsx is just trolling

"use strict";

var config = require('./config').config;
var irc = require('irc');

var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels,
    realName: config.realName
});

bot.addListener('join', function (channel, who) {
    bot.say(channel, who + ', welcome to Mozilla Kerala!');
});

bot.addListener('message', function (from, to, text, message) {
    var channel = config.channels[0];
    var tokens = text.split(' ');
    if (tokens[0] && tokens[0] == '!bot') {
        if (tokens[1]) {
            var command = tokens[1];
            switch (command) {
                case 'whois': {
                    if (tokens[2]) {
                        var nick = tokens[2];
                        var userlist = require('./userlist');
                        if (userlist[nick]) {
                            bot.say(channel, nick + ' is ' + userlist[nick].name + ' and ' + userlist[nick].tooltype + ' says "' + userlist[nick].message + '"');
                        } else {
                            bot.say(channel, 'Sorry! I don\'t know who that is :-(');
                        }
                    } else {
                        bot.say(channel, 'Invalid message format. Try "!bot whois <nickname>');
                    }
                    break;
                }

                case 'fuck': {
                    if (tokens[2]) {
                        if (tokens[2] == 'jsx') {
                            bot.say(channel, 'Go fuck yourself. Nobody fucks jsx ¯\\_(ツ)_/ ¯');
                        } else {
                            bot.say(channel, tokens[2] + ' has been fucked!');
                        }
                        break;
                    }
                }

                case 'help': {
                    if (!tokens[2]) { // No topic mentioned for help, so show general help response
                        var response = "Botzilla is the official resident troll at Mozilla Kerala\n\n";
                        response += "You can run botzilla commands by typing !bot command\n";
                        response += "The following are the available botzilla commands\n \n";
                        response += "     WHOIS    Get information about a Mozilla Kerala member.\n";
                        bot.say(channel, response);
                    }
                    break;
                }

                default: {
                    bot.say(channel, 'Invalid command. Type "!bot help" for list of available commands.');
                }

            }
        }
    }
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});

console.log(config.botName + ' started on ' + new Date());