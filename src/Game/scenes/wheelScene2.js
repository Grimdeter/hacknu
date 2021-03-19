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

  }

  spin() {
    
  }
  update(){ }
}
