import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
const Reset = () => {

    const linkStyle = {
        textDecoration: 'none',
        color: 'black'
    }

    // Options
    const [dropdownOptions, setDropdownOptions] = useState({
        host: {},
        dbname: {},
        schema_user: {},
        selectedHost: '',
        selectedDbname: '',
        selectedSchemaUser: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                //  const ipAddress = '51.20.123.189'; 
                const ipAddress = window.location.hostname;
                //    const apiURL = `http://${ipAddress}:3000/userdbs`;

                const response = await fetch(`http://${ipAddress}:3000/userdbs`);
                //     const response = await fetch('http://[::1]:3000/userdbs');
                const data = await response.json();

                if (data && data.length > 0) {
                    const groupedData = {
                        host: {},
                        dbname: {},
                        schema_user: {},
                    };

                    data.forEach(item => {
                        if (!groupedData.host[item.host]) {
                            groupedData.host[item.host] = {};
                        }
                        if (!groupedData.host[item.host][item.dbname]) {
                            groupedData.host[item.host][item.dbname] = {};
                        }
                        if (!groupedData.host[item.host][item.dbname][item.schema_user]) {
                            groupedData.host[item.host][item.dbname][item.schema_user] = true;
                        }
                    });
                    setDropdownOptions({
                        host: groupedData.host,
                        dbname: {},
                        schema_user: {},
                        selectedHost: '',
                        selectedDbname: '',
                        selectedSchemaUser: '',
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);



    const handleHostChange = event => {
        const selectedHost = event.target.value;
        setDropdownOptions(prevState => ({
            ...prevState,
            selectedHost,
            selectedDbname: '',
            selectedSchemaUser: '',
            dbname: selectedHost ? dropdownOptions.host[selectedHost] : {},
            schema_user: {},
        }));
    };

    const handleDbnameChange = event => {
        const selectedDbname = event.target.value;
        setDropdownOptions(prevState => ({
            ...prevState,
            selectedDbname,
            selectedSchemaUser: '',
            schema_user: selectedDbname ? dropdownOptions.host[dropdownOptions.selectedHost][selectedDbname] : {},
        }));
    };

    const handleSchemaUserChange = event => {
        const selectedSchemaUser = event.target.value;
        setDropdownOptions(prevState => ({
            ...prevState,
            selectedSchemaUser,
        }));
    };

    const { host, dbname, schema_user, selectedHost, selectedDbname, selectedSchemaUser } = dropdownOptions;
    //Airflow
    const handleSubmit = async () => {
        //callAirflowAPI();
        const { selectedHost, selectedDbname, selectedSchemaUser } = dropdownOptions;
        if (selectedHost && selectedDbname && selectedSchemaUser) {
            Swal.fire({
                title: 'Reset Password',
                html: `<div style="display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                  <p style="flex: 1; text-align: left;"><strong>Host:</strong></p>
                  <p >${selectedHost}</p>
                </div>
                <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                  <p style="flex: 1; text-align: left;"><strong>Database:</strong></p>
                  <p >${selectedDbname}</p>
                </div>
                <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                  <p style="flex: 1; text-align: left;"><strong>Schema User:</strong></p>
                  <p >${selectedSchemaUser}</p>
                </div>
                <div style="display: flex; justify-content: space-between; width: 100%;">
                <p style="flex: 1; text-align: left;"><strong>Command:</strong></p>
                <p style="flex: 2; text-align: right; margin-left: 10px;">
                gdbacc -H ${selectedHost} -d ${selectedDbname} -S ${selectedSchemaUser} -o RESET -p XXXXXXXX
                </p>
              </div>
             </div>`,
                icon: 'success',
                confirmButtonText: 'OK',
            });


            try {
                const response = await fetch('http://13.49.104.89:8080/api/v1/dags/unlocking_Script/dagRuns', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        host: selectedHost,
                        dbname: selectedDbname,
                        schema_user: selectedSchemaUser,
                        newPassword: formik.values.newPassword,
                        remark: formik.values.remark,
                        opearation: ' new_password ',
                    }),
                });
                const data = await response.json();
                console.log('Response from Airflow API:', data);
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        } else {
            setError('Please select all options before submitting.');
        }
    };

    // function callAirflowAPI() {
    //     const url = 'http://192.168.2.127:8080/api/v1/dags/unlocking_Script/dagRuns';

    //     fetch(url)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             // Process the data received from the Airflow API
    //             console.log('Airflow API Response:', data);
    //         })
    //         .catch(error => {
    //             // Handle any errors that occur during the fetch
    //             console.error('Error fetching data from Airflow API:', error);
    //         });
    // }

    //validation
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const forbiddenWords = ['oracle'];



    const initialValues = {

        // host: '',
        // database: '',
        // schema: '',
        newPassword: '',
        remark: '',
    };

    const validationSchema = Yup.object({

        // host: Yup.string().required('Host is required'),
        // database: Yup.string().required('Database is required'),
        // schema: Yup.string().required('Schema is required'),
        remark: Yup.string().required('Madatory field to fill'),
        newPassword: Yup.string()
            .required('New Password is required')
            .min(8, 'New Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                'New Password must contain at least one letter, one number, and one special character'
            )
            .test('not-contains-username', 'Password must not contain your username', (value, context) => {
                const { username } = context.parent;
                if (typeof value === 'string' && typeof username === 'string') {
                    return !value.toLowerCase().includes(username.toLowerCase());
                }
                return true;
            })
            .test('not-contains-dbname', 'Password must not contain the database name', (value, context) => {
                const { database } = context.parent;
                if (typeof value === 'string' && typeof database === 'string') {
                    return !value.toLowerCase().includes(database.toLowerCase());
                }
                return true;
            })
            .test('not-contains-forbidden-words', 'Password must not contain forbidden words', (value) => {
                if (typeof value === 'string') {
                    const lowercaseValue = value.toLowerCase();
                    return !forbiddenWords.some((word) => lowercaseValue.includes(word));
                }
                return true;
            }),
    });
    const onSubmit = (values) => {
        // Handle form submission here
        console.log('Form submitted with values:', values);

    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    const [selectedValue, setSelectedValue] = useState('');
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const [system, setSystem] = useState('');
    const handleSystem = (event) => {
        setSystem(event.target.value);
    };
    return (
        <>
            <div className="container-fluid" style={{ color: 'white', padding: '4px', display: 'flex' }}>
                <Link to='/operations ' style={linkStyle}>
                    <h3 style={{ fontWeight: 'bolder' }}>Reset Password</h3>
                </Link>

            </div>
            <div className="container-fluid" style={{ width: '75vw', backgroundColor: 'white' }}>
                <div className="row" style={{ paddingTop: '20px' }}>
                    <div className="row" style={{ paddingBottom: '40px' }}>
                        <div className="col" >
                            <label htmlFor="dropdown"  >User:</label><br />
                            <select style={{ marginTop: '20px', width: '250px' }} name="" id="dropdown" onChange={handleSelectChange}>
                                <option>root</option>
                                <option>oracle</option>
                            </select>
                        </div>
                        <div className="col" >
                            <label htmlFor="dropdown">Syslogin : </label><br />
                            <select style={{ marginTop: '20px', width: '250px' }} name="" id="dropdown" onChange={handleSystem}>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="px-1">Host : </p>
                        <select onChange={handleHostChange} value={selectedHost} style={{ width: '250px' }}>
                            <option value="">Select a host</option>
                            {Object.keys(host).map(hostItem => (
                                <option key={hostItem} value={hostItem}>
                                    {hostItem}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <p className="px-1">Database :</p>
                        <select onChange={handleDbnameChange} value={selectedDbname} style={{ width: '250px' }}>
                            <option value="">Select a database</option>
                            {selectedHost &&
                                Object.keys(dbname).map(dbnameItem => (
                                    <option key={dbnameItem} value={dbnameItem}>
                                        {dbnameItem}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="col">
                        <p className="px-1">Schema : </p>
                        <select onChange={handleSchemaUserChange} value={selectedSchemaUser} style={{ width: '250px' }}>
                            <option value="">Select a schema user</option>
                            {selectedDbname &&
                                Object.keys(schema_user).map(schemaUserItem => (
                                    <option key={schemaUserItem} value={schemaUserItem}>
                                        {schemaUserItem}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: '10px' }}>
                    <div className="col">
                        <form onSubmit={formik.handleSubmit}>
                            <p className='px-1'>New Password :  </p>
                            <div className="password-input input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="New Password"
                                    name="newPassword"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <div className="text-danger">{formik.errors.newPassword}</div>
                            )}

                        </form>

                    </div>
                </div>
                <div className="row">
                    <div className=" col p-3">
                        <p className=''>Remark : </p>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ticket reference number needed "
                            name="remark"
                            value={formik.values.remark}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.remark && formik.errors.remark && (
                            <div className="text-danger">{formik.errors.remark}</div>
                        )}
                    </div>
                </div>
                <div className="row " style={{ paddingBottom: '25px' }}>
                    <div className="col text-center">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block mt-5"
                            disabled={!formik.isValid}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {/* <form onSubmit={formik.handleSubmit}>
                    <div className="container mt-5">
                        <div className="row">

                            <div className="col">
                                <p className='px-1'>Host : </p>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Host"
                                    name="host"
                                    value={formik.values.host}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.host && formik.errors.host && (
                                    <div className="text-danger">{formik.errors.host}</div>
                                )}
                            </div>
                            <div className="col">
                                <p className='px-1'>Database :</p>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Database"
                                    name="database"
                                    value={formik.values.database}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.database && formik.errors.database && (
                                    <div className="text-danger">{formik.errors.database}</div>
                                )}
                            </div>
                            <div className="col">
                                <p className='px-1'>Schema : </p>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Schema"
                                    name="schema"
                                    value={formik.values.schema}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.schema && formik.errors.schema && (
                                    <div className="text-danger">{formik.errors.schema}</div>
                                )}
                            </div>
                        </div>

                        <div className=" mt-5">
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={formik.handleSubmit}>
                                        <p className='px-1'>New Password :  </p>
                                        <div className="password-input input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder="New Password"
                                                name="newPassword"
                                                value={formik.values.newPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                </button>
                                            </div>
                                        </div>
                                        {formik.touched.newPassword && formik.errors.newPassword && (
                                            <div className="text-danger">{formik.errors.newPassword}</div>
                                        )}

                                    </form>

                                </div>
                            </div>
                        </div>
                       
                    </div>

            
           
        </form > */}

        </>
    )
}

export default Reset