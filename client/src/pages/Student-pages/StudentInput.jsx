import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/StudentInput.css"

function StudentInput() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [resume, setResume] = useState(null);
    const navigate = useNavigate();
    const { collegeID } = useParams();

    // Fetch existing student details
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getStudentByCollegeID/${collegeID}`);
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
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('contactNumber', contactNumber);
        if (resume) {
            formData.append('resume', resume);
        }

        try {
            await axios.put(`http://localhost:3001/updateStudent/${collegeID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Details Updated Successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error updating details", error);
        }
    };

    return (
        <div className="student-input-container">
            <div className="student-input-box">
                <h2>Update Student Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Name</strong></label>
                        <input type="text" value={name} placeholder="Enter Name" className="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input type="email" value={email} placeholder="Enter Email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Contact Number</strong></label>
                        <input type="text" value={contactNumber} placeholder="Enter Contact Number" className="form-control" onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label><strong>Resume (PDF only)</strong></label>
                        <input type="file" accept="application/pdf" className="form-control" onChange={(e) => setResume(e.target.files[0])} />
                    </div>
                    <button type="submit" className="btn btn-success submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default StudentInput;
