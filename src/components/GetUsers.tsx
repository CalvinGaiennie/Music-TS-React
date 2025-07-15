import { useState } from "react";
import { getUsers } from "../services/api";

function ConnectionTest() {
  const [usersResult, setUsersResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGetUsers = async () => {
    setLoading(true);
    setUsersResult("Fetching users...");

    try {
      const users = await getUsers(0, true);
      setUsersResult(
        `✅ Users fetched successfully! Count: ${users?.length || 0}`
      );
      console.log("Users data:", users);
    } catch (error) {
      console.error("Detailed error:", error);
      setUsersResult(`❌ Failed to fetch users: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>API Connection Test</h2>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Get Users</h5>
            <button
              className="btn btn-success mb-3"
              onClick={handleGetUsers}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Get Users"}
            </button>
            <div className="alert alert-info">
              <pre style={{ fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>
                {usersResult}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionTest;
