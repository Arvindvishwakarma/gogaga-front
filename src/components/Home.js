import React, { useState, useEffect, useRef } from 'react'
import Spinner from './Spinner'
import { Jumbotron, Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { FaUserAlt, FaLocationArrow } from "react-icons/fa";
import Fade from 'react-reveal/Fade';

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


export default function Home() {

    const [validated, setValidated] = useState(false);
    const [spin, setSpin] = useState(false)
    const [spinbtn, setSpinbtn] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [enterData, setEnterData] = useState([])

    useEffect(() => {
        fetchActiveData()
    }, [enterData])


    let name = useRef(null)
    let location = useRef(null)

    function fetchActiveData() {
        setSpin(true)
        fetch("http://localhost:4000/users")
            .then(res => res.json())
            .then(
                (result) => {
                    setAllUser(result);
                    setSpin(false)
                }
            )
            .catch(err => {
                console.log(err);
                setSpin(false)
            });
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            setSpinbtn(true)

            const Name = name.current.value
            const Location = location.current.value


            fetch('http://localhost:4000/users', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": Name,
                    "location": Location
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setEnterData(result)
                        setSpinbtn(false)
                    }
                )
                .catch(err => {
                    console.log(err);
                    setSpinbtn(false)
                });


        }

        setValidated(true);
    };

    return (
        <div>
            <Fade top>
                <Jumbotron style={{ padding: '30px' }}>
                    <h1 style={{ textAlign: 'center' }}>GoGaga Internship Assignment</h1>
                </Jumbotron></Fade>

            <Container>
                <Row>
                    <Col>
                        <Fade left><Card style={{ height: '400px' }}>
                            <Card.Body>
                                <Card.Title>Enter Details</Card.Title>
                                <br />
                                <br />
                                <br />
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Name"
                                                ref={name}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">Please Enter Name</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Location"
                                                ref={location}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">Please Enter Location</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>
                                    {
                                        spinbtn ? <center><Spinner /></center> :
                                            <Button type="submit" className="mx-auto d-block">Submit</Button>
                                    }

                                </Form>
                            </Card.Body>
                        </Card></Fade>
                    </Col>

                    <Col>
                        <Fade right><Card style={{ height: '400px' }} className="details">
                            <Card.Body>
                                <Card.Title> Details</Card.Title>
                                {
                                    spin ? <center><Spinner /></center> :
                                        <BootstrapTable data={allUser} striped hover>
                                            <TableHeaderColumn isKey dataField='name' style={{ display: 'hidden' }}><FaUserAlt/> Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='location' filter={{ type: 'TextFilter', delay: 1000 }}><FaLocationArrow/> Search Location</TableHeaderColumn>
                                        </BootstrapTable>
                                }


                            </Card.Body>
                        </Card></Fade>
                    </Col>
                </Row>

                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
