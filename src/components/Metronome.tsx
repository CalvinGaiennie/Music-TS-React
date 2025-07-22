import { useEffect, useRef, useState } from "react";
import styles from "./Metronome.module.css";

function Metronome({
  lengthOfBeat,
  noteType,
  numOfMeasures,
  rudimentToStartOn,
}: {
  lengthOfBeat: number;
  noteType: number;
  numOfMeasures: number;
  rudimentToStartOn: number;
}) {
  const rudiments = [
    {
      RudimentNumber: "Zero",
      Rudiment: " 0:",
    },
    {
      RudimentNumber: "One",
      Rudiment: " 1: R L R L    R L R L      R L R L    R L R L",
    },
    {
      RudimentNumber: "Two",
      Rudiment: " 2: L R L R    L R L R      L R L R    L R L R",
    },
    {
      RudimentNumber: "Three",
      Rudiment: " 3: R R L L    R R L L      R R L L    R R L L",
    },
    {
      RudimentNumber: "Four",
      Rudiment: " 4: L L R R    L L R R      L L R R    L L R R",
    },
    {
      RudimentNumber: "Five",
      Rudiment: " 5: R L R R    L R L L      R L R R    L R L L",
    },
    {
      RudimentNumber: "Six",
      Rudiment: " 6: R L L R    L R R L      R L L R    L R R L",
    },
    {
      RudimentNumber: "Seven",
      Rudiment: " 7: R R L R    L L R L      R R L R    L L R L",
    },
    {
      RudimentNumber: "Eight",
      Rudiment: " 8: R L R L    L R L R      R L R L    L R L R",
    },
    {
      RudimentNumber: "Nine",
      Rudiment: " 9: R R R L    R R R L      R R R L    R R R L",
    },
    {
      RudimentNumber: "Ten",
      Rudiment: "10: L L L R    L L L R      L L L R    L L L R",
    },
    {
      RudimentNumber: "Eleven",
      Rudiment: "11: R L L L    R L L L      R L L L    R L L L",
    },
    {
      RudimentNumber: "Twelve",
      Rudiment: "12: L R R R    L R R R      L R R R    L R R R",
    },
    {
      RudimentNumber: "Thirteen",
      Rudiment: "13: R R R R    L L L L      R R R R    L L L L",
    },
    {
      RudimentNumber: "Fourteen",
      Rudiment: "14: R L R L    R R L L      R L R L    R R L L",
    },
    {
      RudimentNumber: "Fifteen",
      Rudiment: "15: L R L R    L L R R      L R L R    L L R R",
    },
    {
      RudimentNumber: "Sixteen",
      Rudiment: "16: R L R L    R L R R      L R L R    L R L L",
    },
    {
      RudimentNumber: "Seventeen",
      Rudiment: "17: R L R L    R L L R      L R L R    L R R L",
    },
    {
      RudimentNumber: "Eighteen",
      Rudiment: "18: R L R L    R R L R      L R L R    L L R L",
    },
    {
      RudimentNumber: "Nineteen",
      Rudiment: "19: R L R L    R R R L      R L R L    R R R L",
    },
    {
      RudimentNumber: "Twenty",
      Rudiment: "20: L R L R    L L L R      L R L R    L L L R",
    },
    {
      RudimentNumber: "TwentyOne",
      Rudiment: "21: R L R L    R L L L      R L R L    R L L L",
    },
    {
      RudimentNumber: "TwentyTwo",
      Rudiment: "22: L R L R    L R R R      L R L R    L R R R",
    },
    {
      RudimentNumber: "TwentyThree",
      Rudiment: "23: R L R L    R R R R      L R L R    L L L L",
    },
    {
      RudimentNumber: "TwentyFour",
      Rudiment: "24: R R L L    R L R R      L L R R    L R L L",
    },
  ];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRudimentIndex, setCurrentRudimentIndex] = useState(
    rudimentToStartOn - 1
  );

  const intervalRef = useRef<number | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const currBeatRef = useRef(0);
  const measureNumberDiv = useRef<HTMLSpanElement | null>(null);
  const currMeasureRef = useRef(0);

  function toggleWorkout() {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsPlaying(false);
      if (toggleButtonRef.current) {
        toggleButtonRef.current.textContent = "Start Workout";
      }
      currBeatRef.current = 0;
    } else {
      if (!audioContext.current) {
        audioContext.current = new AudioContext();
      }
      if (audioContext.current.state === "suspended") {
        audioContext.current.resume();
      }

      currBeatRef.current = 0;
      currMeasureRef.current = 0; // Reset measure counter when starting

      intervalRef.current = setInterval(() => {
        playClick();

        const beatsPerMeasure = noteType;

        // Increment measure counter when we complete a full measure
        if (currBeatRef.current === beatsPerMeasure - 1) {
          currMeasureRef.current = currMeasureRef.current + 1;
          if (measureNumberDiv.current) {
            measureNumberDiv.current.innerHTML =
              currMeasureRef.current.toString();
          }
        }

        currBeatRef.current = (currBeatRef.current + 1) % beatsPerMeasure;

        // Change rudiment after completing the specified number of measures
        if (
          currBeatRef.current === 0 &&
          currMeasureRef.current > 0 &&
          currMeasureRef.current % numOfMeasures === 0
        ) {
          setCurrentRudimentIndex(
            (prevIndex) => (prevIndex + 1) % rudiments.length
          );
        }
      }, (lengthOfBeat * 1000) / (noteType / 4));

      setIsPlaying(true);
      if (toggleButtonRef.current) {
        toggleButtonRef.current.textContent = "Stop Workout";
      }
    }
  }

  function playClick() {
    const currentBeat = currBeatRef.current;
    console.log("PlayClick - Current beat:", currentBeat);

    if (!audioContext.current) {
      return;
    }

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.type = currBeatRef.current % noteType == 0 ? "square" : "sine";
    oscillator.frequency.setValueAtTime(1000, audioContext.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + 0.1);
  }

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  return (
    <div className={(styles.metronome, "main-page")}>
      <h1>Stick Control Workout</h1>
      <img src="/StickControlImages/staff.png" width="300px" />
      <p id="imgDiv">{rudiments[currentRudimentIndex].Rudiment}</p>
      <p className="mb-0" style={{ fontSize: "1.2rem" }}>
        <strong>Measure: </strong>
        <span ref={measureNumberDiv}></span>
      </p>
      <button
        className="btn btn-primary mt-4"
        onClick={toggleWorkout}
        ref={toggleButtonRef}
      >
        Start Workout
      </button>
      <p>add a description here</p>
    </div>
  );
}

export default Metronome;
