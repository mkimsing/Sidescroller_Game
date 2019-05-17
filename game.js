
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player;
let platforms;
let groundObj;
let bg;
let score = 0;

const game = new Phaser.Game(config);

function preload() {
  //Background
  this.load.image("bg", "./assets/BackgroundLayers/Layer_0010_1.png");
  this.load.image('backgroundLayer1', './assets/BackgroundLayers/Layer_0003_6.png')
  this.load.image('backgroundLayer2', './assets/BackgroundLayers/Layer_0004_Lights.png')
  this.load.image('backgroundLayer3', './assets/BackgroundLayers/Layer_0005_5.png')
  this.load.image('backgroundLayer4', './assets/BackgroundLayers/Layer_0006_4.png')
  this.load.image('backgroundLayer5', './assets/BackgroundLayers/Layer_0007_Lights.png')
  this.load.image('backgroundLayer6', './assets/BackgroundLayers/Layer_0008_3.png')
  this.load.image('backgroundLayer7', './assets/BackgroundLayers/Layer_0009_2.png')
  this.load.image('backgroundLayer8', './assets/BackgroundLayers/Layer_0010_1.png')
  this.load.image('treeTops', './assets/BackgroundLayers/Layer_0002_7.png');

  //Foreground
  this.load.image("ground", "./assets/BackgroundLayers/Ground_Cropped.png");
  this.load.image('groundLayer1', './assets/BackgroundLayers/Layer_0000_9.png')

  //Player
  this.load.spritesheet(
    "playerChar",
    "./assets/Adventurer-1.5/adventurer-v1.5-Sheet.png",
    { frameWidth: 50, frameHeight: 37 }
  );

  //Skeleton
  this.load.spritesheet(
    "skeleton",
    "./assets/Skeleton/SpriteSheets/SkeletonAttack.png",
    { frameWidth: 30, frameHeight: 37 }
  );
}

function create() {
  //BG Image
  bg = this.add
    .image(game.config.width / 2, game.config.height / 2, "bg")
    .setDisplaySize(game.config.width, game.config.height);
  bg.setDepth(-1)

  // Create physics group for standable platforms
  platforms = this.physics.add.staticGroup();

  // Create ground
  this.ground = this.add.tileSprite(600, 550, 1200, 70, 'ground') // 660
  this.ground.scaleY = 2
  this.ground.setDepth(0)
  platforms.add(this.ground)
  this.ground.body.setOffset(0, 15)

  //Create layer darkened ground
  this.groundLayer1 = this.add.tileSprite(600, 80, 1200, 800, 'groundLayer1')
  this.groundLayer1.setDepth(1)
  this.groundLayer1.scaleY = 1.3;

  //Create layered background
  this.backgroundLayer8 = this.add.tileSprite(500, 90, 1200, 800, 'backgroundLayer8')
  this.backgroundLayer7 = this.add.tileSprite(500, 90, 1200, 800, 'backgroundLayer7')
  this.backgroundLayer6 = this.add.tileSprite(500, 163, 1200, 800, 'backgroundLayer6')
  this.backgroundLayer5 = this.add.tileSprite(500, 163, 1200, 800, 'backgroundLayer5')
  this.backgroundLayer4 = this.add.tileSprite(500, 163, 1200, 800, 'backgroundLayer4')
  this.backgroundLayer3 = this.add.tileSprite(500, 163, 1200, 800, 'backgroundLayer3')
  this.backgroundLayer2 = this.add.tileSprite(500, 163, 1200, 800, 'backgroundLayer2')
  this.backgroundLayer1 = this.add.tileSprite(500, 163, 1200, 800, 'backgroundLayer1')

  //Create treetops
  this.treeTops = this.add.tileSprite(200, 175, 1200, 800, 'treeTops')

  //Player sprite
  player = this.physics.add.sprite(300, 450, "playerChar");
  player.setSize(25, 35);
  player.setScale(2.5, 2.5);

  //Player properties
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);
  player.body.setAllowDrag(true)

  //Player Char Animations
  let animFrameRate = 8;
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("playerChar", {
      start: 8,
      end: 13
    }),
    frameRate: animFrameRate,
    repeat: -1
  });

  // this.anims.create({
  //   key: "idle",
  //   frames: this.anims.generateFrameNumbers("playerChar", {
  //     start: 0,
  //     end: 3
  //   }),
  //   frameRate: animFrameRate,
  //   repeat: -1
  // });

  this.anims.create({
    key: "idle-run",
    frames: this.anims.generateFrameNumbers("playerChar", {
      start: 8,
      end: 13
    }),
    frameRate: 5,
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

  this.anims.create({
    key: "slide",
    frames: this.anims.generateFrameNumbers("playerChar", {
      start: 24,
      end: 25
    }),
    frameRate: 4,
    repeat: 0
  });

  //TODO use this if we have time
  // this.anims.create({
  //   key: "attack",
  //   frames: this.anims.generateFrameNumbers("playerChar", {
  //     start: 93,
  //     end: 99
  //   }),
  //   frameRate: animFrameRate,
  //   repeat: 0
  // });

  cursors = this.input.keyboard.createCursorKeys();

  //Collide platform and player
  this.physics.add.collider(platforms, player);

  //TODO Have this spawn dynamically
  this.skeleton = this.add.sprite(400, 50, "skeleton");
  this.skeleton.setScale(2.5, 2.5);
}

function update() {
  // makeSkeleton()
  let scrollSpeed = 3;
  this.ground.tilePositionX += scrollSpeed;
  this.groundLayer1.tilePositionX += scrollSpeed;
  this.treeTops.tilePositionX += scrollSpeed;
  this.backgroundLayer1.tilePositionX += scrollSpeed;
  this.backgroundLayer2.tilePositionX += scrollSpeed;
  this.backgroundLayer3.tilePositionX += scrollSpeed;
  this.backgroundLayer4.tilePositionX += scrollSpeed;
  this.backgroundLayer5.tilePositionX += scrollSpeed;
  this.backgroundLayer6.tilePositionX += scrollSpeed;
  this.backgroundLayer7.tilePositionX += scrollSpeed;
  this.backgroundLayer8.tilePositionX += scrollSpeed;

  player.body.setVelocityX(0); // Always reset velocity per frame (do not slide)
  if (cursors.left.isDown) {
    player.body.setVelocityX(-500); // move left
    player.flipX = true; // flip the sprite to the left
    if (player.body.touching.down) {
      player.anims.play("left", true); // play walk animation
    }
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(500); // move right
    player.flipX = false; // use the original sprite looking to the right
    if (player.body.touching.down) {
      player.anims.play("left", true); // play walk animation
    }
  }
  else if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(600 * -1);
    player.anims.play("jump", true);
  }
  else if (cursors.down.isDown && player.body.touching.down) {
    player.anims.play("slide", true); // play slide animation
  }
  else if (player.body.touching.down) {
    player.flipX = false; // use the original sprite looking to the right
    player.anims.play("idle-run", true);
  }
}