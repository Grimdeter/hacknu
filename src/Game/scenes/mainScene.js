import Phaser from "phaser";

export default class mainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "mainScene"
    });
  }

  preload() {}

  create() {
    this.sound.play("music", { repeat: true, volume: 0.05 });

    this.score = 0
    window.myScene = this;
    this.obstArray = []

    this.pc = this.add.sprite(150, 500, 'pc0').setOrigin(0.5, 0.5).setScale(3,3)
    this.physics.world.enable(this.pc);

    this.pc.body.setSize(30, 15, true);

    this.tree = this.add.tileSprite(200, 400, 100, 800, 'tree')

    this.groupBranch = this.physics.add.group({
      defaultKey: "branch",
      bounceX: 0,
      bounceY: 0,
      collideWorldBounds: false,
      allowGravity: false
    });

    this.input.on('pointerdown', () => 
    {
    })

    this.zoneGraphics = this.add.graphics()
    this.zoneGraphics.lineStyle(4, 0x555555)
    this.leftZone = this.add.zone(0, 0, 400, 1800).setInteractive()
    this.leftZone.on('pointerdown', () => {
      console.log(`aaaaaaaaaaaaaaa`)
      this.flipToLeft()
      this.addObst()
    })

    this.zoneGraphics.strokeRect(this.leftZone.x, this.leftZone.y, this.leftZone.width, this.leftZone.height)

    this.zoneGraphics.lineStyle(4, 0xff0000)
    this.zoneGraphics.strokeRect(200, 0, 200, 700)

    this.rightZone = this.add.zone(400, 0, 400, 1800).setInteractive()
    this.rightZone.on('pointerdown', () => {
      console.log(`bbbbbbbbbbb`)
      this.addObst()
      this.flipToRight()
    })

    this.obstSideLeft = 0;
    this.obstSideRight = 0;
    this.obstAllowAdd = true;
    this.flag1 = false;
    this.flag2 = false;
    this.flag3 = false;
    this.flag4 = false;
    this.flag5 = false;

    this.allowClick = true;
    this.died = false;

    this.input.on('pointerdown', () => 
    {
      this.updateScore()
      this.obstArray.forEach(element => {
        element.y += 120;
      })
    })
    this.addInterface()
    
    this.anims.create({
      key: 'cut',
      frames: [
        { key: 'pc0' },
        { key: 'pc1' },
        { key: 'pc2' },
        { key: 'pc3' },
        { key: 'pc4' },
        { key: 'pc5' },
      ],
      skipMissedFrames: true,
      defaultTextureKey: null,
      startFrame: 0,
  
      // time
      delay: 0,
      frameRate: null,
      duration: null,
      timeScale: 1,
  
      // repeat
      repeat: 0,              // set to (-1) to repeat forever
      repeatDelay: 0,
      yoyo: false,
  
      // visible
      showOnStart: false,
      hideOnComplete: false
  })
  }

  addInterface() {
    this.sndoffbtn = this.add
      .image(85, 45, `soundOn`)
      .setInteractive()
      .setOrigin(0.5, 0.5);

    this.sndoffbtn.on(`pointerdown`, () => {
      // this.physics.world.gravity.x = -this.physics.world.gravity.x;
      this.sound.stopAll();
      this.allowClick = false;
      this.sndoffbtn.destroy()
      this.sndoffbtn = this.add
      .image(85, 45, `soundOff`)
      .setOrigin(0.5, 0.5);
    });

    this.scoreText = this.add
      .text(225, 40, "", this.labelStyle)
      .setOrigin(0.5, 0.5)
      .setFontFamily("Roboto")
      .setFontStyle("bold italic")
      .setPadding({ right: 16 });

    this.pauseBtn = this.add
      .image(360, 45, `pause`)
      .setInteractive()
      .setOrigin(0.5, 0.5)

    this.pauseBtn.on(`pointerdown`, () => {
      this.physics.world.gravity.x = -this.physics.world.gravity.x;
      this.changePC();
      this.scene.sleep();
      this.scene.launch(`pauseScreen`, {
        score: this.score,
        pc: this.pc,
        obstArray: this.obstArray
      });
    });
  }

  addObst() {
    this.side = Math.floor(Math.random() * Math.floor(2));
    if (this.obstAllowAdd === true) {
      if (this.side == 1) {
        this.obstSideLeft++;
        this.obstSideRight = 0;
        if (this.obstSideLeft == 3) {
          this.obstArray.push(
            this.groupBranch
              .create(275, 30)
              .setSize(15, 15, true)
              .setSize(80, 80, true)
          ); // right
          // this.obstArray.push(this.groupBranch.create(375, 80).setScale(0.07, 0.07).setRotation(-1.57).setSize(800,800,true)) // right
        } else {
          this.obstArray.push(
            this.groupBranch
              .create(145, 30)
              .setSize(15, 15, true)
              .setSize(80, 80, true)
          ); // left
          // this.obstArray.push(this.groupBranch.create(75, 80).setScale(0.07, 0.07).setRotation(1.57).setSize(800,800,true)) // left
        }
      } else {
        this.obstSideRight++;
        this.obstSideLeft = 0;
        if (this.obstSideRight == 3) {
          this.obstArray.push(
            this.groupBranch
              .create(165, 30)
              .setSize(15, 15, true)
              .setSize(80, 80, true)
          ); // left
          // this.obstArray.push(this.groupBranch.create(125, 80).setScale(0.07, 0.07).setRotation(1.57)) // left
          // this.obstArray.push(this.groupBranch.create(75, 80).setScale(0.07, 0.07).setRotation(1.57).setSize(800,800,true)) // left
        } else {
          this.obstArray.push(
            this.groupBranch
              .create(275, 30)
              .setSize(15, 15, true)
              .setSize(80, 80, true)
          ); // right
          // this.obstArray.push(this.groupBranch.create(375, 80).setScale(0.07, 0.07).setRotation(-1.57).setSize(800,800,true)) // right
        }
      }
    }

    this.tree.tilePositionY += 50

    // if (this.obstCount > 6) {
    //   this.obstArray.push(
    //     this.groupBranch
    //       .create(435, 30)
    //       .setRotation(1.57)
    //       .setSize(15, 15, true)
    //       .setTint(this.obstColor)
    //   ); // right
    //   this.obstArray.push(
    //     this.groupBranch
    //       .create(15, 30)
    //       .setRotation(-1.57)
    //       .setSize(15, 15, true)
    //       .setTint(this.obstColor)
    //   ); // left
    // }
  }

  updateScore() {
    this.score++
    this.scoreText.text = `Score: ${this.score}\n`;
  }

  flipToRight() {
    this.pc.play('cut')
    this.pc.setX(250)
    this.pc.setY(500)
    this.pc.setFlipX(true)
  }

  flipToLeft() {
    this.pc.play('cut')
    this.pc.setX(150)
    this.pc.setY(500)
    this.pc.setFlipX(false)
  }

  update() {
    this.physics.world.collide(this.pc, this.groupBranch, this.die, null, this)
  }

  die() {
    console.log(`DIE!`)
    if (this.died === false) {
      this.dieTweenTime = 1000;
      this.died = true;
      this.pcDieTween = this.tweens.add({
        targets: this.pc,
        alpha: {
          from: 1,
          to: 0
        },
        y: 800,
        ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: this.dieTweenTime,
        repeat: 0, // -1: infinity
        yoyo: false
      });

      this.obstArray.forEach(element => {
        this.obstDieTween = this.tweens.add({
          targets: element,
          y: 0,
          ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: this.dieTweenTime,
          repeat: 0, // -1: infinity
          yoyo: false
        });
      });

      this.obstArray.forEach(element => {
        element.body.velocity.y = 0;
        element.body.velocity.x = 0;
      });

      this.pc.body.setVelocity(0, 0);
      this.pc.body.setAllowGravity(false);

      // clearInterval(this.obstInterval)
      this.obstAllowAdd = false;

      localStorage.setItem(`bestScore`, Math.max(this.score, this.topScore));
      // console.log(`hi from die`)

      // setTimeout(() => { this.scene.start('gameOverScreen', {score: this.score, topScore:this.topScore}) }, 500)
      setTimeout(() => {
        this.scene.start("wheelScene", {
          score: this.score,
        });
      }, this.dieTweenTime);
    }
  }
}
