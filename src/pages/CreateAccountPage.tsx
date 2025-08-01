import { useState } from "react";
import { createAccount } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextDef";

function CreateAccountPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<User>({
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  type User = {
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setMessage("Passwords do not match");
      return;
    }
    createAccount(
      formData.password,
      formData.passwordConfirm,
      formData.firstName,
      formData.lastName,
      formData.email,
      true
    )
      .then((data) => {
        // Store the token in localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);

          // Log the user in using auth context
          // Assuming the API returns user info, adjust these fields based on your API response
          const username = data.email || data.firstName || data.userName;
          const userId = data.userId || data.id || "";
          const permissions = data.permissions || "user";

          login(username, permissions, userId);

          setMessage("Account created successfully! You are now logged in.");
          console.log("Account created and logged in:", data);
          setTimeout(() => navigate("/"), 500);
        } else {
          setMessage("Account created but no token received!");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setMessage(error.message || "Login failed. Please try again.");
      });
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Create Account</h1>
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
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="enter your first name"
            onChange={handleChange}
            value={formData.firstName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="enter your last name"
            onChange={handleChange}
            value={formData.lastName}
          />
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
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              className="form-control"
              placeholder="confirm your password"
              onChange={handleChange}
              value={formData.passwordConfirm}
            />
          </div>
        </div>
        {message && <div role="alert">{message}</div>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateAccountPage;
