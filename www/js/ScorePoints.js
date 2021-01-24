//This class is for point display and manipulation
//---
class ScorePoints extends GameObject
{
    constructor(value, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */
        this.points = value;

        this.text = "Points: ";
        this.font = "Times Roman";
        this.fontSize = 24;
        this.colour = "white";
        this.x = 10;
        this.y = 20;
    }
    updateState()
    {
       this.points += 5;
    }
    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed by other gameObjects.
        ctx.fillText(this.text + this.points, this.x, this.y);
    }
    GetPoints()
    {
        return this.points;
    }
    addPoints(value)
    {
        this.points += value;
    }
}