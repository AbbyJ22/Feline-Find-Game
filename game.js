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
    // Get the background image
    const bg = this.add.image(0, 0, 'fence');
    
    // Set the canvas size to match the background size
    const bgWidth = bg.width;
    const bgHeight = bg.height;
    
    // Resize the Phaser game canvas to match the image
    this.game.config.width = bgWidth;
    this.game.config.height = bgHeight;
    
    // Update the renderer with the new size
    this.game.scale.resize(bgWidth, bgHeight);
    
    // Now center the background image (in case the canvas size was changed after loading)
    bg.setPosition(bgWidth / 2, bgHeight / 2);  // Centers the image

    // Optionally, set the display size for scaling, if needed (can be omitted if the original size works)
    bg.setDisplaySize(bgWidth, bgHeight);
    
    console.log("Canvas size adjusted to the background image");
}
