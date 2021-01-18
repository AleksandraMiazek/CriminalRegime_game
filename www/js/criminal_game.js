
/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */

let backgroundImage = new Image();
backgroundImage.src = "img/egypt.jpg";

let enemyImage = new Image();
enemyImage.src = "img/logo.png";

let playerImage = new Image();
playerImage.src = "img/darkplayer.png";

let fireballImage = new Image();
fireballImage.src = "img/fireball.png";

const BACKGROUND = 0;
const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;
const STOPPED = 4;
const WIN_LOSE_MESSAGE = 5;
const POINTS_INFO = 6;
const BULLET_INFO = 7;
/* Instead of using gameObject[], we can declare our own gameObject variables */
const player = 1; // we cannot initialise gameObjects yet, as they might require images that have not yet loaded
let target = null;
let points = 0;  //no points to start

let fireballs = [];
let enemies = [];
let numberOfEnemies = 0;
let numberOfBulletsFired = 0; // no bullets fired yet
let availableBullets = 5 ;  // available bullets at the beginning of the game
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
    gameObjects[player] = new Player(playerImage, canvas.width/2, canvas.height - 75);

    gameObjects[POINTS_INFO] = new ScorePoints(points, 800);
    gameObjects[BULLET_INFO] = new BulletsControl(availableBullets, 2000);

    let game = new CriminalCanvasGame();

    game.start();

    document.addEventListener("keydown", function (e)
    {
        if (e.keyCode === 37)  // left
        {
           gameObjects[player].setDirection(LEFT);
        }
        else if (e.keyCode === 38) // up
        {
          gameObjects[player].setDirection(UP);
        }
        else if (e.keyCode === 39) // right
        {
          gameObjects[player].setDirection(RIGHT);
        }
       /* else if (e.keyCode === 40) // down
        {
         gameObjects[player].setDirection(DOWN);
        } */
       else if (e.keyCode === 32) // space bar
        {
            //checkBullets();
            if ( gameObjects[BULLET_INFO].getAvailableBullets() >= 1)
            {
                fireballs[numberOfBulletsFired] = new Fireball(fireballImage, gameObjects[player].getCentreX());
                fireballs[numberOfBulletsFired].start();
                gameObjects[BULLET_INFO].bulletFired();
                numberOfBulletsFired++;
            }
        }
    });
}
