import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import "./App.css";
import Login from "./components/Login";
import Main from "./views/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Main path="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
