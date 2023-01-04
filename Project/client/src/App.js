import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import "./App.css";
import Login from "./components/Login";
import Main from "./views/Main";
import AddPhoto from "./components/AddPhoto";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <AddPhoto path="/addavatar" />
        <Main path="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
