import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
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
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-brand-panel">
          <div className="auth-logo">₹</div>

          <p className="section-label">Personal Finance</p>
          <h1>Track money with clarity.</h1>
          <p>
            Manage income, expenses, analytics, and role-based access in one
            clean dashboard.
          </p>

          <div className="auth-points">
            <span>JWT Authentication</span>
            <span>Role Based Access</span>
            <span>Analytics Dashboard</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <p className="section-label">Welcome Back</p>
            <h2>Login</h2>
            <span>Enter your credentials to continue.</span>
          </div>

          <form onSubmit={submit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                placeholder="Enter your email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                placeholder="Enter your password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}