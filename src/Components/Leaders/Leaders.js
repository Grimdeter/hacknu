import React from "react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import './Leaders.css';

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
      points: [],
    };
  }
  render() {
    const { leaders, points } = this.state;
    return (
      <div className="leaders">
        <h1>Список лидеров</h1>
      </div>
    );
  }
}

export default Leaders;
