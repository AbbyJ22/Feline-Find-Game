document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        // Initialize PixelJS engine
        var game = new PixelJS.Engine();

        game.init({
            container: 'game_container',
            width: 800,
            height: 600
        });

        // Preload assets
        game.assets.addImage('fence', 'fence.png');
        game.assets.load(function () {
            // Setup background layer
            var backgroundLayer = game.createLayer('background');
            backgroundLayer.static = true;

            // Create the fence entity
            var fence = backgroundLayer.createEntity();
            fence.pos = { x: 0, y: 0 };
            fence.asset = new PixelJS.Tile();
            fence.asset.prepare({
                name: 'fence',
                size: {
                    width: 800,
                    height: 600
                }
            });

            // Add the entity to the layer
            backgroundLayer.addEntity(fence);

            // Run the game loop
            game.run(function (elapsedTime, dt) {
                // Add game logic here
            });
        });
    }
};
