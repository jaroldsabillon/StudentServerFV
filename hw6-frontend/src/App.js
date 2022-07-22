/**
 * Creates the main page.
 * Porvides links for other functions.
 * imports all other components.
 * 
 */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddStudents from './components/AddStudents';
import DeleteStudent from './components/DeleteStudent';
import UpdateStudents from './components/UpdateStudents';      //imports all components to allow to use in Navbar
import SearchStudents from './components/SearchStudents';
import AllStudents from './components/AllStudents';
import Footer from './components/footer'

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';                          //Bootstrap classes
import { Container } from 'react-bootstrap';

/*
*Creates Nav bar to navigate to different functions
*/
function App() {
    return (
        <BrowserRouter>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >Student Data</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/AllStudents">All Students</Nav.Link>
                        <Nav.Link href="/addStudent">Add Student</Nav.Link>
                        <Nav.Link href="/deleteStudent">delete Student</Nav.Link>
                        <Nav.Link href="/updateStudents">Update Student</Nav.Link>
                        <Nav.Link href="/SearchStudents">Search Student</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/AllStudents" element={<AllStudents />} />
                <Route path="/addStudent" element={<AddStudents />} />
                <Route path="/deleteStudent" element={<DeleteStudent />} />
                <Route path="/updateStudents" element={<UpdateStudents />} />
                <Route path="/SearchStudents" element={<SearchStudents />} />
                
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
