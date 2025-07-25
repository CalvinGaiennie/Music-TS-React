// AudioTrack interfaces

export interface AudioTrack {
  audioTrackId?: number;
  userId?: number;
  songName: string;
  songTip: string;
  songKey: string;
  songChords: string;
  songInstrument: string;
  songDifficulty: string;
  songData: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Instrument =
  | "guitar"
  | "piano"
  | "bass"
  | "guitar-bass"
  | "guitar-bass-piano";

export interface Song {
  Path: string;
  Title: string;
  Tip: string;
  Key: string;
  Chords: string;
}

export interface State {
  instrument: Instrument;
  difficulty: string;
  selectedSong: Song;
  showSong: boolean;
  showTip: boolean;
  availableSongsNumber: number;
}

export type Action =
  | { type: "SET_SONG"; payload: Song }
  | { type: "SET_INSTRUMENT"; payload: Instrument }
  | { type: "SHOW_SONG"; payload: boolean }
  | { type: "SHOW_TIP"; payload: boolean }
  | { type: "SET_DIFFICULTY"; payload: string }
  | { type: "SET_AVAILABLE_SONGS_NUMBER"; payload: number };
