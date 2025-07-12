import PageWrapper from "../components/PageWrapper";

function HomePage() {
  return (
    <PageWrapper
      title="Home"
      mainComponent={
        <div>
          This site is intended for begginer and Intermediate guitar players. It
          conains some basic lessons and a couple tools I wish existed when I
          was learning guitar.
        </div>
      }
    />
  );
}

export default HomePage;
