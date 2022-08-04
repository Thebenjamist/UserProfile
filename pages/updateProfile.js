import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const UpdateProfile = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [id, setId] = useState();

  const updateProfile = () => {
    const name = document.getElementById("update-name").value;
    const gender = document.getElementById("update-gender").value;

    const data = { name, gender, id };

    fetch("api/update", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        if (data.success) {
          router.push("viewProfile");
        }
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      Cookies.remove("token");
      router.push("/");
    }
    try {
      const decoded = jwt.verify(token, "lupiya");
      setId(decoded.id);
    } catch (e) {
      Cookies.remove("token");
      router.push("/");
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center" }}>Update Profile</h1>
      <div className={styles.formContainer}>
        Name
        <input name="Name" className={styles.input} id="update-name" />
        Gender
        <input name="Gender" className={styles.input} id="update-gender" />
      </div>

      <br />
      <br />
      <body
        style={{ textAlign: "center", color: data?.success ? "green" : "red" }}
      >
        {data?.message}
      </body>
      <br />
      <div className={styles.buttonContainer}>
        <button onClick={updateProfile} className={styles.button}>
          Submit
        </button>
        <br />
        <button
          onClick={() => router.push("viewProfile")}
          className={styles.button}
        >
          Back to Profile
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default UpdateProfile;
