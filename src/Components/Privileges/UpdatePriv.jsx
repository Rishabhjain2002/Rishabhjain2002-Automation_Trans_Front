import React from 'react'


import { Link } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
const UpdatePriv = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'black'
    };
    return (<>
        <div className="className" style={{color: 'white', padding: '5px' }}>
            <Link to='/settings' style={linkStyle}> <h3 style={{fontWeight:'bolder'}}>Privileges : Update</h3></Link>
        </div>
        <div className="container p-5" style={{width:'75vw', backgroundColor:'white'}}>
        <Form>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Host Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Host Name" />
                </Col>
                <Col>
                    <Form.Label>Database</Form.Label>
                    <Form.Control type="text" placeholder="Enter Database" />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Form.Label>Schema</Form.Label>
                    <Form.Control type="text" placeholder="Enter Schema" />
                </Col>
                <Col>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" />
                </Col>
            </Row>
            <Row className="mb-3 py-4">
                <Col className="">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
        </div>
    </>
    )
}

export default UpdatePriv