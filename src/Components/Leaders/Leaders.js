import React from "react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./Leaders.css";
import Coin from "./Coin.png";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "../../theme/variables.css";
class Leaders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: [
        "Yerkali Ziyatov",
        "Shamil Mureyev",
        "Abilda Alimbay",
        "Alim Naizabek",
      ],
      points: [4, 3, 2, 1],
    };
  }
  render() {
    const { leaders, points } = this.state;
    return (
      <div className="leaders">
        <h1>Список лидеров</h1>
        {leaders.map((el, i) => (
          <div id="list">
            <div id="num">
              {i < 10 ? 0 : null}
              {i + 1}
            </div>{" "}
            <div id="name">{el}</div>
            <div>
              <img src={Coin} width="20px" height="20px" />
              {points[i]} coin(s)
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Leaders;
