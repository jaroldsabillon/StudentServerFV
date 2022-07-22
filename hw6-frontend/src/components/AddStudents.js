import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import "../App.css";
import './design.css';


/**
 * Returns whether new student record was created or if there is a duplicate
 * @param {string} first_name firstname
 * @param {string} last_name lastname
 * @param {number} gpa gpa of student
 * @param {boolean} enrolled enrollment status
 * @returns {object} { ID: 123456
 *                      status: successful/failed } 
 */
function AddStudent() {

  let [first_name, setFirst_name] = useState("");
  let [last_name, setLast_name] = useState("");
  let [gpa, setgpa] = useState("");                           //Variables to update DOM with
  let [enrolled, setEnrolled] = useState("");
  let [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  let sendStudent = (e) => {
    e.preventDefault();
    console.log(first_name, last_name, gpa, enrolled);
    console.log(response.message);
    setError(null);
    if ((!last_name && !first_name) || (!last_name || !first_name)) {     //checks that fields have input
      setError("Please enter first name and last name");
    }
    else {
      axios.post('http://localhost:5678/students',        //sends to backend
        {
          first_name: first_name,
          last_name: last_name,
          gpa: gpa,
          enrolled: enrolled,
        })

        .then(function (response) {
          // handle success
          setFirst_name("");
          setLast_name("");           /*  Resets input fields */
          setgpa("");
          setEnrolled("");
          setError(false);
          setResponse(response.data)

        });
    }
  }
  return (
    /*
     * Form fields to enter student information
     *
     */
    <Form onSubmit={sendStudent}>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="John" name="first_name" value={first_name}
          onChange={(e) => { setFirst_name(e.target.value) }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" name="last_name" value={last_name}
          onChange={(e) => { setLast_name(e.target.value) }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGpa">
        <Form.Label>Gpa</Form.Label>
        <Form.Control type="number" placeholder="4.00" name="gpa" value={gpa}
          onChange={(e) => { setgpa(e.target.value) }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check if enrolled" value='false' onChange={(e) => { setEnrolled("true") }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check if not enrolled" value='false' onChange={(e) => { setEnrolled("false") }} />
      </Form.Group>

      <Button variant="primary" id="submit" type="submit" >
        Submit
      </Button>
      <br /> <br />
      <div> {response.message}</div>

    </Form>

  )
}

export default AddStudent;