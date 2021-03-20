import React from "react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import { IonContent, IonItem, IonInput, IonButton } from "@ionic/react";
import "./Team-form.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "../../theme/variables.css";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  onSubmit() {
    //handle request
  }

  render() {
    const { text } = this.state;
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
              {isGo ? "Войти в команду" : "Создать команду"}
            </IonButton>
          </div>
        </IonItem>
      </IonContent>
    );
  }
}

export default Form;