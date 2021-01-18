/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Player extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(playerImage, centreX, centreY)
    {
        super(40); /* as this class extends from GameObject, you must always call super() */
        this.centreX = centreX;
        this.centreY = centreY;
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 9; // the number of rows and columns in the gameObject
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 4; // the number of rows and columns in the gameObject

        this.column = 0;
        this.animationStartDelay = 0;
        this.playerImage = playerImage;

        this.SPRITE_WIDTH = (this.playerImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.playerImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        this.WIDTH_OF_PLAYER_ON_CANVAS = 100; /* the width and height that the skeleton will take up on the canvas */
        this.HEIGHT_OF_PLAYER_ON_CANVAS = 100;

        this.PLAYER_SPEED = 2;
        this.setDirection(STOPPED);

    }
    updateState()
    {
        if (this.direction === UP)
        {
           // this.centreY -= this.PLAYER_SPEED;
        }
        else if (this.direction === LEFT)
        {
            this.centreX -= this.PLAYER_SPEED;
        }
        /*else if (this.direction === DOWN)
        {
           this.centreY += this.PLAYER_SPEED;
        }*/
        else if (this.direction === RIGHT)
        {
            this.centreX += this.PLAYER_SPEED;
        }

        if (this.direction !== STOPPED)
        {

            this.column++;
            this.currentgameObject++;

            if (this.currentgameObject >= this.endgameObject)
            {
                this.row = this.direction;
                this.column = 0;
                this.currentgameObject = this.startgameObject;
            }
            else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
            {
                this.column = 0;
                this.row++;
            }
        }
        else // stopped
        {
            this.column = 0;
            this.row = 2;
            this.currentgameObject = 0;
        }
    }
    render()
    {
        //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
         ctx.drawImage(this.playerImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - (this.SPRITE_WIDTH / 2), this.centreY - (this.SPRITE_HEIGHT / 2), this.WIDTH_OF_PLAYER_ON_CANVAS, this.HEIGHT_OF_PLAYER_ON_CANVAS);

    }
    setDirection(newDirection)
    {
        this.direction = newDirection;
        this.startgameObject = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.endgameObject = this.startgameObject + this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.currentgameObject = this.startgameObject;
        this.row = this.direction;
        this.column = 0;
    }
    getDirection()
    {
        return(this.direction);
    }
    getCentreX()
    {
        return this.centreX;
    }
    getCentreY()
    {
        return this.centreY;
    }
    changeX(changeAmount)
    {
      this.x += changeAmount;

      /* Ensure that only half of the bat can be off the screen                               */
      /* This ensures that the bat can still fire at a log that is on the edge of the screen, */
      /* while at the same time the bat cannot hide fully from oncoming fireballs.            */
      if(this.x > canvas.width - (this.width / 2))
      {
          this.x = canvas.width - (this.width / 2);
      }
      else if(this.x < -(this.width / 2))
      {
          this.x = -(this.width / 2);
      }
    }

    pointIsInsideBoundingRectangle(pointX, pointY)
    {
        if ((pointX > this.x) && (pointY > this.y))
        {
            if (pointX > this.x)
            {
                if ((pointX - this.x) > this.width)
                {
                    return false; // to the right of this gameObject
                }
            }

            if (pointY > this.y)
            {
                if ((pointY - this.y) > this.height)
                {
                    return false; // below this gameObject
                }
            }
        }
        else // above or to the left of this gameObject
        {
            return false;
        }
        return true; // inside this gameObject
    }
}