import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container d-flex flex-column align-items-center  custom-container">
      <h1 className="mb-4">Welcome to Ear Trainer!</h1>
      <div className="mb-4">
        <h2 className="mb-4 text-center">What is Ear Trainer?</h2>
        <p>
          Having good ears is the ability to understand and play music simply by
          listening to it. Ear training is the process of developing this
          ability. It involves multiple skills and various methods for improving
          them.
        </p>
        <p>
          The goal of this site is to help people get better at learning popular
          music by ear. It does this by providing simple recordings of popular
          songs, organized by complexity and difficulty. This makes it easy for
          users to find songs that match their current skill level.
        </p>
        <p>
          Learn more about ear training and how to get the most out of this site
          by reading this article{" "}
          <a href="/lessons/3">Thoughts on Ear Training.</a>
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/ear-trainer" className="btn btn-primary ">
            Try out Ear Trainer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
