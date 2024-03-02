import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Product() {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    quantity: "",
    files: null,
    category: "",
  };

  // State to hold category options
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1536/category/all")
      .then((response) => {
        setCategories(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number()
      .positive("Must be a positive number")
      .typeError("Must be a number")
      .integer("Must be an integer")
      .required("Required"),
    quantity: Yup.number()
      .positive("Cannot be negative")
      .typeError("Must be a number")
      .required("Required"),

    files: Yup.mixed(),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("category", values.category);

      // Append each file to the formData
      if (values.files) {
        for (let i = 0; i < values.files.length; i++) {
          formData.append("image", values.files[i]);
        }
      }

      const response = await axios.post(
        "http://localhost:1536/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "saaaaaaaa");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Handle file change
  const handleFileChange = (event) => {
    formik.setFieldValue("files", event.currentTarget.files);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="shadow-lg p-5 rounded">
       <div className="text-center"><img src="images/logo.png"/></div>
        <form onSubmit={formik.handleSubmit}>
          <label className="d-block" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
          <br />
          <label className="d-block" htmlFor="description">
            Description:{" "}
          </label>
          <textarea
            className="form-control"
            id="description"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
          <br />
          <label className="d-block" htmlFor="price">
            Price: $
          </label>
          <input
            className="form-control"
            type="number"
            id="price"
            {...formik.getFieldProps("price")}
          />
          {formik.touched.price && formik.errors.price ? (
            <div>{formik.errors.price}</div>
          ) : null}
          <br />
          <label className="d-block" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="form-control"
            type="number"
            id="quantity"
            {...formik.getFieldProps("quantity")}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div>{formik.errors.quantity}</div>
          ) : null}
          <br />
          <label className="d-block" htmlFor="category">
            Category:{" "}
          </label>
          <select
            className="form-control"
            id="category"
            {...formik.getFieldProps("category")}
            onBlur={formik.handleBlur}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}
          <br />
          <input
            className="form-control"
            type="file"
            name="files"
            id="files"
            multiple
            onChange={handleFileChange}
          />
          <button className="form-control btn btn-success mt-4" type="submit">
            Add to Store
          </button>
        </form>
      </div>
      </div>
  
  
  );
}

export default Product;
