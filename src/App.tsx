import { BrowserRouter, Route, Routes } from "react-router-dom";
import Metronome from "./pages/MetronomePage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LessonListPage from "./pages/LessonListPage";
import IndividualLessonPage from "./pages/IndividualLessonPage";
import FretboardSimulatorPage from "./pages/FretboardSimulatorPage";
import EarTrainerPage from "./pages/EarTrainerPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonListPage />} />
          <Route path="/lessons/:lessonId" element={<IndividualLessonPage />} />
          <Route
            path="/fretboard-simulator"
            element={<FretboardSimulatorPage />}
          />
          <Route path="/ear-trainer" element={<EarTrainerPage />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
