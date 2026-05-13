import React, { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { FixedSizeList as List } from "react-window";

export default function Transactions() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    transaction_date: "",
  });

  const canEdit = user.role !== "read-only";

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await api.get(`/transactions?search=${search}`);
      setTransactions(res.data);
    } catch (error) {
      console.log("Fetch transactions error:", error);
    }
  }, [search]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const total = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [transactions]);

  const incomeTotal = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [transactions]);

  const expenseTotal = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [transactions]);

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const submit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await api.post("/transactions", form);

        setForm({
          type: "expense",
          amount: "",
          category: "",
          description: "",
          transaction_date: "",
        });

        fetchTransactions();
      } catch (error) {
        alert(error.response?.data?.message || "Failed to add transaction");
      }
    },
    [form, fetchTransactions]
  );

  const remove = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete transaction");
    }
  };

  const Row = ({ index, style }) => {
    const tx = transactions[index];

    return (
      <div style={style}>
        <div className="transaction-row">
          <div className={`tx-type ${tx.type}`}>
            {tx.type === "income" ? "↗" : "↘"}
          </div>

          <div className="tx-main">
            <strong>{tx.category || "Uncategorized"}</strong>
            <span>{tx.description || "No description"}</span>
          </div>

          <div className="tx-date">{tx.transaction_date?.slice(0, 10)}</div>

          <div className={`tx-amount ${tx.type}`}>
            {tx.type === "income" ? "+" : "-"}
            {formatMoney(tx.amount)}
          </div>

          {canEdit && (
            <button className="delete-btn" onClick={() => remove(tx.id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="transactions-page">
      <div className="transactions-header">
        <div>
          <p className="section-label">Money Records</p>
          <h1>Transactions</h1>
          <p className="transactions-subtitle">
            Add, search, and manage your income and expenses.
          </p>
        </div>

        <div className="transactions-count">
          <span>Total Listed</span>
          <strong>{formatMoney(total)}</strong>
        </div>
      </div>

      <div className="transaction-stats">
        <div className="mini-stat">
          <span className="mini-dot income-dot"></span>
          <div>
            <p>Income</p>
            <strong>{formatMoney(incomeTotal)}</strong>
          </div>
        </div>

        <div className="mini-stat">
          <span className="mini-dot expense-dot"></span>
          <div>
            <p>Expense</p>
            <strong>{formatMoney(expenseTotal)}</strong>
          </div>
        </div>

        <div className="mini-stat">
          <span className="mini-dot balance-dot"></span>
          <div>
            <p>Balance</p>
            <strong>{formatMoney(incomeTotal - expenseTotal)}</strong>
          </div>
        </div>
      </div>

      <div className="transaction-toolbar">
        <input
          className="search-input"
          placeholder="Search category or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="search-btn" onClick={fetchTransactions}>
          Search
        </button>
      </div>

      {canEdit ? (
        <form className="transaction-form" onSubmit={submit}>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="date"
            value={form.transaction_date}
            onChange={(e) =>
              setForm({ ...form, transaction_date: e.target.value })
            }
          />

          <button>Add Transaction</button>
        </form>
      ) : (
        <div className="readonly-note">
          You are in read-only mode. You can view transactions, but cannot add or delete.
        </div>
      )}

      <div className="transactions-card">
        <div className="transactions-card-header">
          <h3>Transaction List</h3>
          <span>{transactions.length} records</span>
        </div>

        {transactions.length === 0 ? (
          <div className="empty-state">
            <span>🧾</span>
            <h4>No transactions found</h4>
            <p>Add a transaction or try another search.</p>
          </div>
        ) : (
          <List
            height={420}
            itemCount={transactions.length}
            itemSize={86}
            width="100%"
          >
            {Row}
          </List>
        )}
      </div>
    </section>
  );
}