const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create
    }
};


const game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('fence', 'assets/fence.png');
}

function create() {
    // Add background
    this.add.image(400, 300, 'fence');
     bg.setDisplaySize(config.width, config.height);
}
