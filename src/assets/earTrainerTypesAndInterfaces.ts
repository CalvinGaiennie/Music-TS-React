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

export interface State {
  instrument: Instrument;
  difficulty: string;
  selectedSong: AudioTrack;
  showSong: boolean;
  showTip: boolean;
  availableSongsNumber: number;
  availableTracks: AudioTrack[];
  trackType: TrackType;
  songListHiddenStatus: boolean;
}

export type Action =
  | { type: "SET_SONG"; payload: AudioTrack }
  | { type: "SET_INSTRUMENT"; payload: Instrument }
  | { type: "SHOW_SONG"; payload: boolean }
  | { type: "SHOW_TIP"; payload: boolean }
  | { type: "SET_DIFFICULTY"; payload: string }
  | { type: "SET_AVAILABLE_SONGS_NUMBER"; payload: number }
  | { type: "SET_AVAILABLE_TRACKS"; payload: AudioTrack[] }
  | { type: "SET_TRACK_TYPE"; payload: TrackType }
  | { type: "SET_SONG_LIST_HIDDEN_STATUS"; payload: boolean };

export type TrackType = "all" | "user" | "standard";
