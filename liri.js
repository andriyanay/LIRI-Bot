require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

// Searches 
if (search === "movie-this") {
    console.log("Movie: \n____________________________");
    movieThis();

} else if (search === "spotify-this-song") {
    console.log("Song: \n____________________________");
    spotifyThis();

} else if (search === "concert-this") {
    console.log("Concert: \n____________________________");
    concertThis();

} else if(search === "do-what-it-says") {
    console.log("Randomness: \n____________________________");
    doWhat();
}

// Search movie-this
function movieThis() {
    var movie = term
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios
        .get(queryUrl)
        .then(function(response){
            // console.log(response.data)

            var movieTitle = response.data.Title;
            console.log("Title: " + movieTitle)

            var movieYear = response.data.Year;
            console.log("Year: " + movieYear)

            var movieImdb = response.data.imdbRating;
            console.log("IMDB Rating: " + movieImdb)

            var movieRating = response.data.Ratings[1].Value;
            console.log("Rotten Tomato Rating: " + movieRating)

            var movieCountry = response.data.Country;
            console.log("Country: " + movieCountry)

            var movieLanguage = response.data.Language;
            console.log("Language: " + movieLanguage)

            var moviePlot = response.data.Plot;
            console.log("Plot: " + moviePlot)

            var movieCast = response.data.Actors;
            console.log("Cast: " + movieCast)
        });
};

// Search spotify-this-song
function spotifyThis() {
    var song = term;

    spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            // console.log(response);

            var songInfo = response.tracks.items[0];
            // console.log(songInfo)

            var songName = songInfo.name
            console.log("Song: " + songName)

            var songArtist = songInfo.artists[0].name
            console.log("Artist: " + songArtist)

            var songAlbum = songInfo.album.name
            console.log("Album: " + songAlbum)

            var songLink = songInfo.external_urls.spotify
            console.log("Link: " + songLink)
        })
        .catch(function(err) {
            console.log(err);
        });
};

// Search concert-this
function concertThis() {
    var artist = term
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios
        .get(queryURL)
        .then(function(response){

            var concertInfo = response.data
            // console.log(concertInfo)

            var venue = concertInfo[0].venue.name;
            console.log("Venue: " + venue)

            var venueLoc = concertInfo[0].venue.city;
            console.log("Venue Location: " + venueLoc)

            var venueDate = concertInfo[0].datetime;
            venueDate = moment(venueDate).format("dddd, MMMM Do YYYY, h:mm A")
            console.log("Venue Date: " + venueDate)
        });
};

// Search do-what-it-says
// If you replace text in random.txt, you should receive different answers for searches
function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data){

      var randomFile = data.split(",");
      var grabName = randomFile[1].replace(/"/g,"");
      // console.log(grabName)

      if (randomFile[0] === "spotify-this-song") {
        spotifyThis(term = grabName);

      } else if (randomFile[0] === "movie-this") {
        movieThis(term = grabName);

      } else if (randomFile[0] === "concert-this") {
        concertThis(term = grabName);
      }; 

      if (error) {
        console.log(error);
      }; 
       
    });
};

// If no searches were entered, the default information shown on the page should be as follows
// if (!term) {
// term = "Mr. Nobody";
// }
