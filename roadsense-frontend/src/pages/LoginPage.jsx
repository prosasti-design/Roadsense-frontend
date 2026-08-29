import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const DEMO_OTP_MODE = true;
import "./LoginPage.css";
function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("citizen");
  const [citizenLoginMethod, setCitizenLoginMethod] = useState("email");

  const [formData, setFormData] = useState({
    identifier: "",
    officialEmail: "",
    employeeId: "",
    password: "",
    otp: "",
  });

  const [otpRequested, setOtpRequested] = useState(false);
  const [demoOtp, setDemoOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function normalisePhone(phone) {
    return phone.replace(/\D/g, "");
  }

  function loginUser(user) {
    const { password, ...safeUserData } = user;

    localStorage.setItem("roadSenseRole", user.role);

    localStorage.setItem(
      "roadSenseProfile",
      JSON.stringify(safeUserData)
    );

    navigate("/dashboard");
  }

  function resetMessages() {
    setErrorMessage("");
    setSuccessMessage("");
  }

  function changeRole(newRole) {
    setRole(newRole);
    setOtpRequested(false);
    setDemoOtp("");
    resetMessages();

    setFormData({
      identifier: "",
      officialEmail: "",
      employeeId: "",
      password: "",
      otp: "",
    });
  }

  function changeCitizenLoginMethod(method) {
    setCitizenLoginMethod(method);
    setOtpRequested(false);
    setDemoOtp("");
    resetMessages();

    setFormData({
      ...formData,
      identifier: "",
      password: "",
      otp: "",
    });
  }

  async function requestPhoneOtp() {
    resetMessages();

    const phoneNumber = normalisePhone(formData.identifier);

    if (phoneNumber.length < 8) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("roadSenseUsers") || "[]"
    );

    const citizenUser = users.find((user) => {
      return (
        user.role === "citizen" &&
        normalisePhone(user.phone || "") === phoneNumber
      );
    });

    if (!citizenUser) {
      setErrorMessage(
        "No citizen account is registered with this phone number. Please sign up first."
      );
      return;
    }

    setIsSendingOtp(true);

    try {
      if (DEMO_OTP_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 700));

        const generatedOtp = String(
          Math.floor(100000 + Math.random() * 900000)
        );

        setDemoOtp(generatedOtp);
        setOtpRequested(true);

        setSuccessMessage(
          `OTP sent successfully to your mobile number ending in ${phoneNumber.slice(-4)}.`
        );

        alert(
          `RoadSense Demo OTP: ${generatedOtp}\n\nThis alert is only for hackathon demonstration. In production, this OTP will be sent through SMS.`
        );
      } else {
        const response = await fetch("/api/auth/otp/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phoneNumber,
          }),
        });

        if (!response.ok) {
          throw new Error("OTP could not be sent.");
        }

        setOtpRequested(true);

        setSuccessMessage(
          `OTP sent successfully to your mobile number ending in ${phoneNumber.slice(-4)}.`
        );
      }
    } catch (error) {
      setErrorMessage(
        "OTP could not be sent. Please try again after a few seconds."
      );
    } finally {
      setIsSendingOtp(false);
    }
  }

  async function verifyPhoneOtp() {
    resetMessages();

    if (formData.otp.trim().length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    const phoneNumber = normalisePhone(formData.identifier);

    const users = JSON.parse(
      localStorage.getItem("roadSenseUsers") || "[]"
    );

    const citizenUser = users.find((user) => {
      return (
        user.role === "citizen" &&
        normalisePhone(user.phone || "") === phoneNumber
      );
    });

    if (!citizenUser) {
      setErrorMessage("Citizen account was not found.");
      return;
    }

    try {
      if (DEMO_OTP_MODE) {
        if (formData.otp.trim() !== demoOtp) {
          setErrorMessage("Incorrect OTP. Please try again.");
          return;
        }

        loginUser(citizenUser);
      } else {
        const response = await fetch("/api/auth/otp/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phoneNumber,
            otp: formData.otp.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("OTP verification failed.");
        }

        loginUser(citizenUser);
      }
    } catch (error) {
      setErrorMessage(
        "OTP verification failed. Please request a new OTP and try again."
      );
    }
  }

  function loginCitizenWithEmail() {
    resetMessages();

    if (!formData.identifier.trim() || !formData.password.trim()) {
      setErrorMessage("Please enter email address and password.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("roadSenseUsers") || "[]"
    );

    const citizenUser = users.find((user) => {
      return (
        user.role === "citizen" &&
        user.email?.toLowerCase() ===
          formData.identifier.trim().toLowerCase() &&
        user.password === formData.password
      );
    });

    if (!citizenUser) {
      setErrorMessage(
        "Citizen account not found. Check your email and password, or sign up."
      );
      return;
    }

    loginUser(citizenUser);
  }

  function loginGovernmentOfficial() {
    resetMessages();

    if (
      !formData.officialEmail.trim() ||
      !formData.employeeId.trim() ||
      !formData.password.trim()
    ) {
      setErrorMessage(
        "Please enter official email, employee ID, and password."
      );
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("roadSenseUsers") || "[]"
    );

    const governmentUser = users.find((user) => {
      return (
        user.role === "admin" &&
        user.email?.toLowerCase() ===
          formData.officialEmail.trim().toLowerCase() &&
        user.employeeId?.toLowerCase() ===
          formData.employeeId.trim().toLowerCase() &&
        user.password === formData.password
      );
    });

    if (!governmentUser) {
      setErrorMessage(
        "Government account not found. Check official credentials or sign up."
      );
      return;
    }

    loginUser(governmentUser);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (role === "admin") {
      loginGovernmentOfficial();
      return;
    }

    if (citizenLoginMethod === "email") {
      loginCitizenWithEmail();
      return;
    }

    verifyPhoneOtp();
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-heading">
          <p className="login-label">ROADSENSE SECURE ACCESS</p>
          <h1>Login to RoadSense</h1>
          <p>
            Access citizen services or the government road operations system.
          </p>
        </div>

        <div className="role-tabs">
          <button
            type="button"
            className={
              role === "citizen" ? "role-tab active-role-tab" : "role-tab"
            }
            onClick={() => changeRole("citizen")}
          >
            Citizen Login
          </button>

          <button
            type="button"
            className={
              role === "admin" ? "role-tab active-role-tab" : "role-tab"
            }
            onClick={() => changeRole("admin")}
          >
            Government Login
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {role === "citizen" ? (
            <>
              <div className="login-method-box">
                <p>Choose citizen login method</p>

                <div className="login-method-options">
                  <label>
                    <input
                      type="radio"
                      name="citizenLoginMethod"
                      value="email"
                      checked={citizenLoginMethod === "email"}
                      onChange={() => changeCitizenLoginMethod("email")}
                    />
                    Email and Password
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="citizenLoginMethod"
                      value="phone"
                      checked={citizenLoginMethod === "phone"}
                      onChange={() => changeCitizenLoginMethod("phone")}
                    />
                    Phone Number and OTP
                  </label>
                </div>
              </div>

              {citizenLoginMethod === "email" ? (
                <>
                  <div className="input-group">
                    <label htmlFor="identifier">Email Address</label>

                    <input
                      id="identifier"
                      name="identifier"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.identifier}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="password">Password</label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="input-group">
                    <label htmlFor="identifier">Registered Phone Number</label>

                    <input
                      id="identifier"
                      name="identifier"
                      type="tel"
                      placeholder="Example: 9876543210"
                      value={formData.identifier}
                      onChange={handleChange}
                      disabled={otpRequested}
                    />
                  </div>

                  {!otpRequested ? (
                    <button
                      type="button"
                      className="send-otp-button"
                      onClick={requestPhoneOtp}
                      disabled={isSendingOtp}
                    >
                      {isSendingOtp ? "Sending OTP..." : "Send OTP"}
                    </button>
                  ) : (
                    <>
                      <div className="otp-info-box">
                        <strong>OTP Sent</strong>
                        <p>
                          Enter the 6-digit verification code sent to your
                          registered mobile number.
                        </p>
                      </div>

                      <div className="input-group">
                        <label htmlFor="otp">Enter 6-Digit OTP</label>

                        <input
                          id="otp"
                          name="otp"
                          type="text"
                          inputMode="numeric"
                          maxLength="6"
                          placeholder="Example: 123456"
                          value={formData.otp}
                          onChange={handleChange}
                        />
                      </div>

                      <button
                        type="button"
                        className="resend-otp-button"
                        onClick={requestPhoneOtp}
                        disabled={isSendingOtp}
                      >
                        {isSendingOtp ? "Sending..." : "Resend OTP"}
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <div className="government-login-note">
                <strong>Government Officer Access</strong>
                <p>
                  Use your official department email, employee ID, and
                  password.
                </p>
              </div>

              <div className="input-group">
                <label htmlFor="officialEmail">Official Email Address</label>

                <input
                  id="officialEmail"
                  name="officialEmail"
                  type="email"
                  placeholder="officer@department.gov"
                  value={formData.officialEmail}
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

              <div className="input-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {errorMessage && <p className="login-error">{errorMessage}</p>}
          {successMessage && (
            <p className="login-success">{successMessage}</p>
          )}

          {(role === "admin" ||
            citizenLoginMethod === "email" ||
            otpRequested) && (
            <button type="submit" className="login-submit-button">
              {role === "admin"
                ? "Login as Government Official"
                : citizenLoginMethod === "email"
                ? "Login as Citizen"
                : "Verify OTP and Login"}
            </button>
          )}
        </form>

        <p className="signup-text">
          New to RoadSense? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;