import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  const changeMyRole = async (role) => {
    try {
      const res = await api.put("/users/me/role", { role });
      updateUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log("Role change error:", err);
      alert(err.response?.data?.message || "Failed to change role");
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-logo">₹</span>

          <span className="brand-copy">
            <strong>Finance Tracker</strong>
            <small>Personal money dashboard</small>
          </span>
        </button>

        <nav className="nav-menu">
          <Link
            to="/"
            className={isActive("/") ? "nav-link active" : "nav-link"}
          >
            Dashboard
          </Link>

          <Link
            to="/transactions"
            className={
              isActive("/transactions") ? "nav-link active" : "nav-link"
            }
          >
            Transactions
          </Link>

          {user.role === "admin" && (
            <Link
              to="/users"
              className={isActive("/users") ? "nav-link active" : "nav-link"}
            >
              Users
            </Link>
          )}
        </nav>

        <div className="nav-account">
          <div className="user-pill">
            <div className="avatar">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="user-meta">
              <strong>{user.name}</strong>
              <span className={`role-badge role-${user.role}`}>
                {user.role}
              </span>
            </div>
          </div>

          {user.role !== "admin" && (
            <select
              className="role-select"
              value={user.role}
              onChange={(e) => changeMyRole(e.target.value)}
            >
              <option value="user">user</option>
              <option value="read-only">read-only</option>
            </select>
          )}

          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}