require('express')().listen(3001, () => {
    console.log("yay!")
});

var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var spotifyQuerier = new Spotify(keys);

var app = {
    spotify: {
        search: function (type, query) {
            spotifyQuerier.search({ type, query }).then(response => {
                response.tracks.items.forEach(({name, preview_url, album, artists}) => {
                    let artistNames = [];
                    console.log(`Song Name: ${name}`);
                    console.log(`Preview Link: ${preview_url}`);
                    console.log(`Album: ${album.name}`);
                    artists.forEach(({name}) => artistNames.push(name));
                    console.log(`Artists: ${artistNames.toString().replace(/\,/g, ", ")}`);
                    console.log("================================================")
                })
                app.goAgain();
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
                console.log(result.songName);
                this.search("track", result.songName);
            }).catch(err => {
                if (err) throw err;
            })
        }
    },
    bandsInTown: {
        search: function(){
            console.log("hit bands in town search");
            app.goAgain()
        }, 
        queryBand: function() {
            console.log("hit query bands function");
            this.search();
        }
    },
    omdb: { 
        search: function(){
          console.log("hit search omdb");
          app.goAgain(); 
        },
        queryMovie: function(){
            console.log("movie");
            this.search();
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
    },
    goAgain: function (){
        inquirer.prompt({
            type: "list",
            message: "would you like to go again",
            choices: ["yes","no"],
            name: "goAgain"
        }).then(({goAgain}) => {
            switch(goAgain){
                case "yes":
                this.start();
                break;
                case "no":
                    console.log("goodbye");
                    process.exit();
                break;
            }
        }).catch(error => {
            if (error) throw error;
        })
    }
}


app.start();



