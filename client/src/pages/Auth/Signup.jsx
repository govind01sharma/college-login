import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student"); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !role) {
            setError("One or more fields is missing/empty.");
            alert("One or more fields is missing/empty.");
            return;
        }

        setError("");

        axios.post('http://localhost:3001/register', { name, email, password, role })
            .then(result => {
                if (result.data.success) {
                    navigate('/login');
                } else {
                    setError(result.data.message);
                }
            })
            .catch(err => {
                console.error("Error:", err);
                setError("An error occurred. Please try again.");
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="name" className="form-control rounded-0" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="text" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role"><strong>Role</strong></label>
                        <select name="role" className="form-control rounded-0" onChange={(e) => setRole(e.target.value)} value={role}>
                            <option value="Student">Student</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0">Login</Link>
            </div>
        </div>
    );
}

export default Signup;
