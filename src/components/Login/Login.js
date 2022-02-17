import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./login.css";
import { Link, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/loginService";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password id required"),
});

const LoginForm = ({ history }) => {
  const setAuth = useAuthActions();
  const auth = useAuth();
  const [error, setError] = useState(null);
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      setError(null);
      history.push(redirect);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="container formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="Email" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
          style={{ width: "100%" }}
        >
          login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/signup?redirect=${redirect}`} className="calltoLogin">
          <p>Not signup yet?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
