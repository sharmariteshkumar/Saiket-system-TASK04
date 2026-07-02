import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_URL = "http://localhost:3000/users";

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      setMessage("Failed to fetch users.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.age) {
      showMessage("Please fill all fields.");
      return;
    }

    if (!isValidEmail(form.email)) {
      showMessage("Please enter a valid email.");
      return;
    }

    if (Number(form.age) <= 0) {
      showMessage("Age must be greater than 0.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
        showMessage("User updated successfully.");
        setEditId(null);
      } else {
        await axios.post(API_URL, form);
        showMessage("User added successfully.");
      }

      setForm({ name: "", email: "", age: "" });
      fetchUsers();
    } catch (error) {
      showMessage("Something went wrong.");
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      age: user.age,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: "", email: "", age: "" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      showMessage("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      showMessage("Failed to delete user.");
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      String(user.age).includes(keyword)
    );
  });

  const totalUsers = users.length;
  const adultUsers = users.filter((user) => Number(user.age) >= 18).length;
  const averageAge =
    users.length > 0
      ? Math.round(users.reduce((sum, user) => sum + Number(user.age), 0) / users.length)
      : 0;

  return (
    <div className="app">
      <main className="dashboard">
        <section className="hero">
          <div>
            <p className="eyebrow">Full Stack Dashboard</p>
            <h1>User Management System</h1>
            <br />
          </div>

          <div className="server-badge">
            <span></span>
            API Connected
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Users</p>
            <h2>{totalUsers}</h2>
          </div>

          <div className="stat-card">
            <p>Adult Users</p>
            <h2>{adultUsers}</h2>
          </div>

          <div className="stat-card">
            <p>Average Age</p>
            <h2>{averageAge}</h2>
          </div>
        </section>

        {message && <div className="message-box">{message}</div>}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>{editId ? "Update User" : "Add New User"}</h2>
              <p>{editId ? "Edit selected user details." : "Create a new user profile."}</p>
            </div>
          </div>

          <form className="user-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />

            <button type="submit">{editId ? "Update User" : "Add User"}</button>

            {editId && (
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </form>
        </section>

        <section className="panel">
          <div className="table-top">
            <div>
              <h2>Users List</h2>
              <p>Manage all registered users from MySQL database.</p>
            </div>

            <input
              className="search-box"
              type="text"
              placeholder="Search by name, email or age..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>#{user.id}</td>
                        <td>
                          <div className="user-cell">
                            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                          <button className="edit-btn" onClick={() => handleEdit(user)}>
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;