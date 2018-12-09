# LIRI-Bot

The purpose of this project was to create a LIRI bot using Node JS. LIRI is a command line app that takes in parameters and returns data based on one of four commands:

- spotify-this-song
- movie-this
- concert-this
- do-what-it-says

What each command does:
- spotify-this-song - displays the following information about the requested song:
     - The song's name
     - Artist(s)
     - The album that the song is from 
     - A preview link of the song from Spotify
If the input was not provided, the app will default to "The Sign" by Ace of Base.

- movie-this - displays the following information about the requested movie:
    - Title of the movie
    - Year the movie came out
    - IMDB Rating of the movie
    - Rotten Tomatoes Rating of the movie
    - Country where the movie was produced
    - Language of the movie
    - Plot of the movie
    - Actors in the movie
If the input was not provided, the app will default to "Mr. Nobody".

- concert-this - displays the following information about the concert of the requested artist:
    - Name of the venue
    - Venue location
    - Date of the Event 

- do-what-it-says - takes the input of the random.txt file. 
Depending on the text in the file, the command can run either concert-this, spotify-this-song, or movie-this functions. 





