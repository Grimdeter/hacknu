import Phaser from "phaser";
import React from "react";
import mainScene from "../Game/scenes/mainScene";
import titleScreen from "../Game/scenes/titleScreen";
import pauseScreen from "../Game/scenes/pauseScreen";
import wheelScene2 from "../Game/scenes/wheelScene2";

const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 400,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [titleScreen, mainScene, pauseScreen, wheelScene2],
};

let game = null;
export default class App extends React.Component {
  data(){
    return {
      game: null,
    };
  }
  render() {
    if (this.props.isGame) {
      if (game === null)
      {
        game = new Phaser.Game(config);
      }
    }
    return <div style={{ textAlign: "center" }}></div>;
  }
}
