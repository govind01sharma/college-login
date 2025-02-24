import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/Login.css";  // Import CSS

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const result = await axios.post('http://localhost:3001/login', { email, password });
            
            if (result.data.success) {
                if (result.data.role === "Student") {
                    navigate(`/updateStudent/${result.data.collegeID}`);
                } else if (result.data.role === "Staff") {
                    navigate('/staff');
                }
            } else {
                alert(result.data.message);
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred during login.");
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
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            name="password" 
                            className="form-control" 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
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
