import React from "react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import { IonContent, IonItem, IonInput, IonButton } from "@ionic/react";
import "./Team-form.css";
import { Redirect } from "react-router-dom";
import aituBridge from "@btsd/aitu-bridge";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "../../theme/variables.css";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", redirect: false };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    const { text } = this.state;
    const data = await aituBridge.getPhone();
    const phone = data.phone.substring(1);
    try {
      const res = await fetch(
        this.props.location.state
          ? "https://cors-any-kz.herokuapp.com/https://aitu.digital-tm.kz/api/team/join"
          : "https://cors-any-kz.herokuapp.com/https://aitu.digital-tm.kz/api/team/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName: text,
            phoneNum: phone,
          }),
        }
      );
      console.log(res, await res.text());
      this.setState({ redirect: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { text, redirect } = this.state;
    if (redirect) return <Redirect to="/game" />;
    let isGo;
    if (this.props.location.state) isGo = this.props.location.state;
    return (
      <IonContent>
        <IonItem>
          <div className="team-form">
            <h1>Введите название команды</h1>
            <div>
              <IonInput value={text} placeholder="Enter Input"></IonInput>
            </div>
            <IonButton
              color="success"
              className="button"
              onClick={this.onSubmit}
            >
              {isGo ? "Создать команду" : "Создать команду"}
            </IonButton>
          </div>
        </IonItem>
      </IonContent>
    );
  }
}

export default Form;
