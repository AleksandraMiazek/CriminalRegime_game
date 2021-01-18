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


    render()
    {
        super.render();

       // player.render();
       //target.render();
       /* for (let i = 0; i < fireballs.length; i++)
        {
            fireballs[i].render();
        } */
    }
}