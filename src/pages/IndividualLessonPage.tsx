import { useParams } from "react-router-dom";

import { lessons } from "../assets/resources";

function IndividualLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = lessons.find((lesson) => lesson.id === parseInt(lessonId!));

  function renderContent(content: { type: string; content: string }) {
    switch (content.type) {
      case "h1":
        return <h1 className="mb-2">{content.content}</h1>;
      case "h2":
        return <h2 className="mb-2 mt-2">{content.content}</h2>;
      case "h3":
        return <h3 className="mb-2 mt-2">{content.content}</h3>;
      case "p":
        return <p className="mb-2">{content.content}</p>;
      // case "list":
      //   return (
      //     <ul>
      //       {content.content.map((item: string, index: number) => (
      //         <li key={index}>{item}</li>
      //       ))}
      //     </ul>
      //   );
      default:
        return <p>{content.content}</p>;
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <div>
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
