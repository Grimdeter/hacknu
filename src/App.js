import Main from "./Components/Main/Main";
import Leaders from "./Components/Leaders/Leaders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/leaders" component={Leaders} />
      </Switch>
    </Router>
  );
};

export default App;
