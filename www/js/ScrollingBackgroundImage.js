/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class ScrollingBackgroundImage extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;

        this.y = 0;
    }

    updateState()
    {
        this.y--;
        if (this.y <= -canvas.height)
        {
            this.y = 0;
        }
    }

    render()
    {
        ctx.drawImage(this.image, 0, this.y, canvas.width, canvas.height);
        ctx.drawImage(this.image, 0, this.y + canvas.height, canvas.width, canvas.height);
    }
}