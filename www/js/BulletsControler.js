//Class responsible for modyfing and display information about available bullets
//---

class BulletsControler extends GameObject
{
    constructor(value, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */
        this.bullets = value;

        this.text = "Bullets: ";
        this.font = "Times Roman";
        this.fontSize = 24;
        this.colour = "white";
        this.x = 10;
        this.y = 50;
    }
    updateState()
    {
        if(gameObjects[POINTS_INFO].GetPoints() > 2000) {
            if(this.bullets < 15) {
                this.bullets++;
            }
        }
        else if(gameObjects[POINTS_INFO].GetPoints() < 2000) {
            if(this.bullets < 10) {
                this.bullets++;
            }
        }
    }
    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed by other gameObjects.
        ctx.fillText(this.text + this.bullets, this.x, this.y);
    }
    getAvailableBullets()
    {
        return this.bullets;
    }
    bulletFired()
    {
        this.bullets--;
    }
    addBullets(value) {
        this.bullets += value;
    }
}