import PageWrapper from "../components/PageWrapper";
import GetUsers from "../components/GetUsers";

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
          <GetUsers />
        </div>
      }
    />
  );
}

export default HomePage;
