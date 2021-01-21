
/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */

let backgroundImage = new Image();
backgroundImage.src = "img/egypt.jpg";

let bulletSound = document.createElement('audio');
bulletSound.src = 'audio/Arrow.mp3';

let giggleSound = new Audio();
giggleSound.src = 'audio/Giggle.mp3';

let explosionSound = new Audio();
explosionSound.src = 'audio/Cannon.mp3';

let skeletonImage = new Image();
skeletonImage.src = "img/skeleton_down.png";

let explosionImage = new Image();
explosionImage.src = "img/smoke.png";

let mumiaImage = new Image();
mumiaImage.src = "img/mumia.png";

let playerImage = new Image();
playerImage.src = "img/darkplayer.png";

let fireballImage = new Image();
fireballImage.src = "img/ninja_bullet.png";

const BACKGROUND = 0;
const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;
const STOPPED = 4;
const WIN_LOSE_MESSAGE = 5;
const POINTS_INFO = 6;
const BULLET_INFO = 7;
const MUMIA = 8;
const EXPLOSION = 9;
const player = 10;

/* Instead of using gameObject[],  gameObject variables */
let target = null;
let points = 0;  //no points to start

let fireballs = [];
let mumies = [];
let skeletons = [];
let numberOfSkeletons = 0;
let numberOfMumies = 0;
let numberOfBulletsFired = 0; // no bullets fired yet
let numberOfActiveBullets = 0;
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
    gameObjects[BULLET_INFO] = new BulletsControler(availableBullets, 1500);
   // gameObjects[EXPLOSION] = new Explosion(explosionImage, explosionSound, 100, 100, 100, 100);


    let mumia_delay = 200;
    let skeleton_delay = 3000;
    for(let i = 0; i<3; i++) {
        mumies[numberOfMumies] = new Mumia(mumiaImage,  Math.random() * (canvas.width - 60), 0, 85, 85, 50, mumia_delay );
        mumies[numberOfMumies].start();
        numberOfMumies++;
        mumia_delay+=4500;
    }
    for(let i = 0; i<4; i++) {
        skeletons[numberOfSkeletons] = new Skeleton(skeletonImage,  Math.random() * (canvas.width - 60), 0, 85, 85, 50, skeleton_delay );
        skeletons[numberOfSkeletons].start();
        numberOfSkeletons++;
        skeleton_delay+=5500;
    }

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
       else if (e.keyCode === 32  ) // space bar
        {
            fire();
        }
    });
    document.addEventListener("click", function ()
    {
        fire();
    });
}

function fire() {
    if ( gameObjects[BULLET_INFO].getAvailableBullets() >= 1)
    {
        fireballs[numberOfBulletsFired] = new Fireball(fireballImage, bulletSound, gameObjects[player].getCentreX());
        fireballs[numberOfBulletsFired].start();
        gameObjects[BULLET_INFO].bulletFired();
        numberOfBulletsFired++;
        numberOfActiveBullets++;
    }
}
