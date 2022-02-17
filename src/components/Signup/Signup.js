import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { signupUser } from "../../services/signupService";
import { useState } from "react";
import { useAuthActions } from "../../Providers/AuthProvider";

// step 1
const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    passwordConfirm: "",
}



// step 3
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(6,'Name length is not valid'),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required").matches(/^[0-9]{11}$/,'Invalid Phone Number').nullable(),
    password: Yup.string().required("Password id required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordConfirm: Yup.string().required("Password Confirmation is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
})

const SignupForm = ({history}) => {
    const setAuth = useAuthActions();
    const [error, setError] = useState(null);

    // step 2
    const onSubmit = async (values) => {
        const { name, email, phoneNumber, password } = values;
        const userData = {
            name,
            email,
            phoneNumber,
            password,
        }
        try{
            const {data} = await signupUser(userData);
            setAuth(data);
            //localStorage.setItem('authState' , JSON.stringify(data));
            history.push('/');
            console.log(data);
        } catch (error) {
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }
            console.log(error.response.message);
        }
        // axios
        //     .post('http://localhost:3001/users', values)
        //     .then((res) => console.log(res.data))
        //     .catch((err) => console.log(err));
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
                <Input formik={formik} name="name" label="name" />
                <Input formik={formik} name="email" label="Email" />
                <Input formik={formik} name="phoneNumber" label="Phone Number" type="tel"/>
                <Input formik={formik} name="password" label="Password" type="password"/>
                <Input formik={formik} name="passwordConfirm" label="Password Confimation" type="password"/>
                <button type="submit" disabled={!formik.isValid} className="btn primary" style={ { width:"100%" } }>sign up</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Link to="/login" className="calltoLogin"><p>Already signup?</p></Link>
            </form>
        </div>
    );
}
 
export default withRouter(SignupForm);