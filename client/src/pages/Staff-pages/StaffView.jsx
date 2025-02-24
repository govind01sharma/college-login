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

    // Function to extract the filename from the file path
    const getFilenameFromPath = (filePath) => {
        if (!filePath) return null;
        return filePath.split("/").pop(); // Extract the last part of the path
    };

    // Function to format the date and time
    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString(); // Format as local date and time
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Students List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Resume</th>
                        <th>Resume Upload Date and Time</th> {/* New column for resume upload date */}
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name || "N/A"}</td>
                            <td>{student.email}</td>
                            <td>{student.contactNumber || "N/A"}</td>
                            <td>
                                {student.resume ? (
                                    <a
                                        href={`http://localhost:3001/resume/${getFilenameFromPath(student.resume)}`}
                                        download
                                        className="btn btn-primary btn-sm"
                                    >
                                        Download Resume
                                    </a>
                                ) : (
                                    "No Resume"
                                )}
                            </td>
                            <td>{formatDateTime(student.resumeUploadDate)}</td> {/* Display formatted date and time */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StaffView;