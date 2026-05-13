import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626", "#7c3aed", "#0891b2"];

export default function Dashboard() {
  const [data, setData] = useState({
    summary: {},
    category: [],
    monthly: [],
  });

  useEffect(() => {
    api
      .get("/analytics")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Analytics error:", err));
  }, []);

  const income = Number(data.summary.income || 0);
  const expense = Number(data.summary.expense || 0);
  const balance = Number(data.summary.balance || 0);

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const monthlyData = useMemo(() => {
    const map = {};

    data.monthly.forEach((item) => {
      if (!map[item.month]) {
        map[item.month] = {
          month: item.month,
          income: 0,
          expense: 0,
        };
      }

      map[item.month][item.type] = Number(item.total);
    });

    return Object.values(map);
  }, [data.monthly]);

  const categoryData = useMemo(() => {
    return data.category
      .filter((item) => Number(item.total) > 0)
      .map((item) => ({
        ...item,
        total: Number(item.total),
      }));
  }, [data.category]);

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="section-label">Overview</p>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">
            Track income, expenses, and spending patterns in one clean view.
          </p>
        </div>

        <div className="balance-box">
          <span>Current Balance</span>
          <strong>{formatMoney(balance)}</strong>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon income-icon">↗</div>
          <div>
            <p>Total Income</p>
            <h2>{formatMoney(income)}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon expense-icon">↘</div>
          <div>
            <p>Total Expense</p>
            <h2>{formatMoney(expense)}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon balance-icon">₹</div>
          <div>
            <p>Net Balance</p>
            <h2>{formatMoney(balance)}</h2>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-title">
            <h3>Category Expenses</h3>
            <p>Expense distribution by category</p>
          </div>

          {categoryData.length === 0 ? (
            <div className="empty-state">
              <span>📊</span>
              <h4>No category data</h4>
              <p>Add expense transactions to see this chart.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={310}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="45%"
                  outerRadius={95}
                  innerRadius={55}
                  paddingAngle={4}
                >
                  {categoryData.map((item, index) => (
                    <Cell
                      key={item.category}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="analytics-card">
          <div className="card-title">
            <h3>Monthly Trend</h3>
            <p>Income and expense movement over time</p>
          </div>

          {monthlyData.length === 0 ? (
            <div className="empty-state">
              <span>📈</span>
              <h4>No monthly data</h4>
              <p>Add transactions with dates to generate trends.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={310}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatMoney(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#dc2626"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="analytics-card full-card">
          <div className="card-title">
            <h3>Income vs Expense</h3>
            <p>Monthly comparison of money in and money out</p>
          </div>

          {monthlyData.length === 0 ? (
            <div className="empty-state">
              <span>📉</span>
              <h4>No comparison data</h4>
              <p>Add income and expense records to compare them.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={330}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatMoney(value)} />
                <Legend />
                <Bar dataKey="income" fill="#16a34a" radius={[10, 10, 0, 0]} />
                <Bar dataKey="expense" fill="#dc2626" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}