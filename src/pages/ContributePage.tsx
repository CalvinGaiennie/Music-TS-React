import { useEffect, useReducer } from "react";
// import LessonContributionForm from "../components/LessonContributionForm";
import TrackContributionForm from "../components/TrackContributionForm";
import type { AudioTrack } from "../assets/earTrainerTypesAndInterfaces";
import { getMyAudioTracks } from "../services/api";
const initialState = {
  songName: "",
  songTip: "",
  songKey: "",
  songChords: "",
  songInstrument: "",
  songDifficulty: "",
  songArtist: "",
  songAlbum: "",
  recordingQuality: "",
  songLength: 0,
  tracks: [] as AudioTrack[],
};

const reducer = (
  state: typeof initialState,
  action: {
    type: string;
    payload: string | AudioTrack[] | number;
  }
) => {
  switch (action.type) {
    case "setSongName":
      return { ...state, songName: action.payload as string };
    case "setSongTip":
      return { ...state, songTip: action.payload as string };
    case "setSongKey":
      return { ...state, songKey: action.payload as string };
    case "setSongChords":
      return { ...state, songChords: action.payload as string };
    case "setSongInstrument":
      return { ...state, songInstrument: action.payload as string };
    case "setSongDifficulty":
      return { ...state, songDifficulty: action.payload as string };
    case "setSongArtist":
      return { ...state, songArtist: action.payload as string };
    case "setSongAlbum":
      return { ...state, songAlbum: action.payload as string };
    case "setRecordingQuality":
      return { ...state, recordingQuality: action.payload as string };
    case "setSongLength":
      return { ...state, songLength: action.payload as number };
    case "setTracks":
      return { ...state, tracks: action.payload as AudioTrack[] };
  }
  return { ...state, ...action };
};
function ContributePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //   const [contributionType, setContributionType] = useState("lesson");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getMyAudioTracks();
        dispatch({ type: "setTracks", payload: data });
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Contribute</h1>
      {/* <div className="mb-4">
        <p>What would you like to contribute?</p>
        <select
          className="form-select"
          value={contributionType}
          onChange={(e) => setContributionType(e.target.value)}
        >
          <option value="lesson">Lesson</option>
          <option value="track">Track</option>
          <option>Metronome Workout</option>
        </select>
      </div> */}
      <div>
        {/* {contributionType === "lesson" && <LessonContributionForm />}
        {contributionType === "track" && <TrackContributionForm />} */}
        <TrackContributionForm state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default ContributePage;
