
class EnemiesControler extends GameObject
{
    constructor(enemyImage, numberOfEnemies, updateStateMilliseconds)
    {
        super(updateStateMilliseconds);
        this.enemyImage = enemyImage;
        this.numberOfEnemies = numberOfEnemies;
        this.enemies = [];
    }
    updateState()
    {
      this.enemies[numberOfEnemies] = new Enemy(this.enemyImage, Math.random() * (canvas.width - 85), 10);
      this.enemies[numberOfEnemies].start();
    }
    render()
    {

    }

}