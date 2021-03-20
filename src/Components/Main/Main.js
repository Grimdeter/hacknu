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

    this.getCoins = this.getCoins.bind(this);
    this.onSend = this.onSend.bind(this);
    this.getName = this.getName.bind(this);
  }

  async getName() {
    try {
      const data = await aituBridge.getMe();
      this.setState({ name: data.name });
    } catch (error) {
      console.log(error);
    }
  }

  async getCoins() {
    const res = await fetch(
      "https://aitu.digital-tm.kz/api/Player/Coins/77476859507"
    );
    this.setState({ coins: await res.json() });
  }

  componentDidMount() {
    this.getName();
    this.getCoins();
  }

  async onSend() {
    const res = await fetch(
      "https://cors-any-kz.herokuapp.com/https://aitu.digital-tm.kz/api/Player/transferCoins",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          phoneNumBER: "+77476859507",
        }),
      }
    );
    console.log(res);
    this.getCoins();
  }

  render() {
    const { name, coins } = this.state;
    return (
      <IonContent>
        <div className="main">
          <h1>Woodsman</h1>
          {name ? <p>Привет, {name}</p> : null}
          <Link to="/leaders">
            <IonButton color="success">Лучшие игроки</IonButton>
          </Link>
          <Link
            to={{
              pathname: "/leaders",
              state: {
                isTeams: true,
              },
            }}
          >
            <IonButton color="success">Лучшие команды</IonButton>
          </Link>
          <div id="bonus">
            <p>
              У вас накопилось {coins} монет. Перевести в кошелек AituPay в
              качестве бонусов?
            </p>
            <IonButton color="success" onClick={this.onSend}>
              Перевести!
            </IonButton>
          </div>
          <Link to="/form">
            <IonButton color="success" id="play-team">
              Создать команду
            </IonButton>
          </Link>
          <Link
            to={{
              pathname: "/form",
              state: {
                isGo: true,
              },
            }}
          >
            <IonButton color="success" id="play-team">
              Войти в команду
            </IonButton>
          </Link>
          <Link to="/game">
            <IonButton expand="block" color="success" id="play">
              ИГРАТЬ ОДНОМУ
            </IonButton>
          </Link>
        </div>
      </IonContent>
    );
  }
}

export default Main;
