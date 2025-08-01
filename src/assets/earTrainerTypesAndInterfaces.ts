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
  songArtist: string;
  songAlbum: string;
  songLength: number;
  recordingQuality: string;
  songBlobUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AudioTrackToUpsert {
  audioTrackId?: number;
  userId?: number;
  songName: string;
  songTip: string;
  songKey: string;
  songChords: string;
  songInstrument: string;
  songDifficulty: string;
  songArtist: string;
  songAlbum: string;
  songLength: string; // Backend expects string, not number
  recordingQuality: string;
  songData: string; // Base64 encoded audio data for upload
  songBlobUrl?: string; // Blob URL for upload
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
  showChords: boolean;
  availableSongsNumber: number;
  availableTracks: AudioTrack[];
  trackType: TrackType;
  songPlayerType: SongPlayerType;
}

export type Action =
  | { type: "SET_SONG"; payload: AudioTrack }
  | { type: "SET_INSTRUMENT"; payload: Instrument }
  | { type: "SHOW_SONG"; payload: boolean }
  | { type: "SHOW_TIP"; payload: boolean }
  | { type: "SHOW_CHORDS"; payload: boolean }
  | { type: "SET_DIFFICULTY"; payload: string }
  | { type: "SET_AVAILABLE_SONGS_NUMBER"; payload: number }
  | { type: "SET_AVAILABLE_TRACKS"; payload: AudioTrack[] }
  | { type: "SET_TRACK_TYPE"; payload: TrackType }
  | { type: "SET_SONG_PLAYER_TYPE"; payload: SongPlayerType };

export type TrackType = "all" | "user" | "official";

export type SongPlayerType = "random" | "choosen";

export type RecordingQuality =
  | "atrocious"
  | "acceptable"
  | "good"
  | "proffessional"
  | "insane";

export const instrumentDifficulties = {
  guitar: [
    "intervals-g",
    "intervals",
    "one-string-melody",
    "one-bar-lines",
    "melodies",
    "easy-riffs",
    "hard-riffs",
    "key-of-g-diatonic-chords-easy",
    "key-of-g-diatonic-chords-hard",
    "key-of-g-diatonic-chords-with-extensions",
    "any-key-diatonic-chords-easy",
    "any-key-diatonic-chords-hard",
    "any-key-diatonic-chords-with-extensions",
    "no-restrictions",
  ],
  piano: [
    "intervals",
    "easy-melodies-or-basslines",
    "hard-melodies-or-basslines",
    "key-of-c-diatonic-chords-easy",
    "key-of-c-diatonic-chords-hard",
    "key-of-c-diatonic-chords-with-extensions",
    "key-of-c-diatonic-chords-easy-two-hands",
    "key-of-c-diatonic-chords-hard-two-hands",
    "key-of-c-diatonic-chords-with-extensions-two-hands",
    "any-key-diatonic-chords-easy",
    "any-key-diatonic-chords-hard",
    "any-key-diatonic-chords-with-extensions",
    "no-restrictions",
  ],
  bass: [
    "intervals",
    "one-string-only",
    "licks-and-melodies-easy",
    "key-of-g-riffs-and-chord-progressions-easy",
    "key-of-g-riffs-and-chord-progressions-hard",
    "any-key-riffs-and-chord-progressions-easy",
    "no-restrictions",
  ],
  "guitar-bass": [
    "key-of-g-diatonic-chords-easy",
    "key-of-g-diatonic-chords-hard",
    "any-key-diatonic-chords-easy",
    "any-key-diatonic-chords-hard",
    "no-restrictions",
  ],
  "guitar-bass-piano": [
    "key-of-g-diatonic-chords-easy",
    "key-of-g-diatonic-chords-hard",
    "any-key-diatonic-chords-easy",
    "any-key-diatonic-chords-hard",
    "no-restrictions",
  ],
};
