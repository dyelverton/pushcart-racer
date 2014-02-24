var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game-div');

var gameState = {},
	cart,
	rivals,
	timer,
	score,
	bestScore = 0,
	roadSprite,
	i = 0;

gameState.main = function() { };
gameState.main.prototype = {

    preload: function() {
		game.stage.backgroundColor = '#CCC';
		game.load.image('cart', 'assets/img/cart.png');
		game.load.image('rival', 'assets/img/rival-cart.png');
		// game.load.image('road', 'assets/road.png')
    },

    create: function() {
		cart = game.add.sprite(250, 550, 'cart');
		cart.anchor.setTo(0.5, 0.5);
		cart.body.collideWorldBounds = true;
		cart.body.bounce.setTo(0.8, 0.8);

		rivals = game.add.group();
		rivals.createMultiple(20, 'rival');

		// roadSprite = game.add.tileSprite(0, 0, 500, 600, 'road');

		timer = this.game.time.events.loop(1000, this.addRival, this);

		bestScore = (score > bestScore) ? score : bestScore;
		score = 0;

		var style = { font: "16px Arial", fill: "#000" };
		this.label_score = this.game.add.text(20, 20, "Score: 0", style);
		this.labelBestScore = this.game.add.text(20, 40, "Best Score: " + bestScore, style);
    },

    update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			cart.angle = -15;

			cart.body.acceleration.x = -700;
			cart.body.acceleration.y = 40;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			cart.angle = 15;

			cart.body.acceleration.x = 700;
			cart.body.acceleration.y = 40;
		}
		else {
			cart.rotation = 0;
			cart.body.acceleration.setTo(0,0);
			cart.body.acceleration.y = -5;
		}

		// roadSprite.tileScale.y += 1;
		this.game.physics.overlap(cart, rivals, this.restartGame, null, this);
    },

	restartGame: function() {
		this.game.state.start('main');
		this.game.time.events.remove(timer);
		i = 0;
	},

	addOneRival: function(x, y, velocity) {
		var rivalDead = rivals.getFirstDead();

		rivalDead.reset(x, y);
		rivalDead.body.velocity.y = velocity;
		rivalDead.outOfBoundsKill = true;
	},

	addRival: function() {
		i += 20;
		var incVelocity = (500 + i);

		// every seventh rival drop the rival directly on the cart
		if ( i % 7 === 0 )
			this.addOneRival(cart.x, 0, incVelocity);
		else
			this.addOneRival(game.rnd.integerInRange(50, 450), 0, incVelocity);

		score += 1;
		this.label_score.content = 'Score: ' + score;
	},
};

game.state.add('main', gameState.main);
game.state.start('main');