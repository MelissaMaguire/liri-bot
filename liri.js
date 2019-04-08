var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var spotifyQuerier = new Spotify(keys);

var app = {
    spotify: {
        search: function (type, query) {
            spotifyQuerier.search({ type, query }).then(song => {
                console.log(song);
            }).catch(err => {
                if (err) throw err;
            })
        },
        querySong: function(){
            inquirer.prompt({
                type: "input",
                name: "songName",
                message: "please input a song name."
            }).then(result => {
                console.log(result.songName)
                this.search("track", result.songName)
            }).catch(err => {
                if (err) throw err;
            })
        }
    },
    bandsInTown: {
        search: function(){
            console.log("hit bands in town search");
        }, 
        queryBand: function() {
            console.log("hit query bands function");
        }
    },
    omdb: {
        queryMovie: function(){
            console.log("movie");
        }
    },
    question: function () {
        inquirer.prompt({
            type: "list",
            name: "queryType",
            choices: ["concert-this", "spotify-this", "movie-this", "do-what-it-says"]
        }).then(answers => {
            console.log(answers.queryType);
            switch(answers.queryType){
                case 'spotify-this':
                    this.spotify.querySong();
                break;
                case 'concert-this':
                    this.bandsInTown.queryBand();
                break;
                case 'movie-this':
                    this.omdb.queryMovie();
                break;
            }
        }).catch(error => {
            if (error) throw error;
        })
    },
    start: function () {
        inquirer.prompt({
            type: "input",
            message: "welcome to liri,press enter to get started.",
            name: "start"
        }).then(answers => {
            this.question();
        }).catch(error => {
            if (error) throw error;
        })
    }
}


app.start();



