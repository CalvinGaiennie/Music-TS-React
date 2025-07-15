import PageWrapper from "../components/PageWrapper";
import ConnectionTest from "../components/ConnectionTest";

function HomePage() {
  return (
    <PageWrapper
      title="Home"
      mainComponent={
        <div>
          <p>
            This site is intended for begginer and Intermediate guitar players.
            It conains some basic lessons and a couple tools I wish existed when
            I was learning guitar.
          </p>
          <hr />
          <ConnectionTest />
        </div>
      }
    />
  );
}

export default HomePage;
