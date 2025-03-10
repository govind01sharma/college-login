import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/Signup.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !role) {
            toast.error("One or more fields is missing/empty.");
            return;
        }


        axios.post('http://localhost:3001/auth/register', { name, email, password, role })
            .then(result => {
                if (result.data.success) {
                    toast.success("Registration successful!")
                    navigate('/login');
                } else {
                    toast.error(result.data.message);
                }
            })
            .catch(err => {
                console.error("Error:", err);
                toast.error("An error occurred. Please try again.");
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="name" className="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="text" placeholder="Enter Email" autoComplete="off" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3 password-input-container">
                        <label htmlFor="password"><strong>Password</strong></label>
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
                    <div className="mb-3">
                        <label htmlFor="role"><strong>Role</strong></label>
                        <select name="role" className="form-control" onChange={(e) => setRole(e.target.value)} value={role}>
                            <option value="Student">Student</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Register</button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/login" className="btn login-btn">Login</Link>
            </div>
        </div>
    );    
}

export default Signup;