import GetUsers from "../components/GetUsers";

function HomePage() {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Home</h1>
      <div>
        <p>
          This site is intended for begginer and Intermediate guitar players. It
          conains some basic lessons and a couple tools I wish existed when I
          was learning guitar...
        </p>
        {/* <hr />
        <GetUsers /> */}
      </div>
    </div>
  );
}

export default HomePage;
