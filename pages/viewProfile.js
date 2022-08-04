import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const ViewProfile = () => {
  const router = useRouter();
  const [id, setId] = useState();
  const [profile, setProfile] = useState();
  const logout = () => {
    Cookies.remove("token");
    router.push("login");
  };

  useEffect(() => {
    const verifyUser = () => {
      const token = Cookies.get("token");
      if (!token) {
        Cookies.remove("token");
        router.push("/");
      }
      try {
        const decoded = jwt.verify(token, "lupiya");
        setId(decoded.id);
      } catch (e) {
        console.log("Error: ", e);
        Cookies.remove("token");
        router.push("/");
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    const getUser = () => {
      if (id) {
        fetch("api/getUser", {
          method: "POST",
          body: JSON.stringify(id),
        })
          .then((res) => res.json())
          .then((data) => setProfile(data.user));
      }
    };
    getUser();
  }, [id]);
  return (
    <>
      {profile ? (
        <div className={styles.container}>
          <h1 style={{ textAlign: "center" }}>Profile</h1>
          <div className={styles.profile}>
            <div>
              <h2 style={{ textAlign: "left" }}>Name</h2>
              {profile?.name}
            </div>
            <br />
            <div>
              <h2>Email</h2>
              {profile?.email}
            </div>
            <div>
              <h2>Gender</h2>
              {profile?.gender}
            </div>
            <br />
            <br />
            <br />
            <div className={styles.buttonContainer}>
              <button
                onClick={() => router.push("updateProfile")}
                className={styles.button}
              >
                Update Profile
              </button>
              <br />{" "}
              <button onClick={logout} className={styles.button}>
                Logout
              </button>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewProfile;
