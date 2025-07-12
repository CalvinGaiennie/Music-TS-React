import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import FretboardSimulatorPage from "./pages/FretboardSimulatorPage";
import EarTrainerPage from "./pages/EarTrainerPage";
import LessonListPage from "./pages/LessonListPage";
import MetronomePage from "./pages/MetronomePage";
import LoginPage from "./pages/LoginPage";
import IndividualLessonPage from "./pages/IndividualLessonPage";

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
          <Route path="/metronome" element={<MetronomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
