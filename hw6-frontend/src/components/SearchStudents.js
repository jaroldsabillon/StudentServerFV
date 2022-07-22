import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import "../App.css";
import './design.css';

/**
 * Returns student record or not found
 * @param {string} record_id Can be either the student name or the students ID
 * @returns {object} { first_name: firstname
 *                     last_name : lastname
 *                     gpa: gpa 
 *                     enrolled: enrollment
 *                     status: successful/failed } 
 */
function SearchStudent() {
  const [ID, setID] = useState("");
  const [response, setResponse] = useState("");
  const [Data, setData] = useState([]);                         //Variables to update DOM with
  const [error, setError] = useState(null);
  let sendStudent = (e) => {
    e.preventDefault();
    console.log("Searching Student");
    setError(null);
    if (!ID) {
      setError("Please enter ID or name");
    }
    else {
      axios.get(`http://localhost:5678/students/${ID}`).then((response) => {     //connects to backend
        setData(response.data);
        setResponse(response.message);
      })
        .then(function (response) {
          // handle success
          setError(false);
          setData(response.data)        //Student information to be displayed
          setID("");              //ResetsID

          console.log(response.data);
        }).catch(function (error) {
         // handle error
          if (error.response.status == 400) {
            console.log(error);
            setID("");                    //empties field after submit
            setError("Cant find record")
          }
          else {
            setError("Unexpected Error")
          }

        })
    }
  }
  return (

    /*
   * Form fields to enter student name or ID
   *
   */
    <Form onSubmit={sendStudent}>
      <Form.Group className="mb-3" controlId="formID">
        <Form.Label>Enter Student name or ID to retrieve</Form.Label>
        <Form.Control type="text" placeholder="John" name="id" value={ID}     /*Input fields*/
          onChange={(e) => { setID(e.target.value) }}/>
      </Form.Group>
      <Button variant="primary" id="submit" type="submit" >
        Submit
      </Button>
      <br /> <br /><div>

        {Data && (!Data.length || Data.length === 0) && 
        <p>Student was not found</p>}                          
        {Data && Data.length > 0 && <>
          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>GPA</th>
                <th>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {
                Data.map(res => {
                  return (
                    <tr key={res._id}>
                      <td>{res._id}</td>
                      <td>{res.first_name}</td>
                      <td>{res.last_name}</td>          
                      <td>{res.gpa}</td>
                      <td>{res.enrolled}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </>}
      </div>
    </Form>
  )
}
export default SearchStudent;
