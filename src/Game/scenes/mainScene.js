import Phaser from "phaser";

export default class mainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "mainScene"
    });
  }

  preload() {}

  create() {
    window.myScene = this;

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
  }

  updateScore() {
  }

  flip() {
  }

  changePC() {
  }

  update() {
  }

  die() {
  }
}
