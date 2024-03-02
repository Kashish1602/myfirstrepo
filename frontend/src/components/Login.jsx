import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:1536/login", {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      if(error.response.data.message === "User not found")
      {
        alert("No user with this email was found.");
      }
      else  if(error.response.data.message === "Incorrect password")
      {
        alert("Incorrect Password");
      }
      console.log("error : ", error);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="shadow-lg p-4 rounded w-25">
        <div className="text-center">
          <img src="images/logo.png" alt="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <label className="d-block" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />

          <label className="d-block" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <br />
          <br />
          <select className="form-control">
            <option>Admin</option>
            <option>Client</option>
          </select> */}
          <br />
          <button type="submit" className="btn btn-success d-block w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
