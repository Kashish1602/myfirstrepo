import axios from "axios";
import React, { useState } from "react";

function Navbar() {
  const [brandName, setbrandName] = useState("");
  const [logoLink, setlogoLink] = useState("");
  const [title, setTitle] = useState("");
  const [titleLink, setTitleLink] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:1536/navbar/create", {
        brandName,
        logoLink,
        title,
        titleLink,
        status,
      });
      console.log(response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="shadow-lg p-4 rounded w-50">
        <div className="text-center">
          <img src="images/logo.png" alt="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <label className="d-block" htmlFor="email">
            Brand Name
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            value={brandName}
            onChange={(e) => setbrandName(e.target.value)}
            required
          />

          <label className="d-block" htmlFor="email">
            Logo Link
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            value={logoLink}
            onChange={(e) => setlogoLink(e.target.value)}
            required
          />

          <label className="d-block" htmlFor="email">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label className="d-block" htmlFor="email">
            Title Link
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            value={titleLink}
            onChange={(e) => setTitleLink(e.target.value)}
            required
          />

          <label className="d-block" htmlFor="email">
            Status
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn btn-success d-block w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
