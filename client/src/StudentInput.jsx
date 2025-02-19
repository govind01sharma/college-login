import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentInput() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [resume, setResume] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Details Submitted");
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("contactNumber", contactNumber);
        formData.append("resume", resume);

        try {
            await axios.post("http://localhost:3001/updateStudent", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error submitting details", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Update Student Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" className="form-control rounded-0" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Contact Number</strong></label>
                        <input type="text" placeholder="Enter Contact Number" className="form-control rounded-0" onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Upload Resume</strong></label>
                        <input type="file" className="form-control rounded-0" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default StudentInput;
