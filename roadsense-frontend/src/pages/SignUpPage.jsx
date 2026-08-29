import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "citizen",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
    department: "",
    employeeId: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.fullName.trim() || !formData.city.trim()) {
      setErrorMessage("Please enter your full name and city/jurisdiction.");
      return;
    }

    if (formData.role === "citizen" && !formData.email.trim() && !formData.phone.trim()) {
      setErrorMessage(
        "Citizens must provide at least one contact option: email or phone."
      );
      return;
    }

    if (
      formData.role === "admin" &&
      (!formData.email.trim() ||
        !formData.department.trim() ||
        !formData.employeeId.trim())
    ) {
      setErrorMessage(
        "Government signup requires official email, department, and employee ID."
      );
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password and confirm password do not match.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("roadSenseUsers") || "[]"
    );

    const duplicateUser = existingUsers.some((user) => {
      if (formData.role === "citizen") {
        return (
          (formData.email &&
            user.email?.toLowerCase() === formData.email.toLowerCase()) ||
          (formData.phone && user.phone === formData.phone)
        );
      }

      return (
        user.email?.toLowerCase() === formData.email.toLowerCase() ||
        user.employeeId?.toLowerCase() ===
          formData.employeeId.toLowerCase()
      );
    });

    if (duplicateUser) {
      setErrorMessage(
        "An account already exists with these details. Please login instead."
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      role: formData.role,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      department: formData.department,
      employeeId: formData.employeeId,
      password: formData.password,
      createdAt: new Date().toLocaleString("en-IN"),
    };

    localStorage.setItem(
      "roadSenseUsers",
      JSON.stringify([...existingUsers, newUser])
    );

    setErrorMessage("");
    setSuccessMessage(
      "Account created successfully. Redirecting you to the login page..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-heading">
          <p className="signup-label">ROADSENSE ACCOUNT CREATION</p>
          <h1>Create Your Account</h1>
          <p>
            Join RoadSense to report road issues or manage road operations.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="role">Account Type</label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Government Official</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="email">
                {formData.role === "admin"
                  ? "Official Email Address"
                  : "Email Address (Optional)"}
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                {formData.role === "admin"
                  ? "Office Phone (Optional)"
                  : "Phone Number (Optional)"}
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Example: 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="city">City / Jurisdiction Area</label>

            <input
              id="city"
              name="city"
              type="text"
              placeholder="Example: Kolkata, West Bengal"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {formData.role === "admin" && (
            <div className="government-signup-fields">
              <h2>Government Verification Details</h2>
              <p>
                Provide the details of the responsible road authority or
                department.
              </p>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="department">Department / Authority</label>

                  <input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="Example: Public Works Department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="employeeId">Employee ID</label>

                  <input
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    placeholder="Example: PWD-2026-104"
                    value={formData.employeeId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter password again"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {errorMessage && <p className="signup-error">{errorMessage}</p>}
          {successMessage && (
            <p className="signup-success">{successMessage}</p>
          )}

          <button type="submit" className="signup-button">
            Create RoadSense Account
          </button>
        </form>

        <p className="login-existing-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;