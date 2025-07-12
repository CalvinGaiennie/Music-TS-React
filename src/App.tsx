import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Lessons from "./pages/Lessons";
import FretboardSimulator from "./pages/FretboardSimulator";
import EarTrainer from "./pages/EarTrainer";
import Metronome from "./pages/Metronome";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/fretboard-simulator" element={<FretboardSimulator />} />
          <Route path="/ear-trainer" element={<EarTrainer />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
