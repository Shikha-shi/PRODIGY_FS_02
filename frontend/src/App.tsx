import { useEffect, useState } from "react";
import "./App.css";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  salary: number;
  date_of_joining: string;
}

interface EmployeeForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: string;
  date_of_joining: string;
}

const emptyForm: EmployeeForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  department: "",
  position: "",
  salary: "",
  date_of_joining: "",
};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("access_token"))
  );

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
  
  const [formData, setFormData] =
    useState<EmployeeForm>(emptyForm);

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed");
        return;
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      setLoggedIn(true);
    } catch {
      setError("Unable to connect to the server.");
    }
  };

  const fetchEmployees = async () => {
    const token = localStorage.getItem(
      "access_token"
    );

    if (!token) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/employees/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setEmployees(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchEmployees();
    }
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    setLoggedIn(false);
    setEmployees([]);
    setUsername("");
    setPassword("");
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

 const openAddForm = () => {
  setEditingEmployeeId(null);
  setFormData(emptyForm);
  setFormError("");
  setShowAddForm(true);
};

  const closeAddForm = () => {
    setShowAddForm(false);
    setFormData(emptyForm);
    setFormError("");
  };
  const openEditForm = (employee: Employee) => {
  setEditingEmployeeId(employee.id);

  setFormData({
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    phone: employee.phone || "",
    department: employee.department,
    position: employee.position,
    salary: String(employee.salary),
    date_of_joining: employee.date_of_joining,
  });

  setFormError("");
  setShowAddForm(true);
};

  const handleAddEmployee = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setFormError("");
    setSubmitting(true);

    const token = localStorage.getItem(
      "access_token"
    );

    try {
      const url = editingEmployeeId
  ? `http://127.0.0.1:8000/employees/${editingEmployeeId}`
  : "http://127.0.0.1:8000/employees/";

const method = editingEmployeeId ? "PUT" : "POST";

const response = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: formData.phone || null,
    department: formData.department,
    position: formData.position,
    salary: Number(formData.salary),
    date_of_joining: formData.date_of_joining,
  }),
});
      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          setFormError(
            data.detail
              .map(
                (item: { msg: string }) =>
                  item.msg
              )
              .join(", ")
          );
        } else {
          setFormError(
            data.detail || "Failed to add employee"
          );
        }

        return;
      }

      closeAddForm();

      await fetchEmployees();
    } catch {
      setFormError(
        "Unable to connect to the server."
      );
    } finally {
      setSubmitting(false);
    }
  };
  const handleDeleteEmployee = async (employeeId: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmed) {
    return;
  }

  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/employees/${employeeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Failed to delete employee");
      return;
    }

    await fetchEmployees();
  } catch {
    alert("Unable to connect to the server.");
  }
};

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">EMS</div>

            <h1>
              Employee Management System
            </h1>

            <p>Admin Login</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <button type="submit">
              Login
            </button>
          </form>

          <div className="login-footer">
            <p>
              Secure Employee Data Management
            </p>
          </div>
        </div>
      </div>
    );
  }

  const departments = new Set(
    employees.map(
      (employee) => employee.department
    )
  ).size;

  return (
    <div className="dashboard">

      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">EMS</div>

          <div>
            <h2>Employee Management</h2>
            <span>Admin Dashboard</span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">

        <div className="dashboard-heading">
          <div>
            <h1>Dashboard</h1>

            <p>
              Manage your organization's employees
            </p>
          </div>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">👥</div>

            <div>
              <span>Total Employees</span>
              <strong>{employees.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏢</div>

            <div>
              <span>Departments</span>
              <strong>{departments}</strong>
            </div>
          </div>

        </div>

        <section className="employee-section">

          <div className="section-header">
            <div>
              <h2>Employees</h2>

              <p>
                View and manage employee records
              </p>
            </div>

            <button
              className="add-button"
              onClick={openAddForm}
            >
              + Add Employee
            </button>
          </div>

          <div className="table-container">

            {loading ? (
              <div className="empty-state">
                Loading employees...
              </div>
            ) : employees.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👤</div>

                <h3>No employees found</h3>

                <p>
                  Add your first employee to get
                  started.
                </p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Actions</th>

                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>#{employee.id}</td>

                      <td>
                        <strong>
                          {employee.first_name}{" "}
                          {employee.last_name}
                        </strong>
                      </td>

                      <td>{employee.email}</td>

                      <td>
                        <span
  className={`department-badge department-${employee.department
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
>
  {employee.department}
</span>
                      </td>

                      <td>{employee.position}</td>

                      <td>
                    ₹{employee.salary}
</td>
<td className="employee-actions">
  <button
    type="button"
    className="icon-button edit-button"
    onClick={() => openEditForm(employee)}
    title="Edit employee"
    aria-label="Edit employee"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  </button>

  <button
    type="button"
    className="icon-button delete-button"
    onClick={() => handleDeleteEmployee(employee.id)}
    title="Delete employee"
    aria-label="Delete employee"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  </button>
</td>
</tr>
))}
                </tbody>
              </table>
            )}

          </div>
        </section>

      </main>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-header">
              <div>
                <h2>
  {editingEmployeeId
    ? "Edit Employee"
    : "Add New Employee"}
</h2>
                <p>
                 {editingEmployeeId
  ? "Update the employee's information"
  : "Enter the employee's information"}
                </p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={closeAddForm}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddEmployee}>

              <div className="form-grid">

                <div className="form-group">
                  <label>
                    First Name
                  </label>

                  <input
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Last Name
                  </label>

                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Email
                  </label>

                  <input
                    name="email"
                    type="email"
                    placeholder="employee@example.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Phone
                  </label>

                 <input
  name="phone"
  type="tel"
  placeholder="10-digit phone number"
  value={formData.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setFormData((previous) => ({
        ...previous,
        phone: value,
      }));
    }
  }}
  pattern="[0-9]{10}"
  minLength={10}
  maxLength={10}
/>
                </div>

                <div className="form-group">
                  <label>
                    Department
                  </label>

                  <input
                    name="department"
                    type="text"
                    placeholder="e.g. CSE"
                    value={formData.department}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Position
                  </label>

                  <input
                    name="position"
                    type="text"
                    placeholder="e.g. Developer"
                    value={formData.position}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Salary
                  </label>

                  <input
                    name="salary"
                    type="number"
                    min="1"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Date of Joining
                  </label>

                  <input
                    name="date_of_joining"
                    type="date"
                    value={
                      formData.date_of_joining
                    }
                    onChange={handleFormChange}
                    required
                  />
                </div>

              </div>

              {formError && (
                <p className="form-error">
                  {formError}
                </p>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeAddForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                >
                 {editingEmployeeId
  ? submitting
    ? "Updating..."
    : "Update Employee"
  : submitting
    ? "Adding..."
    : "Add Employee"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;