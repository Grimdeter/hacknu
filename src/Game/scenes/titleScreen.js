import Phaser from "phaser";
import bg from "../assets/bgMonochrome.png";
import button from "../assets/button.png";
import click from "../assets/click.mp3";
import music from "../assets/stay-around-free-dl.ogg";
import border from "../assets/border.png";
import soundOn from "../assets/soundOn.png";
import soundOff from "../assets/soundOff.png";
import pause from "../assets/pause.png";
import pc0 from "../assets/pc0.png";
import pc1 from "../assets/pc1.png";
import pc2 from "../assets/pc2.png";
import pc3 from "../assets/pc3.png";
import pc4 from "../assets/pc4.png";
import pc5 from "../assets/pc5.png";
import branch from "../assets/branch.png";
import tree from "../assets/tree.png";


export default class titleScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "titleScreen"
    });
  }

  preload() {
    this.load.image(`bg`, bg);
    this.load.image("button", button);
    this.load.audio(`click`, click);
    this.load.audio(`music`, music);
    this.load.image("border", border);
    this.load.image("soundOn", soundOn);
    this.load.image("soundOff", soundOff);
    this.load.image("pause", pause);
    this.load.image("pc0", pc0);
    this.load.image("pc1", pc1);
    this.load.image("pc2", pc2);
    this.load.image("pc3", pc3);
    this.load.image("pc4", pc4);
    this.load.image("pc5", pc5);
    this.load.image("branch", branch);
    this.load.image("tree", tree);
  }

  create() {
    this.sound.play("music", { repeat: true, volume: 0.05 });
    this.add.text(200,200, "aaaaaaaaaaaaaaaaaaa")
  }

  update() {}
}
