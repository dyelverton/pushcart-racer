var menuState = {
    create: function() {
        // Start game on space bar press
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        // styles and centered positions for labels
        var style = { font: "28px Fugaz One", fill: "#000" };
        var x = game.world.width/2, y = game.world.height/2;

        var text = this.game.add.text(x, y - 50, "Press the spacebar to start", style);
        text.anchor.setTo(0.5, 0.5);

        // Check for best score
        if (bestScore !== 0) {
            var lastScore = this.game.add.text(x, y - 150, "You Passed " + score + " Carts.", style);
            var bestScoreLabel = this.game.add.text(x, y - 100, "Best Score: " + bestScore, style);
            lastScore.anchor.setTo(0.5, 0.5);
            bestScoreLabel.anchor.setTo(0.5, 0.5);
        }
    },

    // Start game
    start: function() {
        // reset count
        i = 0;
        this.game.state.start('game');
    }
};