import Phaser from "phaser";
import React from "react";
import mainScene from "../Game/scenes/mainScene";
import titleScreen from "../Game/scenes/titleScreen";
import pauseScreen from "../Game/scenes/pauseScreen";
import wheelScene2 from "../Game/scenes/wheelScene2";

const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  // width: 400,
  // height: 700,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [titleScreen, mainScene, pauseScreen, wheelScene2],
};

let game;
export default class App extends React.Component {
  render() {
    if (this.props.isGame) {
      if (game === undefined)
      {
        game = new Phaser.Game(config);
        console.log(game)
      }
    }
    return <div style={{ textAlign: "center" }}></div>;
  }
}
