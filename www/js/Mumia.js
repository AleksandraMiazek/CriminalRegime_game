/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Enemy2 extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image,x, y, width, height, updateStateMilliseconds, delay = 0)
    {
        super(updateStateMilliseconds, delay); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.birdImage = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        this.NUMBER_OF_SPRITES = 9; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 9; // the number of columns in the gameObject image
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 1; // the number of rows in the gameObject image
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

    render()
    {
        let SPRITE_WIDTH = ((this.birdImage.width - 5) / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE); // the -5 is an adjustment so that this gameObject works
        let SPRITE_HEIGHT = (this.birdImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        ctx.drawImage(this.birdImage, this.column * SPRITE_WIDTH, this.row * SPRITE_WIDTH, SPRITE_WIDTH, SPRITE_HEIGHT, this.x, this.y, this.width, this.height);
    }
}