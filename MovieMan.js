const Discord = require('discord.js');
const client = new Discord.Client();



// The ready event is vital, it means that only AFTER this will your bot start reacting to
// information recieved from discord
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });


 // lists the commands available for users
 // so far includes
 // !MMCommands/!MMcommands/!Mmcommands/!mmcommands - lists current commands
 // !getdown - get down to the funky sound **[coming soon!]**
 // !moviequeue - lists the current movie queue **[coming soon!]**
 // !moviereviews - lists movies and their reviews, if they have any **[coming soon!]**
 // !addreview-[movie] - add a review to the given movie.
 // !deletereview-[movie] - delete the review of the given movie.
 client.on('message', msg => {
  if (msg.content === '!MMcommands' || msg.content === '!mmcommands' || msg.content === '!MMCommands' || msg.content === '!Mmcommands') {
    msg.reply('!mmcommands - lists current commands' +
          '\n!getdown - get down to the funky sound **[coming soon!]**' +
          '\n!reviewscale - lists the review scale for movie rating' +
          '\n!moviequeue - lists the current movie queue **[coming soon!]**' +
          '\n!moviereviews - lists movies and their reviews, if they have any **[coming soon!]**' +
          '\n!addreview-[movie] - add a review to the given movie. **(I reccommend listing the movies in the queue before running this command, as the names must match exactly) [coming one day!]**' +
          '\n!editreview-[movie] - edit the review of the given movie. **(I reccommend listing the movies in the queue before running this command, as the names must match exactly) [coming one day!]**' +
          '\n!deletereview-[movie] - delete the review of the given movie. **(I recommend listing the movies in teh queue before running this command, as the names must match exactly) [coming one day!]**');
  }
});


client.on('message', msg => {
  if (msg.content === '!reviewscale') {
    msg.reply('**MOVIE REVIEW SCALE**' +
              '\n\n1 - movie is poopoo :poop:' +
              '\n2 - movie is garbage, but endearing, cute, riffable' +
              '\n3 - movie is so bad it\'s average' +
              '\n4 - movie is mediocre - it\'s so bad, it\'s good' +
              '\n5 - since 5 is in the middle of 1 and 10, a 5 means the movie is completely average' +
              '\n6 - movie is above average. Not great, but passable' +
              '\n7 - movie is solidly good. Not great, not just passable, good' +
              '\n8 - movie is pretty good!! It is good' +
              '\n9 - movie is almost perfect, it\s riffable, it\'s entertaining, it\'s good!!! IT\'S GREAT!!!' +
              '\n10 - MOVIE IS GREAT AND FANTASTIC AND PERFECT!!!');
  }
});

// brings the bot into the VC of the person who called it and plays a youtube audio of the
// Get Down To The Funky Sound Vine.
// TODO: add message capitilization variations
client.on('message', msg => {
  if (msg.content === '!getdown') {
    const connection = msg.member.voice.channel;
      connection.join().then(function(connection){ play('https://www.youtube.com/watch?v=iVpmBPStw0Y') }).catch((error) => {
    assert.isNotOk(error,'Promise error');
  });;
      //connection.leave();
    }
    //const dispatcher = connection.playFile('./getdown.mp3');

});

// lists the current movie queue
// TODO: need to create a movie queue field somewhere ...
// TODO: add message variations
client.on('message', msg => {
  if (msg.content === '!moviequeue') {
    msg.reply('**[coming soon!]**');
  }
});

// lists the movies and their reviews, if they have any
// TODO: need to create a movie object that will hold the movie review
// movie will have a title and a review
// TODO: find something that will show where the movie can be streamed from??? is there any API -- very future task
client.on('message', msg => {
  if (msg.content === '!moviereviews') {
    msg.reply('**[coming one day!]**');
  }
});

// Adds a review to the given movie
client.on('message', msg => {
  if (msg.content === '!addreview') {   // TODO: need to find a way to allow a command line argument from discord  --- can actually just have bot ask through "conversation"
    msg.reply('**[coming one day!]**');
  }
});

// edits the review of the given movie
client.on('message', msg => {
  if (msg.content === '!editreview') {   // TODO: need to find a way to allow a command line argument from discord
    msg.reply('**[coming one day!]**');
  }
});

// deletes the review of the given movie
client.on('message', msg => {
  if (msg.content === '!deletereview') {   // TODO: need to find a way to allow a command line argument from discord
    msg.reply('**[coming one day!]**');
  }
});





client.login('NzY2NDg4MTQxMTI4NjYzMDQx.X4kFtQ.TpoShd1H6jxwGO_ffITXXTwqzzk');
