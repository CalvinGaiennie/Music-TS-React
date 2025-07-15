import { useState } from "react";
import { testConnection, getUsers } from "../services/api";

function ConnectionTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [usersResult, setUsersResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    setLoading(true);
    setTestResult("Testing connection...");

    try {
      const result = await testConnection();
      setTestResult(
        `✅ Connection successful! Response: ${JSON.stringify(result)}`
      );
    } catch (error) {
      console.error("Detailed error:", error);
      setTestResult(`❌ Connection failed: ${error}`);

      // Additional debugging info
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        setTestResult(`❌ CORS Error: The backend server is blocking requests from the frontend. 
        
This usually means:
1. CORS is not configured on your backend
2. The backend is not allowing requests from http://localhost:5173

To fix this, you need to configure CORS in your .NET backend.`);
      }
    } finally {
      setLoading(false);
    }
  };

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

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Test Connection</h5>
              <button
                className="btn btn-primary mb-3"
                onClick={handleTestConnection}
                disabled={loading}
              >
                {loading ? "Testing..." : "Test Connection"}
              </button>
              <div className="alert alert-info">
                <pre style={{ fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>
                  {testResult}
                </pre>
              </div>
            </div>
          </div>
        </div>

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
    </div>
  );
}

export default ConnectionTest;
