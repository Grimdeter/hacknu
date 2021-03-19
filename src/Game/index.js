import Phaser from 'phaser'
import mainScene from "./scenes/mainScene"
import titleScreen from "./scenes/titleScreen"
import pauseScreen from "./scenes/pauseScreen"
import wheelScene2 from "./scenes/wheelScene2"
import App from "../Components/game";
import ReactDOM from "react-dom";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: [titleScreen, mainScene, pauseScreen, wheelScene2]
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);