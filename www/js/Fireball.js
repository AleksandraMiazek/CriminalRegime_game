
class Fireball extends GameObject
{
    constructor(image, centreX)
    {
        super(5);

        this.image = image;
        this.width = 20;
        this.height = 20;
        this.centreX = centreX;
        this.centreY = canvas.height - this.height - 1;
        this.stepSize = -1;
        this.rotation = 360;
        this.active = true;
    }

    updateState()
    {
        this.rotation -= 3;
        if (this.rotation < 1)
        {
            this.rotation = 360;
        }

        if (this.stepSize < 0)
        {
            this.centreY--;
            if (this.centreY < 0)
            {
              //  this.stepSize = 1;
             this.active = false;

            }
        }
      /*  else // this.stepSize >= 0
        {
            this.centreY++;
            if (this.centreY > canvas.height)
            {
                this.stepSize = -1;
            }
        } */
    }

    render()
    {
        ctx.save();
        ctx.translate(this.centreX, this.centreY);
        ctx.rotate(Math.radians(this.rotation));
        ctx.translate(-this.centreX, -this.centreY);

        ctx.drawImage(this.image, this.centreX - this.width / 2, this.centreY - this.width / 2, this.width, this.height);
        ctx.restore();
    }

    getCentreX()
    {
        return this.centreX;
    }
    getStatus()
    {
        return this.active;
    }
    getCentreY()
    {
        return this.centreY;
    }
}