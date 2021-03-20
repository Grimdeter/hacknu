import Main from "./Components/Main/Main";
import Leaders from "./Components/Leaders/Leaders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Components/game";
import { IonApp } from "@ionic/react";
const App = () => {
  return (
    <IonApp>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/leaders" component={Leaders} />{" "}
          <Route
            path="/game"
            render={(props) => <Game {...props} isGame={true} />}
          />
        </Switch>
      </Router>
    </IonApp>
  );
};

export default App;
