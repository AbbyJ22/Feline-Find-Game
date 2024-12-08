const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create
    },   pixelArt: true, 
};


const game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('fence', 'assets/fence.png');
}

function create() {
    // Add background
     const bg = this.add.image(400, 300, 'fence');
     bg.setDisplaySize(config.width, config.height);
     bg.setOrigin(0.5, 0.5); 
    
    console.log ("hi");
}
