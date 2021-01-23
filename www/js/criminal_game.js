
/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */

let soundtruck = new Audio();
soundtruck.src = 'audio/monkeys-spinning.mp3';
soundtruck.loop = true;
soundtruck.volume = 0.75;
/* Monkeys Spinning Monkeys by Kevin MacLeod
Link: https://incompetech.filmmusic.io/song/4071-monkeys-spinning-monkeys
License: https://filmmusic.io/standard-license */

let endSound = new Audio();
endSound.src = 'audio/meatball-parade.mp3';
/*Meatball Parade by Kevin MacLeod
Link: https://incompetech.filmmusic.io/song/4993-meatball-parade
License: https://filmmusic.io/standard-license */

let backgroundImage = new Image();
backgroundImage.src = "img/egypt.jpg";

let backgroundNightImage = new Image();
backgroundNightImage.src = "img/egypt_night.png";

let backgroundJungleImage = new Image();
backgroundJungleImage.src = "img/jungle.png";

let nothingImg = new Image();
nothingImg.src = "img/nothing.png";

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
const POINTS_INFO = 5;
const BULLET_INFO = 6;
const MUMIA = 7;
const EXPLOSION = 8;
const player = 9;

const LOSE_MESSAGE = 10;
const GAME_OVER_INFO_1 = 11;
const GAME_OVER_INFO_2 = 12;
const GAME_OVER_INFO_3 = 13;
const GAME_OVER_INFO_4 = 14;
const GAME_OVER_INFO_5 = 15;

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
let killedMumies = 0;
let killedSkeletons = 0;
let killer_mumia = null;
let killer_skeleton = null;

let dayTimer;
let day = true;
let night = false;

let acl = new Accelerometer({frequency: 20});
let left_move = false;
let right_move = false;
let up_move = false;
/******************* END OF Declare game specific data and functions *****************/


function playGame()
{
    soundtruck.play();

    gameObjects[BACKGROUND] = new ScrollingBackgroundImage(backgroundImage, backgroundNightImage, backgroundJungleImage, 25);

    gameObjects[player] = new Player(playerImage, canvas.width/2, canvas.height - 75);
    gameObjects[POINTS_INFO] = new ScorePoints(points, 800);
    gameObjects[BULLET_INFO] = new BulletsControler(availableBullets, 1500);

    let mumia_delay = 200;
    let skeleton_delay = 3000;
    for(let i = 0; i<4; i++) {
        mumies[numberOfMumies] = new Mumia(mumiaImage, nothingImg, Math.random() * (canvas.width - 60), -90, 85, 85, 50, mumia_delay );
        mumies[numberOfMumies].start();
        numberOfMumies++;
        mumia_delay+=4500;
    }
    for(let i = 0; i<3; i++) {
        skeletons[numberOfSkeletons] = new Skeleton(skeletonImage, nothingImg, Math.random() * (canvas.width - 60), -90, 85, 85, 50, skeleton_delay );
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
           soundtruck.play();
        }
        else if (e.keyCode === 38) // up
        {
          gameObjects[player].setDirection(UP);
          soundtruck.play();
        }
        else if (e.keyCode === 39) // right
        {
          gameObjects[player].setDirection(RIGHT);
          soundtruck.play();
        }
       /* else if (e.keyCode === 40) // down
        {
         gameObjects[player].setDirection(DOWN);
        } */
       else if (e.keyCode === 32  ) // space bar
        {
            fire();
            soundtruck.play();
        }
    });
    document.addEventListener("click", function ()
    {
        fire();
        soundtruck.play();
    });

    acl.addEventListener('reading', () => {
        var move = 0;
        var threshold = 0.5;

        if (acl.x > threshold) {
            move = 0; // left
        }
        else if (acl.x < -threshold) {
            move = 1; // right
        }
        else {
            move = 2; // up
        }

        if (move == 0 && left_move === false) {
            left_move = true;
            right_move = false;
            gameObjects[player].setDirection(LEFT);
        }
        else if (move == 1 && right_move === false) {
            left_move = false;
            right_move = true;
            gameObjects[player].setDirection(RIGHT);
        }
        else if (move == 2) {
            if (left_move || right_move) {
                gameObjects[player].setDirection(UP);
            }

            left_move = false;
            right_move = false;
        }
    });
    acl.start();

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
function gameOver() {
    navigator.vibrate(130);
    soundtruck.pause();
    endSound.play();
    endSound.loop = false;

    /* stop all gameObjects from animating */
    for (let i = 0; i < fireballs.length; i++)
    {
        fireballs[i].stop();
    }
     for (let j = 0; j < mumies.length; j++)
    {
        mumies[j].stop();
        mumies[j].setNothingImg();
      /*  if(j != killer_mumia) {
            delete mumies[j];
        } */
    }
    for (let k = 0; k < skeletons.length; k++)
    {
        skeletons[k].stop();
        skeletons[k].setNothingImg();
      /*  if (k != killer_skeleton) {
            delete skeletons[k];
        } */
    }
    gameObjects[player].setDirection(DOWN);
    gameObjects[BACKGROUND].stop();
    gameObjects[POINTS_INFO].stop();
    gameObjects[BULLET_INFO].stop();

    gameObjects[LOSE_MESSAGE] = new StaticText("GAME OVER!", canvas.width/4, 200, "Cambria", 36, "red");
     gameObjects[10].start();
    gameObjects[GAME_OVER_INFO_1] = new StaticText("POINTS: " + gameObjects[POINTS_INFO].GetPoints(), canvas.width/3, 250, "Cambria", 26, "white");
    gameObjects[11].start();
    gameObjects[GAME_OVER_INFO_2] = new StaticText("Fired bullets: " + numberOfBulletsFired, canvas.width/3, 300, "Cambria", 20, "white");
    gameObjects[12].start();
    gameObjects[GAME_OVER_INFO_3] = new StaticText("Killed enemies: " + (killedMumies+killedSkeletons), canvas.width/3, 330, "Cambria", 20, "white");
    gameObjects[13].start();
    gameObjects[GAME_OVER_INFO_4] = new StaticText("Mumies: " + killedMumies, canvas.width/3, 360, "Cambria", 20, "WhiteSmoke");
    gameObjects[14].start();
    gameObjects[GAME_OVER_INFO_5] = new StaticText("Skeletons: " + killedSkeletons, canvas.width/3, 390, "Cambria", 20, "WhiteSmoke");
    gameObjects[15].start();
  /*  for(let e = 10; e <= 15; e++) {
        gameObjects[e].start();
    } */

}