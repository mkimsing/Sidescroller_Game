let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let animFrameRate = 6;
let player;
let platforms;
let groundObj;
let bg;
let score = 0;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "./assets/sky.png");
  this.load.image("ground", "./assets/BackgroundLayers/Ground_Cropped.png");
  this.load.image("platform", "./assets/platform.png");
  this.load.spritesheet(
    "playerChar",
    "./assets/Adventurer-1.5/adventurer-v1.5-Sheet.png",
    { frameWidth: 50, frameHeight: 37 }
  );
}

function create() {
  //BG Image
  this.add
    .image(game.config.width / 2, game.config.height / 2, "sky")
    .setDisplaySize(game.config.width, game.config.height);

  // Create physics group for standable platforms
  platforms = this.physics.add.staticGroup();

  // Create ground
  platforms
    .create(400, 830, "ground")
    .setScale(2)
    .refreshBody();

  groundObj = platforms.getChildren()[0];
  groundObj.setOffset(0, 10);

  //Player sprite
  player = this.physics.add.sprite(300, 450, "playerChar");
  player.setSize(25, 35);
  player.setScale(2, 2);

  //Player properties
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  //Player Char Animations
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("playerChar", {
      start: 8,
      end: 13
    }),
    frameRate: animFrameRate,
    repeat: -1
  });

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("playerChar", {
      start: 0,
      end: 3
    }),
    frameRate: animFrameRate,
    repeat: -1
  });

  this.anims.create({
    key: "jump",
    frames: this.anims.generateFrameNumbers("playerChar", {
      start: 14,
      end: 23
    }),
    frameRate: 15,
    repeat: 0
  });

  cursors = this.input.keyboard.createCursorKeys();

  //Collide platform and player
  this.physics.add.collider(platforms, player);
}

function update() {
  groundObj.x += -2;
  if (cursors.left.isDown) {
    player.body.setVelocityX(-200); // move left
    player.flipX = true; // flip the sprite to the left
    if (player.body.touching.down) {
      player.anims.play("left", true); // play walk animation
    }
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(200); // move right
    player.flipX = false; // use the original sprite looking to the right
    if (player.body.touching.down) {
      player.anims.play("left", true); // play walk animatio
    }
  } else if (player.body.touching.down) {
    player.body.setVelocityX(0);
    player.anims.play("idle", true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(200 * -1);
    player.anims.play("jump", true);
  }
}
