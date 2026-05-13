import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = () => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log("Users error:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      normalUsers: users.filter((u) => u.role === "user").length,
      readOnly: users.filter((u) => u.role === "read-only").length,
    };
  }, [users]);

  const changeRole = async (id, role) => {
    try {
      setUpdatingId(id);
      await api.put(`/users/${id}/role`, { role });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <section className="users-page">
      <div className="users-header">
        <div>
          <p className="section-label">Admin Control</p>
          <h1>Users</h1>
          <p className="users-subtitle">
            Manage application users and switch access between admin and user.
          </p>
        </div>

        <div className="users-hero-card">
          <span>Total Users</span>
          <strong>{stats.total}</strong>
        </div>
      </div>

      <div className="users-stats-grid">
        <div className="user-stat-card">
          <span className="user-stat-icon admin-icon">A</span>
          <div>
            <p>Admins</p>
            <strong>{stats.admins}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <span className="user-stat-icon user-icon">U</span>
          <div>
            <p>Users</p>
            <strong>{stats.normalUsers}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <span className="user-stat-icon readonly-icon">R</span>
          <div>
            <p>Read Only</p>
            <strong>{stats.readOnly}</strong>
          </div>
        </div>
      </div>

      <div className="users-table-card">
        <div className="users-table-header">
          <div>
            <h3>User Management</h3>
            <p>Admin can promote user to admin or demote admin to user.</p>
          </div>

          <span>{users.length} records</span>
        </div>

        <div className="users-list">
          {users.map((u) => (
            <div className="user-row" key={u.id}>
              <div className="user-profile">
                <div className={`user-avatar ${u.role}`}>
                  {getInitial(u.name)}
                </div>

                <div>
                  <strong>{u.name}</strong>
                  <p>{u.email}</p>
                </div>
              </div>

              <span className={`role-badge ${u.role}`}>
                {u.role}
              </span>

              <div className="role-control">
                <label>Change role</label>

                <select
                  value={u.role === "read-only" ? "user" : u.role}
                  onChange={(e) => changeRole(u.id, e.target.value)}
                  disabled={updatingId === u.id}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div className="user-status">
                {updatingId === u.id ? "Updating..." : "Active"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}