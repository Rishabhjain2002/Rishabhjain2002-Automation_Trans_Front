import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Priveleges = () => {
  //update buttonsss


  // below different code 
  const [formData, setFormData] = useState({ ad_user: '', host: '', dbname: '', schema_user: '', active: ' ' });
  const [tableRows, setTableRows] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  //these all are for modals

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showTable, setShowTable] = useState(false);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    console.log(formData);
    try {
      const ipAddress = window.location.hostname; 
      const response = await fetch(`http://${ipAddress}:3000/userdbs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
        active: '',
      });
      setTableRows([...tableRows, formData]);
      setFormData({ ad_user: '', host: '', dbname: '', schema_user: '', active: '' });
      setFormVisible(false);


    } catch (error) {
      console.error('Error creating data', error);
    }
  };
  // const responseData = await response.json();
  //  console.log('Data sent and response received:', responseData);

  // Update your table or data as needed
  // setTableRows([...tableRows, formData]);
  // setFormData({ ad_user: '', host: '', dbname: '', schema_user: '' });
  // setFormVisible(false);
  // alert('Data Created successfully')
  const fetchTableData = async () => {

    try {
      const response = await fetch('http://[::1]:3000/userdbs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTableRows(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };
  /*
  const createTable =async () =>{
    try{
      const response = await fetch('/api');
      if(!response.ok){
        throw new Error('Network response not ok');
      }
      const data =await response.json();

    }
  }
*/
  const call = () => {
    setShowTable(true);
    fetchTableData();
  }
  const linkStyle = {
    textDecoration: 'none', color: 'black'
  }
  return (
    <>

      <div className='container-fluid' style={{ color: 'white', padding: '4px', display: 'flex' }}>
        <Link to='/settings' style={linkStyle}>  <h2 >Privileges </h2></Link>
      </div>
      <div className="container p-5" style={{ backgroundColor: 'white', width: '75vw', height: '350px' }} >
        <div className="nav-item p-3 ">
          <Link to='/create' style={{ textDecoration: 'none' }}> <button className="nav-link btn btn p-2" style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'whitesmoke', width: '100px' }} >Create</button></Link>

        </div>
        <div className="nav-item p-3" >

          <Link to='/update' style={{ textDecoration: 'none' }}>  <button className="nav-link btn btn  p-2 " style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'whitesmoke', width: '100px' }} onClick={handleShow} >Update</button></Link>


        </div>
        <div className="nav-item p-3">
          <Link to='/view' style={{ textDecoration: 'none' }}>
            <button className="nav-link btn btn p-2" style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'whitesmoke', width: '100px' }} onClick={call}>View</button>
          </Link>

        </div>
      </div>

      {/* <main className="container col-md-11 ms-sm-auto">
        <div className="col-md-2 py-2 d-flex flex-column" style={{ margin: '20px', padding: '10px' }}>
        {showTable && 
          <table className='p-2 table table-striped t able-bordered' style={{backgroundColor:'white'}}>
            <thead className='table-dark'>
              <tr >
                <th className='px-5'>AD_User</th>
                <th className='px-5'>Host</th>
                <th className='px-5'>Database</th>
                <th className='px-5'>Schema</th>
                <th className='px-5'>Status</th>
              </tr>
            </thead>
            <tbody>


              { // in curly braces requires to return in circular braces wil be don without return
                tableRows.map((row, rowIndex) => (
                  <tr>
                    <td className='px-5'>{row?.ad_user}</td>
                    <td className='px-5'>{row?.host}</td>
                    <td className='px-5'>{row?.dbname}</td>
                    <td className='px-5'>{row?.schema_user}</td>
                    <td className='px-5'>{row?.active ? 'Active' : 'Inactive'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
}
        </div>
      </main> */}
    </>
  )
}

export default Priveleges