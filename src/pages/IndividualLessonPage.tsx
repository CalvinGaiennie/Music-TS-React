import { useParams } from "react-router-dom";

import { lessons } from "../assets/resources";
import styles from "./IndividualLessonPage.module.css";

function IndividualLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = lessons.find((lesson) => lesson.id === parseInt(lessonId!));

  function renderContent(content: { type: string; content: string }) {
    switch (content.type) {
      case "h1":
        return <h1 className="mb-2">{content.content}</h1>;
      case "h2":
        return <h2 className="mt-3 mb-3 ms-1">{content.content}</h2>;
      case "h3":
        return <h3 className="mt-3 mb-3 ms-1">{content.content}</h3>;
      case "img":
        return <img src={content.content} alt="lesson" />;
      case "p":
        return <p className="mb-2 ms-2">{content.content}</p>;
      default:
        return <p>{content.content}</p>;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text-center mb-4">{lesson?.title}</h1>
        {lesson?.sections?.map((section, index) => (
          <div key={`${lesson.id}-section-${index}`} className={section.style}>
            {renderContent(section)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndividualLessonPage;
