
class ScrollingBackgroundImage extends GameObject
{

    constructor(image, imageNight, secondLvlImg, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */


        this.image = image;
        this.day_img = image;
        this.night_img = imageNight;
        this.secondLvl_img = secondLvlImg;

        this.isDay = true;
        this.amount = 0;

        this.secondLvl = false;

        this.y = 0;
    }

    updateState()
    {
        this.y--;
       if (gameObjects[POINTS_INFO].GetPoints() >=8000  && gameObjects[POINTS_INFO].GetPoints() < 8500) {
           this.secondLvl = true;
       }
       if (gameObjects[POINTS_INFO].GetPoints() >=10000  && gameObjects[POINTS_INFO].GetPoints() < 10500) {
              this.secondLvl = false;
        }
        if (this.y <= -canvas.height)
        {
            this.y = 0;
            this.amount++;
            //alert(this.amount + "isDay: " + this.isDay);
           //  this.image = this.night_img;
           if (this.amount === 2 && this.secondLvl === false) {
               if(this.isDay === false) {
                   this.image = this.day_img;
                   this.isDay = true;
               } else if(this.isDay === true) {
                   this.image = this.night_img;
                   this.isDay = false;
               }
                this.amount = 0;
           }
           if(this.secondLvl === true) {
             this.image = this.secondLvl_img;
           }

        }
    }

    render()
    {
        ctx.drawImage(this.image, 0, this.y, canvas.width, canvas.height);
        ctx.drawImage(this.image, 0, this.y + canvas.height, canvas.width, canvas.height);
    }
}