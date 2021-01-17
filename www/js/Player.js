/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Player extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, x, y, width)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 60;

        this.minimumSize = 20;
    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }

    getWidth()
    {
        return this.width;
    }

    setX(newX)
    {
        this.x = newX;
    }

    setY(newY)
    {
        this.y = newY;
    }

    setWidth(newWidth)
    {
        this.width = newWidth;
    }

    getMinimumSize()
    {
        return this.minimumSize;
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