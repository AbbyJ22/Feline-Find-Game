document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        // Initialize the PixelJS engine
        var game = new PixelJS.Engine();
        game.init({
            container: 'game_container',
            width: 800,
            height: 600
        });

        // Preload assets
        game.assets.addImage('grass', 'assets/grass.png'); // Correctly preloading grass asset
        game.assets.load(function () {
            // Setup the background layer
            var backgroundLayer = game.createLayer('background');
            backgroundLayer.static = true;

            // Create the grass entity
            var grass = backgroundLayer.createEntity();
            grass.pos = { x: 0, y: 0 };
            grass.asset = new PixelJS.Tile();
            grass.asset.prepare({
                name: 'grass',
                size: { 
                    width: 800, 
                    height: 600 
                }
            });

            // Add the grass entity to the layer
            backgroundLayer.addEntity(grass);

            // Run the game loop
            game.run(function (elapsedTime, dt) {
                // Game logic can go here
            });
        });
    }
};
