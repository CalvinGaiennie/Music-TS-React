import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

// Sample lesson data - you can move this to a separate file later
const lessons = [
  {
    id: 1,
    title: "How to learn guitar.",
    description: "How to learn guitar.",
    sections: [
      { type: "h3", content: "heres some stuff" },
      { type: "p", content: "heres some other stuff" },
      { type: "p", content: "heres some more stuff" },
    ],
  },
  {
    id: 2,
    title: "Essential Music Theory",
    description: "Notes In Music Major Scale How to Make Chords Keys",
  },
  {
    id: 3,
    title: "Thoughts on ear training",
    description: "Thoughts on ear training",
  },
  {
    id: 4,
    title: "Applying Theory to the Fretboard",
    description:
      "Prerequisites Learning the Fretboard, learn the E and A String, Fretboard Octive Hack, Barre Chords and the Caged System, The Pentatonic Scale, Triads, Playing the Changes, Arpeggios, OP Exersice Barre Chords and the Caged Systemp1 The Pentatonic Scale Triadsp Playing the Changes Arpeggios OP Exersice my favorite exersize ",
  },
];

function LessonListPage() {
  return (
    <PageWrapper
      title="Guitar Lessons"
      mainComponent={
        <div>
          <h1>Lesson List</h1>
          <ul className="list-unstyled">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="mb-3 p-3 border rounded-3 text-decoration-none text-dark d-block"
              >
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </Link>
            ))}
          </ul>
        </div>
      }
    />
  );
}

export default LessonListPage;
