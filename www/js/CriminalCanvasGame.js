/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.                                                   */
/* The CanvasGame class is responsible for rendering all of the gameObjects and other game graphics on the canvas.         */
/* If you want to implement collision detection in your game, then you MUST overwrite the collisionDetection() method. */
/* This class will usually not change.                                                                                 */


class CriminalCanvasGame extends CanvasGame
{
    constructor()
    {
        super();
    }
     collisionDetection()
    {
        for (let i = 0; i < fireballs.length; i++)
        {
        //alert("mumia[i] x = "+mumies[i].getX());
        //alert(gameObjects[player].getCentreX());
    //   alert( fireballs[i].getCentreX());
            for(let j = 0; j < (mumies.length); j++)
            {
               if(mumies[j].pointIsInsideBoundingRectangle(fireballs[i].getCentreX(), fireballs[i].getCentreY()))
                {
                    let expX = fireballs[i].getCentreX();
                    let expY = fireballs[i].getCentreY();
                    gameObjects[EXPLOSION] = new Explosion(explosionImage, giggleSound, expX, expY, 100, 10);
                    gameObjects[EXPLOSION].start();
                    mumies[j].setX(Math.random() * (canvas.width - 60));
                    mumies[j].setY(-100);
                    fireballs[i].setY(-canvas.height); //throw out of play area, automatically made not active bullet
                    navigator.vibrate(100);
                }

            }
            for(let j = 0; j < (skeletons.length); j++)
            {
               if(skeletons[j].pointIsInsideBoundingRectangle(fireballs[i].getCentreX(), fireballs[i].getCentreY()))
                {
                    if(skeletons[j].getHealth() > 1) {
                        skeletons[j].reduceHealth();
                        fireballs[i].setY(-canvas.height); //throw out of play area, automatically made not active bullet
                    }
                    else if(skeletons[j].getHealth() === 1)  //the enemy dies
                    {
                        let expX = fireballs[i].getCentreX();
                        let expY = fireballs[i].getCentreY();
                        gameObjects[EXPLOSION] = new Explosion(explosionImage, explosionSound, expX, expY, 100, 10);
                        gameObjects[EXPLOSION].start();
                        skeletons[j].setX(Math.random() * (canvas.width - 60));
                        skeletons[j].setY(-100);
                            if(gameObjects[POINTS_INFO].GetPoints() < 2000) {
                                 skeletons[j].setHealth(2);
                            } else if(gameObjects[POINTS_INFO].GetPoints() > 2000) {
                               skeletons[j].setHealth(3);
                                 //skeletons are stronger !!
                            }
                        fireballs[i].setY(-canvas.height); //throw out of play area, automatically made not active bullet
                        navigator.vibrate(100);
                    }
                }

            }

         /*   if ( gameObjects[player].pointIsInsideBoundingRectangle(mumies[i].getX(), mumies[i].getY()) ) //enemy touch player
            {
                //alert("mumia touch player COLISION DETECTION FUNCTION ALERT");
            } */
        }

    }
    render()
    {
        super.render();

        for (let i = 0; i < fireballs.length; i++)
        {
            fireballs[i].render();
        }
        for (let j = 0; j < mumies.length; j++)
        {
            mumies[j].render();
           // alert("mumia[i] x = "+mumies[i].getX());
        }
        for (let k = 0; k < skeletons.length; k++)
        {
            skeletons[k].render();
        }

    }
}