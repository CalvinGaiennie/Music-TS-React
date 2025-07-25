import { useContext, useState } from "react";
import { handleLogin } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext, type AuthContextType } from "../context/AuthContextDef";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext) as AuthContextType;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(formData.email, formData.password)
      .then((data) => {
        // Store the token in localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
          setMessage("Login successful! Token saved.");
          console.log("Token saved:", data.token);
          login(formData.email, data.token, data.userId);
          setTimeout(() => navigate("/"), 1500);
        } else {
          setMessage("Login successful but no token received!");
        }
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
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="enter your email"
            onChange={handleChange}
            value={formData.email}
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
      <div className="mt-5">
        <h3>Test Account</h3>
        <p>
          Email: testuser@testuser.com <br />
          Password: testuser
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
