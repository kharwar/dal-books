import { BrowserRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <Signup />
      </div>
    </BrowserRouter>
  );
}

export default App;
