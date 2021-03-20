import Phaser from "phaser";

export default class pauseScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "pauseScreen"
    });
  }

  init(data) {
    this.score = data.score;
    this.pcData = data.pc;
    this.obstArrayData = data.obstArray;
  }

  preload() {}

  create() {
    this.labelStyle = {
      fontFamily: "Roboto",
      font: "30px",
      fontStyle: "bold",
      fill: "#ffffff",
      align: "center"
    };

    this.background = this.add.tileSprite(225, 72, 450, 1500, `bg`);
    this.sky = this.add.tileSprite(0,0,800, 1250, 'sky')
    this.ground = this.add.tileSprite(0, 640, 5000, 40, 'ground')
    this.ground2 = this.add.tileSprite(0, 680, 5000, 40, 'ground2')
    this.pc = this.add.sprite(this.pcData.x, this.pcData.y, 'pc0').setOrigin(0.5, 0.5).setScale(3,3).setFlipX(this.pcData.flipX)
    this.tree = this.add.tileSprite(200, 400, 100, 800, 'tree');
    this.obstArray = [];

    this.groupObst = this.physics.add.group({
      defaultKey: "branch",
      bounceX: 0,
      bounceY: 0,
      collideWorldBounds: false,
      velocityY: this.obstMoveSpeed,
      allowGravity: false
    });

    this.obstArrayData.forEach(element => {
      this.obstArray.push(
        this.groupObst
          .create(element.x, element.y)
          .setRotation(element.rotation)
      );
    });

    this.veil = this.add.graphics({
      x: 0,
      y: 0
    });
    this.veil.fillStyle("0x000000", 0.6);
    this.veil.fillRect(0, 0, 450, 800);

    this.graphics = this.add.graphics();
    // this.graphics.fillCircle(225, 150, 50)
    this.graphics.lineStyle(3, 0xffffff, 1.0);
    this.graphics.strokeCircle(225, 150, 45);

    this.scoreTextNum = this.add
      .text(225, 150, `${this.score}`, this.labelStyle)
      .setFontFamily("Roboto")
      .setOrigin(0.3, 0.5)
    //   .setFontStyle("bold italic")
      .setPadding({ right: 16 });
    this.scoreText1 = this.add
      .text(225, 250, `ОЧКОВ`, this.labelStyle)
      .setOrigin(0.45)
      .setFontFamily("Roboto")
    //   .setFontStyle("bold italic")
      .setPadding({ right: 16 });
    this.scoreText2 = this.add
      .text(225, 300, `заработано`, this.labelStyle)
      .setOrigin(0.45)
      .setFontFamily("Roboto")
    //   .setFontStyle("bold italic")
      .setPadding({ right: 16 });

    this.buttonText = this.add
      .text(225, 514, `Продолжить`, this.labelStyle)
      .setInteractive()
      .setFontFamily("Roboto")
      .setOrigin(0.5, 0.5);

    this.buttonText.once("pointerdown", () => {
        this.scene.stop();
        this.scene.run("mainScene");
    });

    this.buttonToMenuText = this.add
      .text(225, 574, `Главная страница`, {
        fontFamily: "Roboto",
        font: "20px",
        fontStyle: "bold",
        fill: "#ffffff",
        align: "center"
      })
      .setInteractive()
      .setFontFamily("Roboto")
      .setOrigin(0.5, 0.5);

    this.buttonToMenuText.once("pointerdown", () => {
      this.sys.game.destroy(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    });

  }

  update() {}
}
