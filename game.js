document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var game = new PixelJS.Engine();
        game.init({
            container: 'game_container',
            width: 800,
            height: 600
        });
        
        game.run(function (elapsedTime, dt) {
        });

        var backgroundLayer = game.createLayer('background');
var fence = backgroundLayer.createEntity();
backgroundLayer.static = true;
fence.pos = { x: 0, y: 0 };
fence.asset = new PixelJS.Tile();
fence.asset.prepare({
    name: 'fence.png',
    size: { 
        width: 800, 
        height: 600 
    }
});
    }
}

