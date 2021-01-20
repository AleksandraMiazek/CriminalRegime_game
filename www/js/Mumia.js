
class Mumia extends GameObject
{
    constructor(image,x, y, width, height, updateStateMilliseconds, delay = 0)
    {
        super(updateStateMilliseconds, delay);


        this.mumiaImage = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        this.NUMBER_OF_SPRITES = 11; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 5; // the number of columns in the gameObject image
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 3; // the number of rows in the gameObject image
        this.currentgameObject = 0;

        this.START_ROW = 0;
        this.START_COLUMN = 0;
        this.row = this.START_ROW;
        this.column = this.START_COLUMN;
        this.speed = 1;
    }

    updateState()
    {
        this.y+=this.speed;
        if (this.y > canvas.height)
        {
            this.y = -this.height;
            this.x = Math.random() * (canvas.width - 60);
        }
        // speed control -------------------------------------------
        if(gameObjects[POINTS_INFO].GetPoints() === 200) {
            this.speed=2;
        } else if(gameObjects[POINTS_INFO].GetPoints() === 500) {
            this.speed=3;
        } else if(gameObjects[POINTS_INFO].GetPoints() === 1000) {
            this.speed=4;
        } else if(gameObjects[POINTS_INFO].GetPoints() === 3000) {
            this.speed=5;
        }//--------------------------------------------------------

        this.currentgameObject++;
        if (this.currentgameObject === this.NUMBER_OF_SPRITES)
        {
            this.column = this.START_COLUMN;
            this.row = this.START_ROW;
            this.currentgameObject = 0;
        }
        else
        {
            this.column++;
            if (this.column === this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
            {
                this.column = 0;
                this.row++;
            }
        }
    }
    setX(value) {
        this.x = value;
    }
    setY(value) {
        this.y = value;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getHeight() {
        return this.height;
    }
     pointIsInsideBoundingRectangle(pointX, pointY)
    {
    pointX+=25;
    pointY+=25;
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
    render()
    {
        let SPRITE_WIDTH = ((this.mumiaImage.width - 5) / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE); // the -5 is an adjustment so that this gameObject works
        let SPRITE_HEIGHT = (this.mumiaImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        ctx.drawImage(this.mumiaImage, this.column * SPRITE_WIDTH, this.row * SPRITE_WIDTH, SPRITE_WIDTH, SPRITE_HEIGHT, this.x, this.y, this.width, this.height);
    }
}