import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/register", form);

      login(res.data.user, res.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page register-auth">
      <div className="auth-shell">
        <div className="auth-brand-panel">
          <div className="auth-logo">₹</div>

          <p className="section-label">Finance Tracker</p>

          <h1>Create your money command center.</h1>

          <p>
            Register as a user account. Admins can manage roles later, while
            users can switch between user and read-only mode from the dashboard.
          </p>

          <div className="auth-points">
            <span>React 18</span>
            <span>Express API</span>
            <span>PostgreSQL + Redis</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <p className="section-label">Get Started</p>
            <h2>Register</h2>
            <span>Create an account to access the dashboard.</span>
          </div>

          <form className="auth-form" onSubmit={submit}>
            <div className="form-group">
              <label>Name</label>
              <input
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                placeholder="Create password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}