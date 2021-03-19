import React from "react";
import aituBridge from "@btsd/aitu-bridge";
import { IonApp, IonContent } from "@ionic/react";
class Main extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            name: ''
        }
    }
  render() {
    return (
      <IonApp>
        <IonContent>
            <p>h</p>
        </IonContent>
      </IonApp>
    );
  }
}

export default Main;
