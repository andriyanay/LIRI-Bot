require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

var divider = "\n----------------------"

//-----------
// Searches 
//-----------
if (search === "movie-this") {
    console.log("Looking for Your Movie..." + divider);
    movieThis();

} else if (search === "spotify-this-song") {
    console.log("Looking for Your Song..." + divider);
    spotifyThis();

} else if (search === "concert-this") {
    console.log("Looking for Your Concert..." + divider);
    concertThis();

} else if(search === "do-what-it-says") {
    console.log("Looking for Random Things..." + divider);
    doWhat();
}

//------------------
// Search movie-this
//------------------
function movieThis() {
    var movie = term

    // if no movie was entered, the default movie that will show up will be 
    // "Mr. Nobody" 
    if (movie === "") {
        movie = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios
        .get(queryUrl)
        .then(function(response){
            // console.log(response.data)

            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Cast: " + response.data.Actors)
            console.log(divider)
        });

         fs.appendFile("log.txt", "\n" + search + "\n" + movie + divider, function(err) {
            if (err) throw err;
         });
};

//-------------------------
// Search spotify-this-song
//-------------------------
function spotifyThis() {
    var song = term;

    // if no song was entered, the default song that will show up will be 
    // "The Sign" by Ace of Base
    if (song === "") {
        song = "The Sign";
    }

    spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            // console.log(response);

            var songInfo = response.tracks.items[0];
            // console.log(songInfo)

            console.log("Song: " + songInfo.name)
            console.log("Artist: " + songInfo.artists[0].name)
            console.log("Album: " + songInfo.album.name)
            console.log("Link: " + songInfo.external_urls.spotify)

            console.log(divider)
        })
        .catch(function(err) {
            console.log(err);
        });

        fs.appendFile("log.txt", "\n" +  search + "\n" + song + divider, function(err) {
            if (err) throw err;
         });
};

//--------------------
// Search concert-this
//--------------------
function concertThis() {
    var artist = term
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios
        .get(queryURL)
        .then(function(response){

            var concertInfo = response.data
            // console.log(concertInfo)

             for (i = 0; i < concertInfo.length; i++) {

             console.log("Venue: " + concertInfo[i].venue.name)
             console.log("Location: " + concertInfo[i].venue.city)
             console.log("Concert Date: " + moment(concertInfo[i].datetime).format("MM/DD/YYYY"))

             console.log(divider)
             }
        });

         fs.appendFile("log.txt", "\n" + search + "\n" + artist + divider, function(err) {
             if (err) throw err;
          });
};

// ----------------------
// Search do-what-it-says
// ----------------------
// If you replace text in random.txt, you should receive different answers for searches
function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data){

      var randomFile = data.split(",");
      var grabName = randomFile[1].replace(/"/g,"");
      // console.log(grabName)

      if (randomFile[0] === "spotify-this-song") {
        spotifyThis(song = grabName);

      } else if (randomFile[0] === "movie-this") {
        movieThis(movie = grabName);

      } else if (randomFile[0] === "concert-this") {
        concertThis(artist = grabName);
      }; 

      if (error) {
        return console.log(error);
      }; 
       
    });
};

