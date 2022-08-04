import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Register = () => {
  const router = useRouter();
  const [data, setData] = React.useState();

  const register = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("password").value;

    const data = { name, email, gender, password };

    if (name != "" && email != "" && gender != "" && password != "") {
      fetch("api/register", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          if (data?.success) {
            router.push("login");
          }
        });
    } else {
      setData({ message: "Please fill in all fields" });
    }
  };

  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <div className={styles.formContainer}>
        Name
        <input type="text" name="Name" id="name" className={styles.input} />
        <br />
        Email
        <input type="text" name="Email" id="email" className={styles.input} />
        <br />
        Gender
        <input type="text" name="Gender" id="gender" className={styles.input} />
        <br />
        Password
        <input
          type="password"
          name="Password"
          id="password"
          className={styles.input}
        />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h7
          style={{
            textAlign: "center",
            color: data?.success ? "green" : "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data?.message}
        </h7>
      </div>
      <br />

      <div className={styles.buttonContainer}>
        <button onClick={register} className={styles.button}>
          Submit
        </button>
        <br />
        <button onClick={() => router.push("login")} className={styles.button}>
          Cancel
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Register;
