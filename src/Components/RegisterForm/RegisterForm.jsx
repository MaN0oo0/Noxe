import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import axios from "axios";

export default function RegisterForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
  });

  const [errors, setErrors] = useState({});
  const [responseError, setResError] = useState({});
  const validateField = (name, value) => {
    if (!value) {
      return `${name.replace(/([A-Z])/g, " $1")} is required`;
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Email is invalid";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    const newErrors = {
      firstName: validateField("firstName", user.firstName),
      lastName: validateField("lastName", user.lastName),
      email: validateField("email", user.email),
      userName: validateField("userName", user.userName),
      password: validateField("password", user.password),
    };

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        const response = await axios.post(
          "https://localhost:7103/api/Auth/Register",
          user
        );
        document.forms[0].reset();
        // Optionally reset the form or redirect the user
      } catch (error) {
        console.error("Registration failed:", error);
        setResError(error.response);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-75 m-auto py-4">
      <h2>Registration Form</h2>
      <ul>
        {responseError &&
          responseError.data.trim().split(".").map((e) => {
            return (
              e !== "" && (
                <li className="text-danger" key={e}>
                  {e}
                </li>
              )
            );
          })}
      </ul>

      <form onSubmit={submitFormData}>
        {["firstName", "lastName", "userName", "email", "password"].map(
          (field) => (
            <div className={`${styles.input_data}`} key={field}>
              <label htmlFor={field} className="form-label">
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                onChange={handleInputChange}
                type={field === "password" ? "password" : "text"}
                className="form-control"
                name={field}
                id={field}
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
                value={user[field]}
              />
              {errors[field] && <p className="text-danger">{errors[field]}</p>}
            </div>
          )
        )}
        <div className="w-100 d-flex justify-content-end">
          <button className="btn btn-info">Register</button>
        </div>
      </form>
    </div>
  );
}
