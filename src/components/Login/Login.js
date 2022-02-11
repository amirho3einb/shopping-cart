import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./login.css";
import { Link } from "react-router-dom";
// step 1
const initialValues = {
    email: "",
    password: "",
}

// step 2
const onSubmit = (values) => {
    console.log(values);
    // axios
    //     .post('http://localhost:3001/users', values)
    //     .then((res) => console.log(res.data))
    //     .catch((err) => console.log(err));
} 

// step 3
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password id required"),
})



const LoginForm = () => {

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
                <Input formik={formik} name="password" label="Password" type="password"/>
                <button type="submit" disabled={!formik.isValid} className="btn primary" style={ { width:"100%" } }>login</button>
                <Link to="/signup" className="calltoLogin"><p>Not signup yet?</p></Link>
            </form>
        </div>
    );
}
 
export default LoginForm;