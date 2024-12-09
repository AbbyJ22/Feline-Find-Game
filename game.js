const config = {
    type: Phaser.AUTO,
    width: 800, // Visible canvas width
    height: 600, // Visible canvas height
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
};

const game = new Phaser.Game(config);
let bg;

function preload() {
    // Load assets
    this.load.image('fence', 'assets/fence.png');
}

function create() {
    // Add the background image (position it at 0, 0 relative to world coordinates)
    bg = this.add.image(0, 0, 'fence').setOrigin(0);

    // Scale the background to a larger size
    const displayWidth = 970;
    const displayHeight = 320;
    bg.setDisplaySize(displayWidth, displayHeight);

    // Set the world bounds to match the background size
    this.physics.world.setBounds(0, 0, displayWidth, displayHeight);

    // Make the camera follow the player or move manually
    this.cameras.main.setBounds(0, 0, displayWidth, displayHeight);

    // Position the camera in the middle of the background initially
    this.cameras.main.scrollX = displayWidth / 2 - config.width / 2;

    // Add keyboard input for manual scrolling (for now)
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Check for left/right input to scroll the camera
    if (this.cursors.left.isDown) {
        this.cameras.main.scrollX -= 5; // Move camera left
    }
    if (this.cursors.right.isDown) {
        this.cameras.main.scrollX += 5; // Move camera right
    }
}
