import React from "react";
import aituBridge from "@btsd/aitu-bridge";
import { IonApp, IonContent, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import "./Main.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "../../theme/variables.css";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  async getName() {
    try {
      const data = await aituBridge.getMe();
      this.setState({ name: data.name });
    } catch (error) {}
  }

  componentDidMount() {
    this.getName();
  }

  render() {
    const { name } = this.state;
    return (
      <IonApp>
        <IonContent>
          {name ? <p>Привет, {name}</p> : null}
          <IonButton expand="block">Играть</IonButton>
          <Link to="/leaders">
            <IonButton>Список лидеров</IonButton>
          </Link>
        </IonContent>
      </IonApp>
    );
  }
}

export default Main;
