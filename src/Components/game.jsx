import Phaser from 'phaser'
import React from "react";
import mainScene from "../Game/scenes/mainScene"
import titleScreen from "../Game/scenes/titleScreen"
import pauseScreen from "../Game/scenes/pauseScreen"
import wheelScene2 from "../Game/scenes/wheelScene2"

const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 400,
  height: 700,
	physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: [titleScreen, mainScene, pauseScreen, wheelScene2]
};

const game = new Phaser.Game(config);

export default class App extends React.Component {
	render() {
		return (
			<div style={{ textAlign: "center" }}>
			</div>
		);
	}
}