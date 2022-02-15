import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./login.css";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/loginService";
// step 1
const initialValues = {
    email: "",
    password: "",
}



// step 3
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password id required"),
})



const LoginForm = ({history}) => {
    const [error, setError] = useState(null);

    // step 2
    const onSubmit = async (values) => {
        try {
            const {data} = await loginUser(values);
            setError(null);
            history.push('/');
        } catch (error) {
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }
        }
    } 
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Link to="/signup" className="calltoLogin"><p>Not signup yet?</p></Link>
            </form>
        </div>
    );
}
 
export default withRouter(LoginForm);