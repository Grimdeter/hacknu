import Phaser from "phaser";
import aituBridge from "@btsd/aitu-bridge";
import axios from "axios";

export default class titleScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "titleScreen"
    });
  }
  inti()
  {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
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
    this.load.image("ground", "gameAssets/ground.png");
    this.load.image("ground2", "gameAssets/ground2.png");
    this.load.image("sky", "gameAssets/sky.png");
  }

  create() {
    // this.getPhone()
    // this.getName()
    this.dataName = {name:'Joseph'}
    this.dataPhone = {phone: "+77476251957"}
    setTimeout(() => {
      axios.post(`https://cors-any-kz.herokuapp.com/https://aitu.digital-tm.kz/api/session/getorcreate`, {"name": this.dataName.name, "phone": this.dataPhone.phone}).then((response)=> {
        console.log(response)
        this.sessionNum = response.data
        this.scene.run('mainScene', {phone: this.dataPhone.phone, name:this.dataName.name, sessionNum: this.sessionNum}) 
  }).catch((error) => {
        console.log(error)
      })
  }, 300);
    console.log(`aaaaaaaaaaaaaaaaaaaa`)
  }

  async getPhone() {
    try {
      this.dataPhone = await aituBridge.getPhone();
    } catch (error) {}
  }

  async getName() {
    try {
      this.dataName = await aituBridge.getMe();
    } catch (error) {}
  }

  update() {

  }
}
