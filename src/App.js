import Main from "./Components/Main/Main";
import Leaders from "./Components/Leaders/Leaders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Components/game";
import Form from "./Components/Team-form/Team-form";
import Shop from "./Components/Shop/Shop";
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
          <Route path="/form" component={Form} />
          <Route path="/shop" component={Shop} />
        </Switch>
      </Router>
    </IonApp>
  );
};

export default App;
