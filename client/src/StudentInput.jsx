import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function StudentInput() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const navigate = useNavigate();
    const { collegeID } = useParams();

    // Fetch existing student details
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/students/${collegeID}`);
                if (response.data.success) {
                    setName(response.data.student.name);
                    setEmail(response.data.student.email);
                    setContactNumber(response.data.student.contactNumber);
                }
            } catch (error) {
                console.error("Error fetching student details", error);
            }
        };

        fetchStudentDetails();
    }, [collegeID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`http://localhost:3001/students/${collegeID}`, { name, email, contactNumber });
            alert("Details Updated Successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating details", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Update Student Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Name</strong></label>
                        <input type="text" value={name} placeholder="Enter Name" className="form-control rounded-0" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input type="email" value={email} placeholder="Enter Email" className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Contact Number</strong></label>
                        <input type="text" value={contactNumber} placeholder="Enter Contact Number" className="form-control rounded-0" onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default StudentInput;
