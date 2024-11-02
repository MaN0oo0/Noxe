import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

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
  // old version of validateField v 1.0
  // const validateField = (name, value) => {
  //   if (!value) {
  //     return `${name.replace(/([A-Z])/g, " $1")} is required`;
  //   }
  //   if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
  //     return "Email is invalid";
  //   }
  //   return "";
  // };
  // new version of vaildationFormData v 1.1
  const vaildationFormData = () => {
    //password ==> (?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{6,}
    ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{6,}$/
    const schema = Joi.object({
      firstName: Joi.string().alphanum().required().min(2).max(12),
      lastName: Joi.string().alphanum().required().min(2).max(12),
      userName: Joi.string().alphanum().required().min(2).max(12),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update user state
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // // Call your validation function
    // ValidtionOnChange();

    // const { name, value } = e.target;
    // console.log(name, value);

    // let MyUser = { ...user };
    // MyUser[name] = value;
    // setUser(MyUser);
    // console.log(user);

    // setUser((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
    // old version of set error v 1.0
    // setErrors((prev) => ({
    //   ...prev,
    //   [name]: validateField(name, value),
    // }));

    // new version of set error v 1.1
    // ValidtionOnChange();
    // console.log(joiError);
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    const { error } = vaildationFormData();
    // new version of submit v 1.1
    if (error) {
      console.log(error);
      setjoiError(error.details.map((item) => item.message));
    } else {
      try {
        const { response } = await axios.post(
          "https://localhost:7103/api/Auth/Register",
          user
        );
        console.log(response);

        navigate("/login");
      } catch (error) {
        console.error("Registration failed:", error);
        setResError(error.response);
      }
    }

    // old version of submit v 1.0
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
                {e}
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
        <div className="d-flex justify-content-center">
        
          <div className="w-100 d-flex justify-content-start">
            <Link to={"/login"} className="text-decoration-none">
              Have A Account ? login 😉
            </Link>
          </div>
          <div className="w-100 d-flex justify-content-end">
            <button className="btn btn-info">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}
