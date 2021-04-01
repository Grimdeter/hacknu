import Phaser from "phaser";
import React from "react";
import mainScene from "../Game/scenes/mainScene";
import titleScreen from "../Game/scenes/titleScreen";
import pauseScreen from "../Game/scenes/pauseScreen";
import wheelScene2 from "../Game/scenes/wheelScene2";

const config = {
  // type: Phaser.AUTO,
  type: Phaser.WEBGL,
  parent: "phaser",
	width: window.screen.width,
	height: window.screen.height,
  scale: {
              mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
  },
  renderer: Phaser.WEBGL,
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
  componentWillUnmount() {
    game.destroy(true);
    console.log(`game destroyed`)
  }
  render() {
    if (this.props.isGame) {
      if (game === undefined)
      {
        game = new Phaser.Game(config);
        if(game.renderer === null)
        {
          // window.location.reload()
          console.log(`renderer null`)
          game.destroy(true);
          console.log(`game destroyed`)
          game.renderer = Phaser.WEBGL
          game = new Phaser.Game(config);

        }
        console.log(game)
      }
    }
    return <div style={{ textAlign: "center" }}></div>;
  }
}
