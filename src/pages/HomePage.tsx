// import GetUsers from "../components/GetUsers";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

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
          (Visit the <a href="/help">Help Page</a> to learn more.)
        </p>

        {/* Song Library Section */}
        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  <i className="fas fa-music me-2"></i>
                  Explore Our Song Library
                </h4>
              </div>
              <div className="card-body">
                <p className="lead">
                  Browse our complete collection of songs organized by
                  instrument and difficulty level.
                </p>
                {/* <div className="row text-center">
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-guitar fa-2x text-primary mb-2"></i>
                    <h6>Guitar</h6>
                    <small className="text-muted">Acoustic & Electric</small>
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-piano fa-2x text-primary mb-2"></i>
                    <h6>Piano</h6>
                    <small className="text-muted">
                      Classical & Contemporary
                    </small>
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-music fa-2x text-primary mb-2"></i>
                    <h6>Bass</h6>
                    <small className="text-muted">Rhythm & Melody</small>
                  </div>
                </div> */}
                <div className="text-center mt-3">
                  <Link to="/song-library" className="btn btn-primary btn-lg">
                    <i className="fas fa-search me-2"></i>
                    Browse All Songs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
