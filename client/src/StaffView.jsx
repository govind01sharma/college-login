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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StaffView;