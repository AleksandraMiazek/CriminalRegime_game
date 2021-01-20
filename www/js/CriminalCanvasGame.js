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
                    mumies[j].setX(Math.random() * (canvas.width - 60));
                    mumies[j].setY(-100);
                    fireballs[i].setY(-canvas.height); //throw out of play area, automatically made not active bullet
                   // alert("fireball hit mumia");
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