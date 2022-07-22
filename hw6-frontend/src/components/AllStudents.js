import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import "../App.css";
import './design.css';
/**
 * Returns all student records
 * @returns {object} { first_name: firstname
 *                     last_name : lastname
 *                     gpa: gpa 
 *                     enrolled: enrollment
 *                     full_name: firstnameLastname
 *                      } 
 */
function AllStudents() {
    const [ID, setID] = useState("null");
    const [response, setResponse] = useState("");
    const [Data, setData] = useState([]);                           //Variables to update DOM with
    const [error, setError] = useState(null);
    let sendStudent = (e) => {
        e.preventDefault();
        console.log(response.message);
        console.log(response.data);
        console.log("Attempted");
        setError(null);
        axios.get(`http://localhost:5678/students/${ID}`).then((response) => {//sends to backend
            setData(response.data);
        })
    }
    return (
        <Form onSubmit={sendStudent}>
            <Button variant="primary" id="submit" type="submit" >
                Get All Students
            </Button>
            <div> {response.message}</div>
            <br /> <br />
            {
                Data.map((val, key) => {
                    while (true) {
                        return <div key={key} className="data-container">
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>GPA</th>
                                    <th>Enrolled</th>
                                </tr>
                                <tr>
                                    <td>{val._id}</td>
                                    <td>{val.first_name}</td>
                                    <td>{val.last_name}</td>
                                    <td>{val.gpa}</td>
                                    <td>{val.enrolled}</td>
                                </tr>

                            </table>

                        </div>
                    }
                })
            }
        </Form>
    )
}
export default AllStudents;