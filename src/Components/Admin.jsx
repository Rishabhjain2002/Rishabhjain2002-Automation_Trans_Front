import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Admin = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'black'
    };
    
    const [tableRows, setTableRows] = useState([]);

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

    useEffect(() => {
        fetchTableData();
    }, []);

    const toggleStatus = (index) => {
        const updatedRows = [...tableRows];
        updatedRows[index].active = !updatedRows[index].active;
        setTableRows(updatedRows);
    };

    const saveChanges = () => {
        // Implement your logic to save changes to the server here
        console.log('Saving changes:', tableRows);
        alert('Data Changed Successfully')
    };

    return (
        <>
         <div className="className" style={{ backgroundColor: 'white', color: 'white', padding: '5px' }}>
            <Link to='/update' style={linkStyle}> <h2>Admin</h2></Link>
        </div>
        {fetchTableData}
            
            <div className="container p-5">
                <table className='p-2 table table-striped table-bordered' style={{ backgroundColor: 'white' }}>
                    <thead className='table-dark'>
                        <tr>
                            <th className='px-5'>AD_User</th>
                            <th className='px-5'>Host</th>
                            <th className='px-5'>Database</th>
                            <th className='px-5'>Schema</th>
                            <th className='px-5'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='px-5'>{row?.ad_user}</td>
                                <td className='px-5'>{row?.host}</td>
                                <td className='px-5'>{row?.dbname}</td>
                                <td className='px-5'>{row?.schema_user}</td>
                                <td className='px-5'>
                                    <button onClick={() => toggleStatus(rowIndex)}>
                                        {row?.active ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={saveChanges} >Save</button>
            </div>
        </>
    );
};

export default Admin;
