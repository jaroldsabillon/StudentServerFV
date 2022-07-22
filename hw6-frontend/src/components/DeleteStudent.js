import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Footer from './footer'
import "../App.css";
import './design.css';
/**
 * Deletes student record or not found
 * @param {number} ID Can be either the student name or the students ID
 * @returns {object} { status: successful/failed } 
 */
function DeleteStudent() {
    const [ID, setID] = useState("");
    let [response, setResponse] = useState("");                     //Variables to update DOM with
    const [error, setError] = useState(null);
    let sendStudent = (e) => {
        e.preventDefault();
        console.log(response.message);
        setError(null);
        if (!ID) {
            setError("Please enter student ID");
        }
        else {
            axios.delete(`http://localhost:5678/students/${ID}`, {//sends to backend
                ID: ID
            })
                .then(function (response) {
                    // handle success
                    setID("");
                    setError(false);
                    setResponse(response.data)
                });
        }
    }
    return (
        <Form onSubmit={sendStudent}>
            <Form.Group className="mb-3" controlId="formID">
                <Form.Label>Student ID to delete</Form.Label>
                <Form.Control type="text" placeholder="John" name="id" value={ID}
                    onChange={(e) => { setID(e.target.value) }}
                />
            </Form.Group>
            <Button variant="primary" id="submit" type="submit" >
                Submit
            </Button>
            <br /> <br />
            <div> {response.message}</div>
            <Footer />
        </Form>
    )
}
export default DeleteStudent;
