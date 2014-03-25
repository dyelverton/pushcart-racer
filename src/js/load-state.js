var loadState = {
    preload: function() {
        game.stage.backgroundColor = '#CCC';
        game.load.spritesheet('cart', 'dist/img/cart.png', 50, 85, 2);
        game.load.spritesheet('rival', 'dist/img/rival-cart.png', 50, 85, 2);
        game.load.image('particle', 'dist/img/particle.png');
        game.load.image('road', 'dist/img/road.png');
    },

    create: function() {
        game.state.start('menu');
    }
};