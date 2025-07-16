export const lessons = [
  {
    id: 1,
    title: "How to learn guitar.",
    description: "How to learn guitar.",
    sections: [
      { type: "h3", content: "heres some stuff" },
      {
        type: "p",
        content:
          "setting goals, kind of guitar, type of music, ect. explain that I am going to cover the stuff that applies to pretty much everyone and helps you to be well rounded",
      },
      {
        type: "p",
        content:
          "mention the absolute basics, how to hold it learn the parts, ect",
      },
      {
        type: "p",
        content:
          "layout sections: Guitar specific technique, learning songs, music theory, ear training, feel, improvising, make sure to mention playing with others.",
      },
    ],
  },
  {
    id: 2,
    title: "Essential Music Theory",
    description: "Notes In Music Major Scale How to Make Chords Keys",
    sections: [
      { type: "h3", content: "Notes In Music" },
      { type: "p", content: "Major Scale" },
      { type: "p", content: "Invtervals and How to Make Chords" },
      { type: "p", content: "Keys" },
    ],
  },
  {
    id: 3,
    title: "Thoughts on ear training",
    description: "Thoughts on ear training",
    sections: [
      { type: "h3", content: "Thoughts on ear training" },
      {
        type: "p",
        content: "using the pentatonic scale to find the key of a song",
      },
      {
        type: "p",
        content:
          "why I built my ear training system,easy acoustic songs and melodies vs full tracks",
      },
    ],
  },
  {
    id: 4,
    title: "Applying Theory to the Fretboard",
    description: "Applying Theory to the Fretboard",
    sections: [
      { type: "h3", content: "Applying Theory to the Fretboard" },
      {
        type: "p",
        content:
          "Prerequisites Learning the Fretboard, learn the E and A String, Fretboard Octive Hack,",
      },
      { type: "p", content: "Barre Chords and the Caged System," },
      { type: "p", content: "The Pentatonic Scale," },
      { type: "p", content: "Triads," },
      { type: "p", content: "Playing the Changes" },
      { type: "p", content: "Arpeggios" },
      { type: "p", content: "OP Exersice my favorite exersize" },
    ],
  },
];

export const songList = {
  easy: [
    {
      tip: "This is a tip 1",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      songName: "Song 1",
    },
    {
      tip: "This is a tip 2",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      songName: "Song 2",
    },
    {
      tip: "This is a tip 3",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      songName: "Song 3",
    },
  ],
  medium: [
    {
      tip: "This is a tip 4",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      songName: "Song 4",
    },
    {
      tip: "This is a tip 5",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      songName: "Song 5",
    },
    {
      tip: "This is a tip 6",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      songName: "Song 6",
    },
  ],
  hard: [
    {
      tip: "This is a tip 7",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      songName: "Song 7",
    },
    {
      tip: "This is a tip 8",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      songName: "Song 8",
    },
    {
      tip: "This is a tip 9",
      song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      songName: "Song 9",
    },
  ],
};

export const notes = [
  { display: "A", value: "A" },
  { display: "A#/Bb", value: "A#" },
  { display: "B", value: "B" },
  { display: "C", value: "C" },
  { display: "C#/Db", value: "C#" },
  { display: "D", value: "D" },
  { display: "D#/Eb", value: "D#" },
  { display: "E", value: "E" },
  { display: "F", value: "F" },
  { display: "F#/Gb", value: "F#" },
  { display: "G", value: "G" },
  { display: "G#/Ab", value: "G#" },
];

export const scales = {
  note: [0], // Just the root note
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  majorPentatonic: [0, 2, 4, 7, 9],
  minorPentatonic: [0, 3, 5, 7, 10],
  majorArpeggio: [0, 4, 7],
  minorArpeggio: [0, 3, 7],
};
export const notesss = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

export const stringNames = ["E", "B", "G", "D", "A", "E"];
