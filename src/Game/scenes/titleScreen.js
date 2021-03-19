import Phaser from "phaser";

export default class titleScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "titleScreen"
    });
  }

  preload() {
    this.load.image(`bg`, 'gameAssets/bgMonochrome.png');
    this.load.image("button", "gameAssets/button.png");
    this.load.audio(`click`, "gameAssets/click.mp3");
    this.load.audio(`music`, "gameAssets/stay-around-free-dl.ogg");
    this.load.image("border", "gameAssets/border.png");
    this.load.image("soundOn", "gameAssets/soundOn.png");
    this.load.image("soundOff", "gameAssets/soundOff.png");
    this.load.image("pause", "gameAssets/pause.png");
    this.load.image("pc0", "gameAssets/pc0.png");
    this.load.image("pc1", "gameAssets/pc1.png");
    this.load.image("pc2", "gameAssets/pc2.png");
    this.load.image("pc3", "gameAssets/pc3.png");
    this.load.image("pc4", "gameAssets/pc4.png");
    this.load.image("pc5", "gameAssets/pc5.png");
    this.load.image("branch", "gameAssets/branch.png");
    this.load.image("tree", "gameAssets/tree.png");
  }

  create() {
    // this.sound.play("music", { repeat: true, volume: 0.05 });

      this.scene.run('mainScene') 
      console.log(`aaaaaaaaaaaaaaaaaaaa`)
  }

  update() {

  }
}
