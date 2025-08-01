import { Link } from "react-router-dom";
import { lessons } from "../assets/resources";

function LessonListPage() {
  return (
    <div className="container d-flex flex-column align-items-center custom-container">
      <h1 className="mb-4">Lesson List</h1>
      <div>
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
    </div>
  );
}

export default LessonListPage;
