var gameState = {

    create: function() {
        // tile sprite first so element display on top
        roadSprite = game.add.tileSprite(0, 0, 512, 700, 'road');

        cart = game.add.sprite(250, 650, 'cart');
        cart.animations.add('go');
        cart.animations.play('go', 20, true);
        cart.anchor.setTo(0.5, 0.5);
        cart.body.collideWorldBounds = true;
        cart.body.bounce.setTo(0.7, 0.7);

        rivals = game.add.group();
        rivals.createMultiple(20, 'rival');

        particle = game.add.emitter(0, 0, 200);
        particle.makeParticles('particle');
        particle.gravity = 10;

        timer = game.time.events.loop(1500, this.addRival, this);

        bestScore = (score > bestScore) ? score : bestScore;
        score = 0;

        var style = { font: "16px Arial", fill: "#000" };
        this.labelScore = game.add.text(20, 20, "Score: 0", style);
        this.labelBestScore = game.add.text(20, 40, "Best Score: " + bestScore, style);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            cart.angle = -15;

            cart.body.acceleration.x = -700;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            cart.angle = 15;

            cart.body.acceleration.x = 700;
        }
        else {
            cart.rotation = 0;
            cart.body.acceleration.setTo(0,0);
        }

        // move tilesprite down
        roadSprite.tilePosition.y += 10;

        // checking for cart collision
        if ( game.physics.overlap(cart, rivals, null, null, this) ) {
            // stop moving road
            roadSprite.tilePosition.y += 0;

            this.cartCollision();
        }
    },

    addOneRival: function(x, y, velocity) {
        var rivalDead = rivals.getFirstDead();

        rivalDead.animations.add('go');
        rivalDead.animations.play('go', 20, true);
        rivalDead.reset(x, y);
        rivalDead.body.velocity.y = velocity;
        rivalDead.outOfBoundsKill = true;
    },

    addRival: function() {
        i += 20;
        var incVelocity = (400 + i);

        // every seventh rival drop the rival directly on the cart
        if ( i % 7 === 0 )
            this.addOneRival(cart.x, 0, incVelocity);
        else
            this.addOneRival(game.rnd.integerInRange(50, 450), 0, incVelocity);

        score += 1;
        this.labelScore.content = 'Score: ' + score;
    },

    particleBurst: function() {
        //  Position the emitter where the cart was
        particle.x = cart.x;
        particle.y = cart.y;

        particle.start(true, 2000, null, 10);
        cart.visible = false;
    },

    cartCollision: function() {
        // explode the cart
        this.particleBurst();

        // stop timer and remove the loop
        game.time.events.remove(timer);

        // determine if score is higher than the best score
        bestScore = (score > bestScore) ? score : bestScore;

        // wait 3 seconds before going back to the menu
        setTimeout(function(){
            game.state.start('menu');
        }, 3000);
    }
};