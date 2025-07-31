import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Welcome to Ear Trainer!</h1>
      {/* <h3>Lets learn some songs by ear!</h3> */}
      <div className={styles.content}>
        <h3 className="text-center mb-4">What is this?</h3>
        <p className="lead text-center mb-4">
          This site contains simple, short, looped tracks organized by
          difficulty so that you can find songs that match your skill level to
          learn by ear.
        </p>
        <p className="lead text-center mb-4">
          (Not sure what this means? Visit the <a href="/help">Help Page</a> to
          learn more.)
        </p>
      </div>
    </div>
  );
}

export default HomePage;
