/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class ScrollingText extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(text, endX, y, fontSize, textColour, delay=0)
    {
        super(5, delay); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.x = canvas.width;
        this.y = y;
        this.endX = endX;
        this.text = text;
        this.fontSize = fontSize;
        this.textColour = textColour;
    }

    updateState()
    {
        this.x--;
        if (this.x <= this.endX)
        {
            this.stop();
        }
    }

    render()
    {
        ctx.fillStyle = this.textColour;
        ctx.font = this.fontSize + "px Cambria";
        ctx.fillText(this.text, this.x, this.y);
    }
}