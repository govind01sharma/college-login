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

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Students List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name || "N/A"}</td>
                            <td>{student.email}</td>
                            <td>{student.contactNumber || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StaffView;
