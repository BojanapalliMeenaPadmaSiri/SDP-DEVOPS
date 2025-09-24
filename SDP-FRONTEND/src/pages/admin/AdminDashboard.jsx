import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../dashboard.css";
import LogoutButton from "../../components/LogoutButton";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [parents, setParents] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });
  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setStudents((await API.get("/admin/students")).data);
    setFaculty((await API.get("/admin/faculty")).data);
    setParents((await API.get("/admin/parents")).data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/admin/${activeTab}/${editId}`, formData);
    } else {
      await API.post(`/admin/${activeTab}`, formData);
    }
    setFormData({ id: "", name: "", email: "" });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setFormData({ id: item.id, name: item.name, email: item.email });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/${activeTab}/${id}`);
    fetchData();
  };

  const getData = () => {
    if (activeTab === "students") return students;
    if (activeTab === "faculty") return faculty;
    if (activeTab === "parents") return parents;
    return [];
  };

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <aside className="sidebar admin-theme">
        <h2>Admin</h2>
        <button onClick={() => setActiveTab("students")}>Students</button>
        <button onClick={() => setActiveTab("faculty")}>Faculty</button>
        <button onClick={() => setActiveTab("parents")}>Parents</button>
      </aside>

      <main className="main-content">
        <div className="content">
          <h2>Admin Dashboard</h2>
          <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>

          <form onSubmit={handleSubmit} className="form-inline">
            {!editId && (
              <input
                type="number"
                name="id"
                placeholder="Enter ID"
                value={formData.id}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setFormData({ id: "", name: "", email: "" }); }}>
                Cancel
              </button>
            )}
          </form>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getData().map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
