const STATIC_TEXT_CENTRE = -1;

class StaticText extends GameObject
{
    constructor(text, x, y, font, fontSize, colour)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.colour = colour;
        this.hide = false;

        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
        if (this.x === STATIC_TEXT_CENTRE)
        {
            this.x = (canvas.width - this.width) / 2;
        }
    }
    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed by other gameObjects.
        ctx.fillText(this.text, this.x, this.y);
    }

}