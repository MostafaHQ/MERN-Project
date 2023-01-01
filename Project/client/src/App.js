import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Dashboard path="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
