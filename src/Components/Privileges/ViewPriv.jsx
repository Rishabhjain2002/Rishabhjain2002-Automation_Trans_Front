import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { Col, Row, Form, Button, FormGroup, FormLabel, Dropdown } from 'react-bootstrap';
const ViewPriv = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'black'
    };
    //dropdown
    const [dropdownOptions, setDropdownOptions] = useState({
        ad_user: [],
        host: [],
        dbname: [],
        schema_user: []
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    //changes
    const [selectedAdUser, setSelectedAdUser] = useState('');
    const handleAdUser = (option) => {
        setFormData({ ...formData, ad_user: option });
        setSelectedAdUser(option);
    };
    const [selectedHost, setSelectedHost] = useState(null);
    const handleHost = (option) => {
        setFormData({ ...formData, host: option });
        setSelectedHost(option);
    };
    const [selectedDatabase, setSelectedDatabase] = useState(null);
    const handleDb = (option) => {
        console.log('Option selected:', option);
        setFormData({ ...formData, dbname: option });
        setSelectedDatabase(option);
    };
    const [selectedSchema, setSelectedSchema] = useState(null);
    const handleSchema = (option) => {
        setFormData({ ...formData, schema_user: option });
        setSelectedSchema(option);
    }
    const [fetchedResult, setFetchedResult] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const [open, setOpen] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleSubmission = async () => {
        handleConsole();
        setOpen(true);
        try {
            const ipAddress = window.location.hostname;
            const response = await fetch(`http://${ipAddress}:3000/userdbs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedValue: selectedValue,
                }),
            });
            const data = await response.json();

            setFetchedResult(data.active); // Assuming 'active' is the column you want to fetch
        } catch (error) {
            console.error('Error fetching result:', error);
        }

    };
    const handleSelection = (event) => {
        setSelectedValue(event.target.value);
    };
    //console
    const handleConsole = () => {
        console.log('Selected AD User:', selectedAdUser);
        console.log('Selected Host:', selectedHost);
        console.log('Selected Database:', selectedDatabase);
        console.log('Selected Schema:', selectedSchema);
        // console.log("Fetched Result:", fetchedResult);
    };

    useEffect(() => {
        const allDropdownsSelected = selectedAdUser && selectedHost && selectedDatabase && selectedSchema;
        setIsSubmitDisabled(!allDropdownsSelected);
      }, [selectedAdUser, selectedHost, selectedDatabase, selectedSchema]);



    useEffect(() => {
     
        const fetchData = async () => {
            try {
                const response = await fetch('http://[::1]:3000/userdbs');
                const data = await response.json();

                if (data && data.length > 0) {
                    const adUsers = data.map(item => item.ad_user);
                    const groupedData = {};
                    data.forEach(item => {
                        if (!groupedData[item.ad_user]) {
                            groupedData[item.ad_user] = {};
                        }
                        if (!groupedData[item.ad_user][item.host]) {
                            groupedData[item.ad_user][item.host] = {};
                        }
                        if (!groupedData[item.ad_user][item.host][item.dbname]) {
                            groupedData[item.ad_user][item.host][item.dbname] = [];
                        }
                        if (!groupedData[item.ad_user][item.host][item.dbname].includes(item.schema_user)) {
                            groupedData[item.ad_user][item.host][item.dbname].push(item.schema_user);
                        }
                    });

                    console.log('groupedData:', groupedData); // Add this line to log the groupedData

                    setDropdownOptions({
                        ad_user: adUsers,
                        host: groupedData,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }; fetchData();
    }, []
    );


    const [formData, setFormData] = useState({ ad_user: '', host: '', dbname: '', schema_user: '', active: ' ' });

    return (
        <>
            <div className="className" style={{ color: 'white', padding: '5px' }}>
                <Link to='/settings' style={linkStyle}> <h4>View Status</h4></Link>

            </div>
            <div className="container m-2 p-5 " style={{ width: '75vw',backgroundColor: 'white' }} >
                <Form>
                    <div className="container-fluid" style={{  backgroundColor: 'white' }}>
                        <div className="row" style={{ paddingTop: '20px' }}>
                            <div className="col">
                                <div>
                                    <label htmlFor="adUserSelect">AD User :</label>
                                </div>
                                <div>
                                    <select id="adUserSelect" onChange={(e) => handleAdUser(e.target.value)} value={selectedAdUser} style={{ width: '250px' , marginTop:'10px'}}>
                                        <option value="">Select Here</option>
                                        {[...new Set(dropdownOptions.ad_user)].map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col">
                                <div>
                                    <label htmlFor="hostSelect">Host :</label>
                                </div>
                                <div>
                                    <select id="hostSelect" onChange={(e) => handleHost(e.target.value)} value={selectedHost} style={{ width: '250px', marginTop:'10px'}}>
                                        <option value="">Select Here</option>
                                        {selectedAdUser &&
                                            dropdownOptions.host[selectedAdUser] &&
                                            Object.keys(dropdownOptions.host[selectedAdUser]).map((key, index) => (
                                                <option key={index} value={key}>
                                                    {key}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: '20px' }}>
                            <div className="col">
                                <div>
                                    <label htmlFor="databaseSelect">Database :</label>
                                </div>
                                <div>
                                    <select id="databaseSelect" onChange={(e) => handleDb(e.target.value)} value={selectedDatabase} style={{ width: '250px', marginTop:'10px'}}>
                                        <option value="">Select Here</option>
                                        {selectedAdUser &&
                                            selectedHost &&
                                            dropdownOptions.host[selectedAdUser] &&
                                            dropdownOptions.host[selectedAdUser][selectedHost] &&
                                            Object.keys(dropdownOptions.host[selectedAdUser][selectedHost]).map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <label htmlFor="schemaSelect">Schema :</label>
                                </div>
                                <div>
                                    <select id="schemaSelect" onChange={(e) => handleSchema(e.target.value)} value={selectedSchema} style={{ width: '250px' , marginTop:'10px'}}>
                                        <option value="">Select Here</option>
                                        {dropdownOptions.host[selectedAdUser] &&
                                            dropdownOptions.host[selectedAdUser][selectedHost] &&
                                            dropdownOptions.host[selectedAdUser][selectedHost][selectedDatabase] &&
                                            dropdownOptions.host[selectedAdUser][selectedHost][selectedDatabase].map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {open && (
                        <>
                            {fetchedResult !== null ? (
                                <div>Result: Inactive {fetchedResult}</div>

                            ) : (
                                <div>Result: No data available</div>
                            )}
                        </>
                    )} */}
                    {open && (
                        <div className="container">
                            <div className="row mt-4">
                                <div className="col">
                                    <table className="table table-bordered">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>AD User</th>
                                                <th>Host</th>
                                                <th>Database</th>
                                                <th>Schema</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{selectedAdUser}</td>
                                                <td>{selectedHost}</td>
                                                <td>{selectedDatabase}</td>
                                                <td>{selectedSchema}</td>
                                                <td>Inactive</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="container pt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="primary" onClick={handleSubmission} disabled={isSubmitDisabled}>Submit</Button>

                    </div>
                </Form>
            </div>
        </>
    )
}

export default ViewPriv