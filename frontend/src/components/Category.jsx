import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Category() {
  const initialValues = {
    name: "",
    description: "",
    file: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed().required("File is required"),
  });

  const onSubmit = async (values) => {
    try {
      // const formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("description", values.description);
      // formData.append("image", values.file);
      // console.log(formData);

      const data = {
        name: values.name,
        description: values.description,
        image: values.file,
      };

      const response = await axios.post(
        "http://localhost:1536/category/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="shadow-lg p-5 rounded">
       <div className="text-center"><img src="images/logo.png"/></div>
      <form onSubmit={formik.handleSubmit}>
        <label className="d-block" htmlFor="name">Name</label>
        <input className="form-control"
          type="text"
          name="name"
          id="name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <br />

        <label className="d-block" htmlFor="description">Description</label>
        <textarea  className="form-control"
          name="description"
          id="description"
          {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <br />
        <br />

        <input className="form-control"
          type="file"
          name="file"
          onChange={(event) =>
            formik.setFieldValue("file", event.currentTarget.files[0])
          }
        />
        {formik.errors.file && formik.touched.file ? (
          <div>{formik.errors.file}</div>
        ) : null}
        <br />
        <button type="submit" className="btn btn-success d-block w-100">Submit</button>
      </form>
    </div>
    </div>
   
  );
}

export default Category;
