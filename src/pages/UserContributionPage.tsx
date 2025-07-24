// import { useState } from "react";
// import LessonContributionForm from "../components/LessonContributionForm";
import TrackContributionForm from "../components/TrackContributionForm";

function UserContributionPage() {
  //   const [contributionType, setContributionType] = useState("lesson");

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
        <TrackContributionForm />
      </div>
    </div>
  );
}

export default UserContributionPage;
