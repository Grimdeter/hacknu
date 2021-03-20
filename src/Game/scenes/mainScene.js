import Phaser from "phaser";

export default class mainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "mainScene"
    });
  }
  init(data)
  {
    this.phone = data.phone
    this.name = data.name
    this.sessionNum = data.sessionNum
  }

  preload() {}

  create() {
    this.scale.setZoom(0.9)

    this.fallSpeed = window.screen.height/14 + 7
    this.obstHeight = window.screen.height/14
    this.sky = this.add.tileSprite(0,0,8000, 2250, 'sky')
    // this.sound.play("music", { repeat: true, volume: 0.05 });

    this.score = 0
    window.myScene = this;
    this.obstArray = []

    this.pc = this.add.sprite(window.screen.width/2 - 50, window.screen.height - 150, 'pc0').setOrigin(0.5, 0.5).setScale(3,3)
    this.tree = this.add.tileSprite(window.screen.width/2, 0, 100, window.screen.height*4, 'tree')
    this.ground = this.add.tileSprite(0, window.screen.height - 60, 5000, 40, 'ground')
    this.ground2 = this.add.tileSprite(0, window.screen.height - 20, 5000, 40, 'ground2')

    this.physics.world.enable(this.pc);

    this.pc.body.setSize(30, 15, true);


    this.groupBranch = this.physics.add.group({
      defaultKey: "branch",
      bounceX: 0,
      bounceY: 0,
      collideWorldBounds: false,
      allowGravity: false
    });

    this.leftExecuted = false
    this.rightExecuted = false
    this.zoneGraphics = this.add.graphics()
    this.zoneGraphics.lineStyle(4, 0x555555)
    this.leftZone = this.add.zone(0, 0, window.screen.width, window.screen.height*4).setInteractive()
    this.leftZone.on('pointerup', () => {
      if (this.leftExecuted === false)
      {
        console.log(`left zone top`)
        this.flipToLeft()
        this.addObst()
        this.updateScore()
        this.obstArray.forEach(element => {
          element.y += this.fallSpeed;
        })
        console.log(`left zone bot`)
        this.leftExecuted = true
        setTimeout(() => {
          this.rightExecuted = false
          this.leftExecuted = false
        }, 100);
      }
    })

    // this.zoneGraphics.strokeRect(this.leftZone.x, this.leftZone.y, this.leftZone.width, this.leftZone.height)

    this.zoneGraphics.lineStyle(4, 0xff0000)
    // this.zoneGraphics.strokeRect(200, 0, 200, 700)

    this.rightZone = this.add.zone(window.screen.width, 0, window.screen.width, window.screen.height*4).setInteractive()
    this.rightZone.on('pointerup', () => {
      if (this.rightExecuted === false)
      {
        console.log(`right top`)
        this.addObst()
        this.flipToRight()
        this.updateScore()
        this.obstArray.forEach(element => {
          element.y += this.fallSpeed;
        })
        this.rightExecuted = true
        console.log(`right bot`)
        setTimeout(() => {
          this.rightExecuted = false
          this.leftExecuted = false
        }, 100);
      }
    }, this)

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
    // this.sndoffbtn = this.add
    //   .image(85, 45, `soundOn`)
    //   .setInteractive()
    //   .setOrigin(0.5, 0.5);

    // this.sndoffbtn.on(`pointerdown`, () => {
    //   // this.physics.world.gravity.x = -this.physics.world.gravity.x;
    //   this.sound.stopAll();
    //   this.allowClick = false;
    //   this.sndoffbtn.destroy()
    //   this.sndoffbtn = this.add
    //   .image(85, 45, `soundOff`)
    //   .setOrigin(0.5, 0.5);
    // });

    this.scoreText = this.add
      .text(window.screen.width/2, 40, "", this.labelStyle)
      .setOrigin(0.5, 0.5)
      .setFontFamily("Roboto")
      .setFontStyle("bold italic")
      .setPadding({ right: 16 });

    this.pauseBtn = this.add
      .image(window.screen.width - 40, 45, `pause`)
      .setInteractive()
      .setOrigin(0.5, 0.5)

    this.pauseBtn.on(`pointerdown`, () => {
      this.scene.sleep();
      this.scene.launch(`pauseScreen`, {
        score: this.score,
        pc: this.pc,
        obstArray: this.obstArray
      });
    });
  }

  addObst() {
    console.log(`adding obst`)
    
    this.side = Math.floor(Math.random() * Math.floor(2));
    if (this.obstAllowAdd === true) {
      if (this.side === 1) {
        this.obstSideLeft++;
        this.obstSideRight = 0;
        if (this.obstSideLeft === 3) {
          this.obstArray.push(
            this.groupBranch
              .create(window.screen.width/2+75, this.obstHeight)
              // .setSize(80, 50, true)
          ); // right
          // this.obstArray.push(this.groupBranch.create(375, 80).setScale(0.07, 0.07).setRotation(-1.57).setSize(800,800,true)) // right
        } else {
          this.obstArray.push(
            this.groupBranch
              .create(window.screen.width/2-75, this.obstHeight)
              // .setSize(15, 15, true)
              // .setSize(80, 50, true)
          ); // left
          // this.obstArray.push(this.groupBranch.create(75, 80).setScale(0.07, 0.07).setRotation(1.57).setSize(800,800,true)) // left
        }
      } else {
        this.obstSideRight++;
        this.obstSideLeft = 0;
        if (this.obstSideRight === 3) {
          this.obstArray.push(
            this.groupBranch
              .create(window.screen.width/2-75, this.obstHeight)
              // .setSize(15, 15, true)
              // .setSize(80, 50, true)
          ); // left
          // this.obstArray.push(this.groupBranch.create(125, 80).setScale(0.07, 0.07).setRotation(1.57)) // left
          // this.obstArray.push(this.groupBranch.create(75, 80).setScale(0.07, 0.07).setRotation(1.57).setSize(800,800,true)) // left
        } else {
          this.obstArray.push(
            this.groupBranch
              .create(window.screen.width/2+75, this.obstHeight)
              // .setSize(80, 50, true)
          ); // right
          // this.obstArray.push(this.groupBranch.create(375, 80).setScale(0.07, 0.07).setRotation(-1.57).setSize(800,800,true)) // right
        }
      }
    }

    this.tree.tilePositionY += 50

    if (this.obstArray[0].y > window.screen.height-150) {
      this.obstArray.shift().destroy();
    }

  }

  updateScore() {
    this.score++
    this.scoreText.text = `Score: ${this.score}\n`;
  }

  flipToRight() {
    this.pc.play('cut')
    this.pc.setX(window.screen.width/2 + 50)
    this.pc.setFlipX(true)
  }

  flipToLeft() {
    this.pc.play('cut')
    this.pc.setX(window.screen.width/2 - 50)
    this.pc.setFlipX(false)
  }

  getTime() {
    //make a new date object
    let d = new Date();
    //return the number of milliseconds since 1 January 1970 00:00:00.
    return d.getTime();
  }

  onDown() {
    //if the firstClickTime is 0 then
    //this we record the time and leave the function
    if (this.firstClickTime === 0) {
        this.firstClickTime = this.getTime();
        console.log(`1st click time ${this.firstClickTime}`)
        return;
    }
    //
    //get the elapsed time between clicks
    //
    let elapsed = this.getTime() - this.firstClickTime;
    //
    //if the time between clicks is less than 350 milliseconds
    //it is a doulble click
    //
    if (elapsed < 350) {
        console.log("double click");
    }
    //
    //reset the firstClickTime
    //
    this.firstClickTime = 0;
  }


  update() {
    // this.leftExecuted = false
    // this.rightExecuted = false
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
        ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: this.dieTweenTime,
        repeat: 0, // -1: infinity
        yoyo: false
      });

      setTimeout(() => {
        this.scene.start("wheelScene", {
          score: this.score,
          phone: this.phone,
          name: this.name,
          sessionNum: this.sessionNum
        });
      }, this.dieTweenTime);
    }
  }
}
