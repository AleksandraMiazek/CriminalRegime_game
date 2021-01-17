
/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */

let backgroundImage = new Image();
backgroundImage.src = "img/egypt.jpg";

let enemy = new Image();
enemy.src = "images/skeleton.png";

let fireballImage = new Image();
fireballImage.src = "images/fireball.png";

const BACKGROUND = 0;
const WIN_LOSE_MESSAGE = 1;

/* Instead of using gameObject[], we can declare our own gameObject variables */
let player = null; // we cannot initialise gameObjects yet, as they might require images that have not yet loaded
let target = null;

let fireballs = [];
let numberOfBulletsFired = 0; // no bullets fired yet
/******************* END OF Declare game specific data and functions *****************/







/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame()
{
    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* Specifically, this function will:                                */
    /* 1. initialise the canvas and associated variables                */
    /* 2. create the various game gameObjects,                   */
    /* 3. store the gameObjects in an array                      */
    /* 4. create a new Game to display the gameObjects           */
    /* 5. start the Game                                                */



    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

    gameObjects[BACKGROUND] = new ScrollingBackgroundImage(backgroundImage, 25);
  //  player = new Bat(0, canvas.height - 10, 125);
  // target = new Target(logImage, 100, 0, 100);
    /* END OF game specific code. */


    /* Always create a game that uses the gameObject array */
    let game = new CriminalCanvasGame();

    /* Always play the game */
    game.start();


    /* If they are needed, then include any game-specific mouse and keyboard listners */
 /*    document.addEventListener("keydown", function (e)
    {
        var stepSize = 10;

        if (e.keyCode === 37)  // left
        {
            player.changeX(-stepSize);
        }
        else if (e.keyCode === 39) // right
        {
            player.changeX(stepSize);
        }
       else if (e.keyCode === 32) // space bar
        {
            fireballs[numberOfBulletsFired] = new Fireball(fireballImage, bat.getCentreX());
            fireballs[numberOfBulletsFired].start();
            numberOfBulletsFired++;
            bat.setWidth(bat.getWidth() + 10);
        }
    });*/
}