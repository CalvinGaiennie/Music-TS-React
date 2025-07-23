import { useState } from "react";
import { login } from "../services/api";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(formData.username, formData.password)
      .then((data) => {
        setMessage(data.token || "Login successful!");
        console.log("datamessage", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
        setMessage(error.message || "Login failed. Please try again.");
      });
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Login</h1>
      <form
        className="container mt-4"
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="enter your username"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="enter your password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        {message && <div role="alert">{message}</div>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
