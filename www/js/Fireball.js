
class Fireball extends GameObject
{
    constructor(image, centreX)
    {
        super(5);

        this.image = image;
        this.width = 22;
        this.height = 22;
        this.centreX = centreX;
        this.centreY = canvas.height - this.height - 15;
      //  this.stepSize = -1;
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
        this.centreY--;
        if (this.centreY < 0 && this.active === true)
        {
         this.active = false;
          numberOfActiveBullets--;   //the ball after touching the edge of the canvas becomes inactive
         // alert(" numberOfActiveBullets: " +  numberOfActiveBullets);
        }
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
    setY(value) {
         this.centreY = value;
    }
}