import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './log.css';
import { useFormik } from 'formik';
import loginSchema from './Schemas/loginSchema';
import { Button,TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import { addUser, addUserDetails } from './Store/masterSlice';
import { useDispatch } from 'react-redux';
import UserService from './Api'

const Login = () => {

  const navigate = useNavigate();

  const dispatch= useDispatch();

  const [role, setRole] = useState("user"); 
  const onOptionChange = (e) => {
      setRole(e.target.value);
    };
  const initialState = {

  email: "",
  password: "",
  
  }
   
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } = useFormik({
      initialValues: initialState,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
          console.log(values);
          eventLogin();
          action.resetForm();
      },
  })

  const eventLogin = async () => {
    try {
      const response = await UserService.loginUserWithEmailAndPassword(values);
      console.log(response);

      var res = response.data.message;

      if (res === "Login Success !") {
        const response1 = await UserService.getUserByEmail(values.email);

        dispatch(addUserDetails(response1.data))

        let timerInterval;
        Swal.fire({
          title: "Successfully LoggedIn !",
          html: "Redirecting in <b></b> milliseconds.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        setTimeout(() => {
          const data = {
            email: values.email,
            password: values.password,
          };
          dispatch(addUser(data));
          navigate("/");
        }, 3000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg'>
    <div className='bgclr'>
      <div className='uth-form' style={{ width: "20%", margin: "0 auto", marginTop: "150px" }}>
        <center><h2>Login</h2></center>
        <TextField
                            label="Email"
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            />
                            {errors.email && touched.email ? <p>{errors.email}</p> : null}
                        <br />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.password && touched.password ? <p>{errors.password}</p> : null}
                        <br />

          <button onClick={handleSubmit}>Log In</button>
          <button className='link-btn' onClick={() => navigate('/signup')}>  New to CLERA? Signup</button>
        
      </div>
    </div>
    </div>
  )
}
export default Login;