import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import FretboardSimulatorPage from "./pages/FretboardSimulatorPage";
import EarTrainerPage from "./pages/EarTrainerPage";
import LessonListPage from "./pages/LessonListPage";
import MetronomePage from "./pages/MetronomePage";
import LoginPage from "./pages/LoginPage";
import IndividualLessonPage from "./pages/IndividualLessonPage";
import { AuthProvider } from "./context/AuthContext";
import CreateAccountPage from "./pages/CreateAccountPage";
import ContributePage from "./pages/ContributePage";
import HelpPage from "./pages/HelpPage";
import SongLibraryPage from "./pages/SongLibraryPage";

function App() {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons" element={<LessonListPage />} />
            <Route
              path="/lessons/:lessonId"
              element={<IndividualLessonPage />}
            />
            <Route
              path="/fretboard-simulator"
              element={<FretboardSimulatorPage />}
            />
            <Route path="/ear-trainer" element={<EarTrainerPage />} />
            <Route path="/song-library" element={<SongLibraryPage />} />
            <Route path="/metronome" element={<MetronomePage />} />
            <Route path="/contribute" element={<ContributePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
