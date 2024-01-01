import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Form, Button, FormGroup, FormLabel } from 'react-bootstrap';
const CreatePriv = () => {
  //for  radio box
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState('');

  const handleStatusClick = () => {
    setShowStatus(true);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };


  const [tableRows, setTableRows] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const handleCreate = async () => {
    console.log(formData);
    try {
      const dataToSend = {
        ad_user: formData.ad_user,
        host: formData.host,
        dbname: formData.dbname,
        schema_user: formData.schema_user,
        active: status === 'Active' ? true : false // Convert 'Active' to true and 'Inactive' to false
    };
      const ipAddress = window.location.hostname; 
      const response = await fetch(`http://${ipAddress}:3000/userdbs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Data sent and response received:', responseData);
      alert('Saved Successfully')
      setFormData({
        ad_user: '',
        host: '',
        dbname: '',
        schema_user: '',
        active:'',
      });
      setTableRows([...tableRows, formData]);
      setFormData({ ad_user: '', host: '', dbname: '', schema_user: '' });
      setFormVisible(false);


    } catch (error) {
      console.error('Error creating data', error);
    }
  };
  const [formData, setFormData] = useState({ ad_user: '', host: '', dbname: '', schema_user: '' ,active:' '});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const linkStyle = {
    textDecoration: 'none',
    color: 'black'
  };
  return (
    <>
      <div className="container" style={{  color: 'white', padding: '5px' }}>
        <Link to='/settings' style={linkStyle}> <h4 style={{fontWeight:'bolder'}}>Create Privileges</h4></Link>

      </div>
      <div className="container-fluid p-4" style={{backgroundColor:'white', width:'75vw'}}>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Label>AD User : </Form.Label>
              <Form.Control type="text" name="ad_user" placeholder="AdName" value={formData.ad_user} onChange={handleInputChange} />
            </Col>
            <Col>
              <Form.Label>Host : </Form.Label>
              <Form.Control type="text" name="host" placeholder="Host" value={formData.host} onChange={handleInputChange} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label>Database : </Form.Label>
              <Form.Control type="text" name="dbname" placeholder="Database" value={formData.dbname} onChange={handleInputChange} />
            </Col>
            <Col>
              <Form.Label>Schema : </Form.Label>
              <Form.Control type="text" name="schema_user" placeholder="Schema" value={formData.schema_user} onChange={handleInputChange} />
            </Col>
          </Row>
          <Row className="mb-3 py-3">
            <Col className="text-center">
              <Button variant="info" onClick={handleStatusClick}>Status</Button>
            </Col>
          </Row>

          {showStatus && (
            <FormGroup>
              <FormLabel className=''>Status:</FormLabel>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    type="radio"
                    label="Active"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    value="Active"
                    checked={status === "Active"}
                    onChange={handleStatusChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Inactive"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    value="Inactive"
                    checked={status === "Inactive"}
                    onChange={handleStatusChange}
                  />
                </Col>
              </Row>
            </FormGroup>
          )}

          <Row className="mb-3 py-3">
            <Col className="text-center">
              <Button variant="primary" onClick={handleCreate}>Save</Button>
            </Col>
          </Row>
        </Form>
      </div>


    </>
  )
}

export default CreatePriv