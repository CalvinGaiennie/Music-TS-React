import { useParams } from "react-router-dom";
import React from "react";
import { lessons } from "../assets/resources";

function IndividualLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = lessons.find((lesson) => lesson.id === parseInt(lessonId!));

  function renderContent(content: { type: string; content: string }) {
    switch (content.type) {
      case "h1":
        return <h1>{content.content}</h1>;
      case "h2":
        return <h2>{content.content}</h2>;
      case "h3":
        return <h3>{content.content}</h3>;
      case "p":
        return <p>{content.content}</p>;
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
          <React.Fragment key={`${lesson.id}-section-${index}`}>
            {renderContent(section)}
          </React.Fragment>
        ))}
        <p>{lesson?.description}</p>
      </div>
    </div>
  );
}

export default IndividualLessonPage;
