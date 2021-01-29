
/************** Declare data and functions that are needed for all games ************/

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*  var firebaseConfig = {
    apiKey: "AIzaSyBUljn9iMj6_nSGkCDwz5q9UpJjLuhMLHc",
    authDomain: "criminal-game.firebaseapp.com",
    projectId: "criminal-game",
    storageBucket: "criminal-game.appspot.com",
    messagingSenderId: "432391429409",
    appId: "1:432391429409:web:c6d3774be9eb0c56037260",
    measurementId: "G-MKVM922TG1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();
 // db.settings({timestampsInSnapshots: true});
*/

/* Always create a canvas and a ctx */
let canvas = null;
let ctx = null;
let playerName = prompt("Please enter your name");
/* Always create an array that holds the default game gameObjects */
let gameObjects = [];

/*********** END OF Declare data and functions that are needed for all games *********/

/* Wait for all game assets, such as audio and images to load before starting the game */
/* The code below will work for both websites and Cordova mobile apps                  */
window.addEventListener("load", onAllAssetsLoaded);           // needed for websites
document.addEventListener("deviceready", onAllAssetsLoaded);  // needed for Cordova mobile apps

let game_is_loaded = false;
document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded()
{
    // Both "load" and "deviceready" will call this function.
    // The game_is_loaded flag is used to make sure that this function will only be executed once 
    if(game_is_loaded)
    {
        return;
    }
    game_is_loaded = true;

    /* hide the webpage loading message */
    document.getElementById('loadingMessage').style.visibility = "hidden";

    /* Initialise the canvas and associated variables */
    /* This code never changes                        */
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;


    playGame(); // Each game will include its own .js file, which will hold the game's palyGame() function
}


/* global functions */

/* Convert from degrees to radians */
Math.radians = function (degrees)
{
    return degrees * Math.PI / 180;
};