const PropertiesReader = require('properties-reader');
console.log(PropertiesReader(`./bot.properties`).get('bot.token'));