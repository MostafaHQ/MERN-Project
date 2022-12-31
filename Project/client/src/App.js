import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
      </Router>
    </div>
  );
}

export default App;
