import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter(0);
  const [data, setData] = useState();

  const login = () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const data = { email, password };

    fetch("api/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data);
          Cookies.set("token", data.token);
          router.push("viewProfile");
        } else {
          setData(data);
        }
      })
      .catch((e) => console.log("Error"));
  };

  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          Email
          <input className={styles.input} name="Email" id="login-email" />
        </div>
        <div className={styles.form}>
          Password
          <input
            className={styles.input}
            name="Password"
            id="login-password"
            type="password"
          />
        </div>
      </div>

      <h7
        style={{
          textAlign: "right",
          color: data?.success ? "green" : "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?.message}
      </h7>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={login}>
          Submit
        </button>
        <br />
        <button
          className={styles.button}
          onClick={() => router.push("register")}
        >
          Register
        </button>
        <br />
      </div>
    </div>
  );
};

export default Login;
