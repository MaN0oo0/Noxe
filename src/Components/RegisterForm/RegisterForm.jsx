import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi, { allow } from "joi";

export default function RegisterForm() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
  });

  const [errors, setErrors] = useState({});
  const [responseError, setResError] = useState({});
  const [joiError, setjoiError] = useState([]);
  const validateField = (name, value) => {
    if (!value) {
      return `${name.replace(/([A-Z])/g, " $1")} is required`;
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Email is invalid";
    }
    return "";
  };
  const vaildationFormData = () => {
    const schema = Joi.object({
      firstName: Joi.string().min(2).max(12).required(),
      lastName: Joi.string().min(2).max(12).required(),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{6,}$"))
        .messages({
          "string.pattern.base":
            "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one special character.",
          "string.min": "Password must be at least 8 characters long.",
        }),
      userName: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(joiError);

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    // setErrors((prev) => ({
    //   ...prev,
    //   [name]: validateField(name, value),
    // }));
    if (vaildationFormData().error) {
      setjoiError(vaildationFormData().error.details);
    }
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    if (vaildationFormData().error) {
      setjoiError(vaildationFormData().error.details);
    }
    // const newErrors = {
    //   firstName: validateField("firstName", user.firstName),
    //   lastName: validateField("lastName", user.lastName),
    //   email: validateField("email", user.email),
    //   userName: validateField("userName", user.userName),
    //   password: validateField("password", user.password),
    // };

    // if (Object.values(newErrors).every((error) => !error)) {
    //   try {
    //     const response = await axios.post(
    //       "https://localhost:7103/api/Auth/Register",
    //       user
    //     );
    //     navigate("/login");
    //   } catch (error) {
    //     console.error("Registration failed:", error);
    //     setResError(error.response);
    //   }
    // } else {
    //   setErrors(newErrors);
    // }
  };

  return (
    <div className="w-75 m-auto py-4">
      <h2>Registration Form</h2>
      <ul>
        {responseError &&
          responseError.data &&
          responseError.data
            .trim()
            .split(".")
            .map((e, i) => {
              return (
                e !== "" && (
                  <li className="text-danger" key={i}>
                    {e}
                  </li>
                )
              );
            })}
      </ul>
      <ul>
        {joiError.length > 0 &&
          joiError &&
          joiError.map((e, i) => {
            return (
              <li className="text-danger" key={i}>
                {e.message}
              </li>
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
