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
      coins: 0,
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
    const { name, coins } = this.state;
    return (
      <IonContent>
        <div className="main">
          <h1>Woodsman</h1>
          {name ? <p>Привет, {name}</p> : null}
          <Link to="/leaders">
            <IonButton color="success">Список лидеров</IonButton>
          </Link>
          <IonButton expand="block" color="success" id="play">
            Играть
          </IonButton>
          <div id="bonus">
            <p>
              У вас накопилось {coins} монет. Перевести в кошелек AituPay в
              качестве бонусов?
            </p>
            <IonButton color="success">Перевести!</IonButton>
          </div>
        </div>
      </IonContent>
    );
  }
}

export default Main;
