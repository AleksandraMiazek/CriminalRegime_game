/***************************************************************************/
/* This file is the same for every game.                                   */
/* DO NOT EDIT THIS FILE                                                   */
/***************************************************************************/


/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.       */
/* This file holds the global variables that will be used in all games.    */
/* This file always calls the playGame function().                         */
/* It also holds game specific code, which will be different for each game */

/************** Declare data and functions that are needed for all games ************/

/* Always create a canvas and a ctx */
let canvas = null;
let ctx = null;

/* Always create an array that holds the default game gameObjects */
let gameObjects = [];

/*********** END OF Declare data and functions that are needed for all games *********/

/* Wait for all game assets, such as audio and images to load before starting the game */
/* The code below will work for both websites and Cordova mobile apps                  */
window.addEventListener("load", onAllAssetsLoaded);           // needed for websites
document.addEventListener("deviceready", onAllAssetsLoaded);  // needed for Cordova mobile apps
/*document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

}*/

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

 // accelerometr ----------------------------------------------------------
      document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
          document.getElementById("watchAcceleration").addEventListener(
             "click", watchAcceleration);

            //vibration test--------------
             document.getElementById("vibration").addEventListener("click", vibration);
  //---------------------------------------------------------------

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