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
              <strong>Key of G Diatonic Chords Easy</strong>. These are the
              easiest sections and will help you get started on your ear
              training journey. (<strong>Tip:</strong> Use the random song
              player for these sections. Their names are a giveaway.)
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
                  played one after the other in the Key of G.
                </p>
                <p>
                  <strong>Intervals:</strong> These are simply two notes being
                  played one after the other in any key.
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
                  <strong>Melodies:</strong> These melodies are longer and
                  faster.
                </p>
                <p>
                  <strong>Easy Riffs:</strong> These riffs are slow and short.
                </p>
                <p>
                  <strong>Hard Riffs:</strong>
                  These riffs are faster and longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">🎵 Chord Progressions</h5>
                <p>
                  <strong>Key of G Diatonic Chords Easy:</strong> Simple chord
                  progressions only in the key of G exluding the diminished 7th
                  chord. Put simply these songs only use G, A minor, B minor, C,
                  D, and E minor chords.
                </p>
                <p>
                  <strong>Key of G Diatonic Chords Hard:</strong> These chord
                  progressions contain the chords in the key of G but are longer
                  and have more changes than the easy ones.
                </p>
                <p>
                  <strong>Key of G Diatonic Chords With Extensions:</strong>{" "}
                  This section contains progressions similar to the hard section
                  but can also contain any chord extensions allowed in the key
                  of G. Ex: D7, Dsus4, Cadd9, among others.
                </p>
                <p>
                  <strong>Any Key Diatonic Chords Easy:</strong> These
                  progressions are short, contain few changes, and are diatonic,
                  but can be in any key.
                </p>
                <p>
                  <strong>Any Key Diatonic Chords Hard:</strong> These
                  progressions are longer, contain more changes, are diatonic,
                  and can be in any key.
                </p>

                <p>
                  <strong>Any Key Diatonic Chords With Extensions:</strong>{" "}
                  These progressions are diatonic, can be in any key and can
                  contain extended chords.
                </p>
                <p>
                  <strong>No Restrictions:</strong> These progressions are not
                  restricted to any key, chord progression, length, or
                  complexity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" row text-center mt-3 mb-5">
          <p className="text-muted">
            Want to learn more? Check out{" "}
            <a href="/lessons/1">How to Learn Guitar</a> {", "}
            <a href="/lessons/2">Essential Music Theory</a>
            {", "} and{" "}
            <a href="/lessons/3">
              What is Ear Training, how do you do it, and what is the purpose of
              this site?
            </a>{" "}
            lessons.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
