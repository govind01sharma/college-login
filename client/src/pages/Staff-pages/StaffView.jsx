import { useState, useEffect } from "react";
import axios from "axios";

function StaffView() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/students")
            .then(response => {
                if (response.data.success) {
                    setStudents(response.data.students);
                } else {
                    alert("Failed to fetch students");
                }
            })
            .catch(error => {
                console.error("Error fetching students:", error);
                alert("An error occurred while fetching students.");
            });
    }, []);

    const getFilenameFromPath = (filePath) => {
        if (!filePath) return "N/A";
        return filePath.split("/").pop();
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-75">
                <h2 className="mb-4 text-center">Students List</h2>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Resume</th>
                            <th>Resume Upload Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr key={student._id}>
                                    <td>{student.name || "N/A"}</td>
                                    <td>{student.email}</td>
                                    <td>{student.contactNumber || "N/A"}</td>
                                    <td>
                                        {student.resume ? (
                                            <a href={`http://localhost:3001/resume/${getFilenameFromPath(student.resume)}`} 
                                               download className="btn btn-primary btn-sm">
                                                Download Resume
                                            </a>
                                        ) : "No Resume"}
                                    </td>
                                    <td>{formatDateTime(student.resumeUploadDate)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StaffView;