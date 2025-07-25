import type { AudioTrack } from "../assets/earTrainerTypesAndInterfaces";
import { deleteAudioTrack, getMyAudioTracks } from "../services/api";

function TrackList({
  tracks,
  dispatch,
}: {
  tracks: AudioTrack[];
  dispatch: (action: { type: string; payload: AudioTrack[] }) => void;
}) {
  async function handleDelete(id: number) {
    try {
      await deleteAudioTrack(id);
      // Refresh tracks from server and update state
      const updatedTracks = await getMyAudioTracks();
      dispatch({ type: "setTracks", payload: updatedTracks });
    } catch (error) {
      console.error("Error deleting audio track:", error);
    }
  }
  return (
    <div className="card" style={{ width: "100%", maxWidth: "600px" }}>
      <div className="card-header">
        <h5 className="mb-0">
          <i className="fas fa-music me-2"></i>
          Your Audio Files
        </h5>
      </div>
      <div className="card-body">
        {tracks.length > 0 ? (
          <div className="list-group">
            {tracks.map((track, i) => (
              <div
                key={`${track.songName}-${i}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="mb-1">{track.songName}</h6>
                  {track.userId && (
                    <small className="text-muted">
                      User ID: {track.userId}
                    </small>
                  )}
                  <span> </span>
                  {track.songTip && (
                    <small className="text-muted">
                      Song Tip: {track.songTip}
                    </small>
                  )}
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this track?"
                      )
                    ) {
                      handleDelete(track.audioTrackId!);
                    }
                  }}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-4">
            <i className="fas fa-music fa-3x mb-3"></i>
            <p>No audio files found</p>
            <small>Upload your first audio file to get started!</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackList;
