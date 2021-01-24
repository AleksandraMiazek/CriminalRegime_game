// Class responsible for: bonus coins and bag with ammunition
//---

class Bonus extends GameObject
{
    constructor(image, nothingImg, sound, x, y, width, height, updateStateMilliseconds, delay = 0, spritesAmount, spritesCol)
    {
        super(updateStateMilliseconds, delay);

        this.image = image;
        this.sound = sound;
        this.nothingImg = nothingImg;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        this.NUMBER_OF_SPRITES = spritesAmount; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = spritesCol; // the number of columns in the gameObject image
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 1; // the number of rows in the gameObject image
        this.currentgameObject = 0;

        this.START_ROW = 0;
        this.START_COLUMN = 0;
        this.row = this.START_ROW;
        this.column = this.START_COLUMN;
        this.speed = 2;
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
           if(gameObjects[POINTS_INFO].GetPoints() >= 500 && gameObjects[POINTS_INFO].GetPoints() < 1000) {
               this.speed=3;
           } else if(gameObjects[POINTS_INFO].GetPoints() >= 1000 && gameObjects[POINTS_INFO].GetPoints() < 3000) {
               this.speed=4;
           } else if(gameObjects[POINTS_INFO].GetPoints() >= 3000 && gameObjects[POINTS_INFO].GetPoints() < 7000) {
               this.speed=5;
           } else if(gameObjects[POINTS_INFO].GetPoints() >= 7000) {
               this.speed=6;
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
    setNothingImg() {
        this.image = this.nothingImg;
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
    playSound() {
        this.sound.play();
    }
     pointIsInsideBoundingRectangle(pointX, pointY)
    {
    pointX+=15;
    pointY+=15;
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
        let SPRITE_WIDTH = ((this.image.width - 5) / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE); // the -5 is an adjustment so that this gameObject works
        let SPRITE_HEIGHT = (this.image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        ctx.drawImage(this.image, this.column * SPRITE_WIDTH, this.row * SPRITE_WIDTH, SPRITE_WIDTH, SPRITE_HEIGHT, this.x, this.y, this.width, this.height);
    }
}