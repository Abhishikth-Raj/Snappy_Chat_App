import React,{useState, useEffect}from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link to another page
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import { registerRoute } from '../utils/APIroutes';

 function Register(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username : "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const toastOptions = {
         position: "bottom-right",
            autoclose: 7000,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark'
    }
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
            window.location.reload();
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents default refresh by the browser
        if(handleValidation()){
            console.log("in Validation", registerRoute);
            const {password,confirmPassword, username, email} = values;
            const {data} = await axios.post(registerRoute, {
                username, 
                email,
                password
            });
            
            if(data.status===false){
                toast.error(data.message, toastOptions);
            }
            if(data.status===true){
               localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                //this will be present in the local storage of the broswer session

                //passing the user object to the local storage and converting it to a string
                navigate("/"); 
                //if user is registered successfully,
                // or in other words the data is posted successfully, 
                //then redirect the user to the home page (chat page).
            }
        }
    };
    const handleValidation = (event) => {
        const {password, confirmPassword, username, email} = values;
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password should be the same.",{
            toastOptions
        });
            return false;
        } else if (username.length < 6){
            toast.error("Username should be atleast 6 characters long",toastOptions);
            return false;
        }
        else if (password.length < 8){
            toast.error("Password should be atleast 8 characters long",toastOptions);
            return false;
        }else if(!email){
            toast.error("Email is required", toastOptions);
            return false;
        }
        return true;
    }
    const handleChange = (event) => {
        setValues({...values, [event.target.name]:event.target.value});
    }; 

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [visiblePass, setVisiblePass] = useState(false);
    const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);
    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className = "brand">
                        <img src = {logo} alt = "Logo" />
                        <h1>Snappy</h1>
                    </div>
                    <input
                        type = "text"
                        placeholder = "Username"
                        name = "username"
                        onChange = {(e)=>handleChange(e)}
                    />
                    <input
                        type = "email"
                        placeholder = "Email"
                        name = "email"
                        onChange = {(e)=>handleChange(e)}
                    />
                    <div className = "password-container">
                        <input value = {password}
                            type = {visiblePass?"text":"password"}
                            id = "password"
                            name = "password"
                            placeholder = "password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleChange(e)}}
                            className='flex justify-between items-center'
                        />      

                        <i className='p-2 show-pass-icon' display = 'flex'  onClick = {()=>setVisiblePass(!visiblePass)}>
                            {visiblePass? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </i>
                    </div>
                    <div className = "password-container">
                        <input value = {confirmPassword}
                            type = {visibleConfirmPass?"text":"password"}
                            id = "confirmPassword"
                            name = "confirmPassword"
                            placeholder = "confirmPassword"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                handleChange(e)}}
                            className='flex justify-between items-center'
                        />      

                        <i className='p-2 show-pass-icon' display = 'flex'  onClick = {()=>setVisibleConfirmPass(!visibleConfirmPass)}>
                            {visibleConfirmPass? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </i>
                    </div>

                    <button type = "submit">Sign Up</button>
                    <span>Already have an account? <Link to = "/login">Login</Link></span>
                </form>

            </FormContainer>
            <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
    height: 100vh;
    width: 100wh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #071952;
    .brand{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: center;
        img{
            width: 5rem;
            height: 5rem;
        }
        h1{
            color: #fff;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color:#03051E;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #fff;
            width: 100%;
            fontsize: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }  
        .password-container{
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .show-pass-icon{
            position: absolute;
            right: 0;
            color: #fff;
            cursor: pointer;
            padding: 0.7rem;
        }
        button{
            background-color: #997af0;
            color: black;
            padding: 1rem;
            border: none;
            border-radius: 0.4rem;
            font-size: 1rem;
            cursor: pointer;
            text-transform: uppercase;
            transition: 0.3s ease-in-out;
            &:hover{
                outline: none;
                background-color: #4e0eff;
                color: #fff;
            }
        }
        span{
            color: #fff;
            text-align: center;
            a{
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }

`;    // Styled component

export default Register;
