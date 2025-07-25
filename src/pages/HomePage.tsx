// import GetUsers from "../components/GetUsers";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Welcome to Ear Trainer!</h1>
      <div className={styles.content}>
        <p>
          This site is intended for begginer and Intermediate guitar players. It
          conains some basic lessons and a couple tools I wish existed when I
          was learning guitar...
        </p>
        <p>
          I used to struggle to learn songs by ear. My biggest problem was that
          most songs I attempted were much to difficult but I could not know how
          difficult a song was until I had learned it.
        </p>
        <p>
          This difficulty sent me on a search of different ear training methods
          and tools and eventually inspired me to build one of my own.
        </p>
        <p>
          Most methods I encountered were either just pick random songs and
          attempt to play them until you get it or the more traditional interval
          method.
        </p>
        <p>
          {" "}
          I wished there was a way to find stripped down songs of specific
          difficulties but knew there was no way to get it so I am providing it
          here for others.
        </p>
        <p>
          I added a few other tools as well that I thought could be userful or
          fun.
        </p>
        {/* <p>This all needs heavy editing.</p> */}
        {/* <hr />
        <GetUsers /> */}
      </div>
    </div>
  );
}

export default HomePage;
