import Phaser from "phaser";
import axios from "axios";

export default class wheelScene extends Phaser.Scene {
  constructor() {
    super({
      key: "wheelScene"
    });
  }

  init(data) {
    this.score = data.score;
    this.phone = data.dataPhone;
  }

  preload() { }

  create() {
    window.wheel = this;
    this.scoreText = this.add
    .text(window.screen.width/2, 50, `Ваши очки: ${this.score}`, {font: "20px"})
    .setFontFamily("Roboto")
    .setOrigin(0.5, 0.5);


    // axios.defaults.baseURL = "https://aitu.digital-tm.kz/api/";
    axios.post(`https://aitu.digital-tm.kz/api/Session/Report/`, {"phoneNum": `${this.phone}`, "score": this.score})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    this.restartBtn = this.add.text(window.screen.width/2, 500, 'Попробовать снова').setInteractive().setOrigin(0.5, 0.5)
    this.restartBtn.on('pointerdown', () =>
    {
      this.scene.stop()
      this.sound.stopAll()
      this.scene.run('mainScene')
    })
    this.backBtn = this.add.text(window.screen.width/2, 600, "Главная страница").setInteractive().setOrigin(0.5, 0.5)
    this.backBtn.on('pointerdown', () =>
    {
      this.sys.game.destroy(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    })
  }



  spin() {
    
  }

  update(){ }
}
