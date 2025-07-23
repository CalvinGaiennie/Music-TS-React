const API_BASE_URL = "http://localhost:5000";

// Test connection
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/TestConnection`);
    const data = await response.json();
    console.log("Connection test:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
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

export const login = async (email: string, password: string) => {
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
