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
      leaders: [],
      teams: [],
    };
  }

  async componentDidMount() {
    const res = await fetch(
      this.props.location.state
        ? "https://aitu.digital-tm.kz/api/LeaderBoard/team"
        : "https://aitu.digital-tm.kz/api/LeaderBoard/personal"
    );
    this.setState({ leaders: await res.json() });
  }

  render() {
    const { leaders } = this.state;
    let isTeams;
    if (this.props.location.state) isTeams = this.props.location.state.isTeams;

    return (
      <div className="leaders">
        <h1>Список лучших {isTeams ? "команд" : "игроков"}</h1>
        {leaders.map((el, i) => (
          <div id="list" key={i}>
            <div id="num">
              {i < 10 ? 0 : null}
              {i + 1}
            </div>{" "}
            <div id="name">{el.name}</div>
            <div>
              <img src={Coin} width="20px" height="20px" />
              {el.totalScore} coin(s)
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Leaders;
