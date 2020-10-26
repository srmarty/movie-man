const Discord = require('discord.js');
const client = new Discord.Client();


// fields

// watch history array prefilled with movies seen at the time of !watchhistory implementation (10/25/2020)
// TODO: create file for this so bot can automatically update it
var watchHistoryList = ['The B in Apartment 23',
                    'Attack on Titan',
                    'Twilight',
                    'New Moon',
                    'Breaking Dawn Part 1',
                    'Breaking Dawn Part 2',
                    'Uncut Gems',
                    'Gone Girl',
                    'Moon',
                    'American Murder: The Family Next Door',
                    'Knives Out',
                    'Borat',
                    'Warm Bodies',
                    'Borat 2'];

// movie queue array is filled with the movie_queue.txt data
// queue methods for JavaScript:
//    shift() removes the first array elements and 'shifts' all other elements - returns the first element
//    push() adds a new element to an array at the end - returns the new array length
var movieQueue = [];
fillMovieQueueArray();


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
    msg.reply('**!mmcommands** - lists current commands' +
          '\n**!getdown** - get down to the funky sound **[coming soon!]**' +
          '\n**!reviewscale** - lists the review scale for movie rating' +
          '\n**!moviequeue** - lists the current movie queue **[coming soon!]**' +
          '\n**!addtoqueue** - adds a movie to the queue' +
          '\n**!removefromqueue** - removes a movie from the queue' +
          '\n**!markaswatched** - marks a movie as watched, removing it from the movie queue, and adding it to the watch history' +
          '\n**!watchhistory** - lists movies marked as watched' +
          '\n**!moviereviews** - lists movies and their reviews, if they have any **[coming soon!]**' +
          '\n**!addreview-[movie]** - add a review to the given movie. **(I reccommend listing the movies in the queue before running this command, as the names must match exactly) [coming one day!]**' +
          '\n**!editreview-[movie]** - edit the review of the given movie. **(I reccommend listing the movies in the queue before running this command, as the names must match exactly) [coming one day!]**' +
          '\n**!deletereview-[movie]** - delete the review of the given movie. **(I recommend listing the movies in teh queue before running this command, as the names must match exactly) [coming one day!]**');
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
// TODO: add message variations
client.on('message', msg => {
  if (msg.content === '!moviequeue') {
    var output = '\n';
    for (let movie in movieQueue) {
      output += movieQueue[movie] + '\n';
    }
    msg.reply('**Current Movie Queue**: \n' + output).catch(console.error);
  }
});

// Movie Man will tell Tanner to shut up any time he sends a message
// client.on('message', msg => {
//   if (msg.author.username === 'TheSonOfPabloEscobar') {
//     msg.reply('shut up tanner');
//   }
// });

client.on('message', msg => {
  if (msg.content.includes('!addtoqueue')) {
      let movieName = msg.content.substring(msg.content.indexOf('-') + 1, msg.content.length);

      // add the movie to movie_queue.txt
      addMovieToQueue(movieName, msg);
      // recreate the movie queue
      fillMovieQueueArray();

    }
});

client.on('message', msg => {
  if (msg.content.includes('!removefromqueue')) {
    let movieName = msg.content.substring(msg.content.indexOf('-') + 1, msg.content.length);
    // remove the movie from movie_queue.txt
    // TODO: implement this function
    removeMovieFromQueue(movieName, msg);
    // recreate the movie queue
    fillMovieQueueArray();
  }
})

// lists the watch history
// TODO: add message variations
client.on('message', msg => {
  if (msg.content === '!watchhistory') {
    var output = '\n';
    for (let movie in watchHistoryList) {
      output += watchHistoryList[movie] + '\n';
    }
    msg.reply('**Watch History**: \n' + output).catch(console.error);
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


// FUNCTIONS
function fillMovieQueueArray () {
  movieQueue = [];
  var fs = require('fs');
  var array = fs.readFileSync('movie_queue.txt').toString().split("\n");
  for(i in array) {
      movieQueue.push(array[i]);
      console.log(movieQueue[i]);
  }
}


// adds movieName to the movie queue, and sends a message
// if the movieName already exists in the movie_queue.txt, the movie will not be added
// and Movie Man will reply telling the user the news
// if the movieName does not already exist in the movie queue, it will be appended to
// movie_queue.txt and Movie Man will send a message
function addMovieToQueue (movieName, msg) {
  var alreadyInQueue = false;
  // opening movie_queue.txt to READ the movie queue to make sure this movie is not a duplicate
  var fs = require("fs");
  try {
    let data = fs.readFileSync('movie_queue.txt')
    if (data.toString().toUpperCase().includes(movieName.toUpperCase())) {
      alreadyInQueue = true;
      msg.reply('**' + movieName + '** already exists in the Movie Queue. If this is an error, talk to Sarah');
    }
  } catch (err) {
    return console.error(err);
  }
  // only add movie to the queue if it is NOT already in the queue
  if (!alreadyInQueue) {
    // opening movie_queue.txt to WRITE the new movie to the queue
    fs.appendFileSync('movie_queue.txt', movieName + '\n', function(err) {
      if (err) {
        return console.error(err);
      }
    })
    msg.reply('**' + movieName + '** has been added to the Movie Queue!');
  }
}

// removes a movie from movie_queue.txt
// this function will convert the file data into a string, remove the requested movie,
// and then overwrite the movie_queue.txt
// TODO: implement lol
function removeMovieFromQueue (movieName, msg) {
  //TODO: implement:
}


client.login('NzY2NDg4MTQxMTI4NjYzMDQx.X4kFtQ.TpoShd1H6jxwGO_ffITXXTwqzzk');
