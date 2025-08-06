function HelpPage() {
  return (
    <div className="container d-flex flex-column align-items-center custom-container">
      <h1 className="mb-4">Help Page</h1>
      <div className="d-flex flex-column align-items-center">
        <div>
          <div className="alert alert-info mb-4">
            <h4 className="alert-heading">New to Music?</h4>
            <p className="mb-0">
              If you are new to ear training try out one of these sections:{" "}
              <strong>Intervals</strong>, <strong>Easy Riffs</strong>, ,{" "}
              <strong>One String Melodies</strong>,{" "}
              <strong>Key of G Chords Easy</strong>. These are the easiest
              sections and will help you get started on your ear training
              journey. (<strong>Tip:</strong> Use the random song player for
              these sections. Their names are a giveaway.)
            </p>
          </div>

          <div>
            <h2 className="text-center mb-4">What do these terms mean?</h2>
            <p>
              If any of these definitions dont make sense click{" "}
              <a href="/lessons/2">HERE</a> to view a lesson explaining these
              terms and concepts.
            </p>
          </div>
        </div>
        <h2 className="text-center mb-4">Difficulty Definitions</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">🎶 Melodies and Riffs</h5>
                <p>
                  <strong>Intervals G:</strong> These are simply two notes being
                  played one after the other starting with the G on the Low E
                  String.
                </p>
                <p>
                  <strong>Intervals:</strong> These are simply two notes being
                  played one after the other anywhere on the guitar.
                </p>
                <p>
                  <strong>One String Melodies:</strong> These are simple
                  melodies that can be played on a single string.
                </p>
                <p>
                  <strong>One Bar Lines</strong>, Baass lines, melodies, licks,
                  and riffs, that are 1 bar long.
                </p>

                <p>
                  <strong>Easy Melodies:</strong> These melodies are short and
                  slow.
                </p>
                <p>
                  <strong>Hard Melodies:</strong> These melodies are longer and
                  faster.
                </p>
                <p>
                  <strong>Easy Riffs:</strong> These riffs are short and slow.
                </p>
                <p>
                  <strong>Hard Riffs:</strong>
                  These riffs are faster and longer.
                </p>
                <hr />
                <p>
                  <strong>Note:</strong> Everything not labeled as hard is slow
                  and recorded on an acoustic guitar.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">🎵 Chord Progressions</h5>
                <p>
                  <strong>Key of G Chords Easy:</strong> Simple chord
                  progressions in the key of G. Put simply these songs only use
                  G, A minor, B minor, C, D, and E minor chords. These are all
                  four bars long.
                </p>
                <p>
                  <strong>Key of G Chords Hard:</strong> These chord
                  progressions contain the chords in the key of G but are longer
                  and have more changes than the easy ones.
                </p>
                <p>
                  <strong>Any Key Chords Easy:</strong> These progressions are
                  short,contain few changes, and can be in any key.
                </p>
                <p>
                  <strong>Any Key Chords Hard:</strong> These progressions are
                  longer, contain more changes, and can be in any key.
                </p>
                <p>
                  <strong>No Restrictions:</strong> These progressions are not
                  restricted to any key, chord progression, length, or
                  complexity.
                </p>
                <hr />
                <p>
                  <strong>Note: </strong>Everything before No Restrictions is
                  slow, uses very basic strumming and is on an acoustic guitar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" row text-center mt-3 mb-5">
          <p className="text-muted">
            Want to learn about ear training, music theory, how to learn guitar
            and more? Check out the lessons page <a href="/lessons">HERE</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
