import Phaser from "phaser";

export default class wheelScene extends Phaser.Scene {
  constructor() {
    super({
      key: "wheelScene"
    });
  }

  init(data) {
    this.score = data.score;
  }

  preload() { }

  create() {
    window.wheel = this;
    this.scoreText = this.add
    .text(225, 50, `Ваши очки: ${this.score}`, {font: "20px"})
    .setFontFamily("Roboto")
    .setOrigin(0.5, 0.5);
    this.restartBtn = this.add.text(200, 500, 'Попробовать снова').setInteractive().setOrigin(0.5, 0.5)
    this.restartBtn.on('pointerdown', () =>
    {
      this.scene.stop()
      this.scene.run('mainScene')
    })
  }

  spin() {
    
  }

  update(){ }
}
