// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://musicbackend.azurewebsites.net";
import type { AudioTrackToUpsert } from "../assets/earTrainerTypesAndInterfaces";

// Helper function to get auth token
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  console.log(
    "Current token:",
    token ? `${token.substring(0, 20)}...` : "No token found"
  );
  return token;
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Get users
export const getUsers = async (userId = 0, active = true) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/GetUsers/${userId}/${active}`
    );
    const users = await response.json();
    console.log("Users:", users);
    return users;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Login failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Login:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const createAccount = async (
  password: string,
  passwordConfirm: string,
  firstName: string,
  lastName: string,
  email: string,
  active: boolean
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        passwordConfirm,
        firstName,
        lastName,
        email,
        active,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to create account: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Account created:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAudioTracks = async (
  fileId: number = 0,
  userId: number = 0,
  searchParam: string = "None"
) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found. Please log in first.");
    }

    // Handle empty searchParam properly
    const searchValue = searchParam.trim() === "" ? "None" : searchParam;
    console.log(
      "Making request to:",
      `${API_BASE_URL}/AudioTrack/GetAudioTracks/${fileId}/${userId}/${encodeURIComponent(
        searchValue
      )}`
    );

    const response = await fetch(
      `${API_BASE_URL}/AudioTrack/GetAudioTracks/${fileId}/${userId}/${encodeURIComponent(
        searchValue
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to get audio files: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get My Audio Tracks
export const getMyAudioTracks = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found. Please log in first.");
    }
    const response = await fetch(
      `${API_BASE_URL}/AudioTrack/GetMyAudioTracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to get my audio files: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Upsert audio track
export const upsertAudioTrack = async (audioTrack: AudioTrackToUpsert) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found. Please log in first.");
    }

    const response = await fetch(
      `${API_BASE_URL}/AudioTrack/UpsertAudioTrack`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(audioTrack),
      }
    );
    console.log("Audio file to upsert", JSON.stringify(audioTrack));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to upsert audio file: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Audio file upserted successfully:", result.message);
    console.log("Audio file upserted successfully:", result);
    if (result.blobUrl) {
      console.log("Blob URL:", result.blobUrl);
    }
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Delete audio track
export const deleteAudioTrack = async (audioTrackId: number) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found. Please log in first.");
    }

    const response = await fetch(
      `${API_BASE_URL}/AudioTrack/DeleteAudioTrack/${audioTrackId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to delete audio file: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Audio file deleted successfully:", result.message);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
