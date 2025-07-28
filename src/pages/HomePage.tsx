// import GetUsers from "../components/GetUsers";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Welcome to Ear Trainer!</h1>
      {/* <h3>Lets learn some songs by ear!</h3> */}
      <div className={styles.content}>
        <h3 className="text-center mb-4">What is this?</h3>
        <p className="fs-5 text-center mb-4">
          This site contains audio tracks containing chord progressions, riffs,
          and melodies organized by difficulty so that you can find songs that
          match your skill level to learn by ear. You can also upload your own
          tracks for others to use.
        </p>
        <p className="fs-5 text-center mb-4">
          (Visit the <a href="/help">Help Page</a> to learn more.)
        </p>
      </div>
    </div>
  );
}

export default HomePage;
