import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import "../../styles/Login.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const result = await axios.post('http://localhost:3001/auth/login', { email, password });
            
            if (result.data.success) {
                toast.success("Login successful!");
                if (result.data.role === "Student") {
                    navigate(`/updateStudent/${result.data.collegeID}`);
                } else if (result.data.role === "Staff") {
                    navigate('/staff');
                }
            } else {
                toast.error(result.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred during login.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            placeholder="Enter Email" 
                            autoComplete="off" 
                            name="email" 
                            className="form-control" 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3 password-input-container">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Enter Password" 
                                name="password" 
                                className="form-control" 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <span 
                                className="password-toggle-icon" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success login-button">Login</button>
                </form>
                <p>Don't Have an Account?</p>
                <Link to="/register" className="btn signup-button">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;
