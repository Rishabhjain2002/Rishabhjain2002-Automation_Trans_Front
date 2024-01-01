import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { PieChart } from '@mui/x-charts/PieChart';
const DashBoard = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black'
  };
  const [button, setButton] = useState('false');
  const [buttons, setButtons] = useState('false');
  const toggleButton = () => {
    setButton((prevIsButtonOn) => !prevIsButtonOn);
  };
  const handleToggle = () => {
    setButton(!button);
  };
  const toggleButtons = () => {
    setButtons((prevIsButtonOn) => !prevIsButtonOn);
  };
  const handleToggles = () => {
    setButtons(!buttons);
  };
  return (
    <>
      <div className="container" style={{ color: 'white', padding: '4px', display: 'flex' }}>
        <Link to="/dashboard" style={linkStyle}>
          <h4></h4>
        </Link>
      </div>

  
        <div className="row" style={{backgroundColor:'white', width:'1050px'}}>
          <div className="col">
          
            <div className="container">
            <h4 >Unlock Account History</h4>
              <table className='p-2 table table-striped table-bordered'>
                <thead>
                  <tr>
                    <th>Users</th>
                    <th>Total </th>
                    <th>SUCCESS</th>
                    <th>PENDING</th>
                    <th>FAILURE </th>
                   
                  </tr>
                </thead>
                <tbody style={{ padding: '3px' }}>
                  <tr>
                    <td>1</td>
                    <td>6</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                 
                  </tr>
                </tbody>

              </table>

              <div style={{ marginTop: '20px', marginRight: '20px' }}>
                <Switch
                  checked={button}
                  onChange={handleToggle}
                  inputProps={{ 'aria-label': 'controlled' }}

                />
                {button ? 'Turn off' : 'Graph view'}

                {button &&
                  <div className="conatainer" style={{ backgroundColor: 'white', display: 'inline-block' }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 1, label: 'Failed ' },
                            { id: 2, value: 1, label: 'Pending' },
                            { id: 1, value: 2, label: 'Success' },

                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                      colors={['red', '#47e547', 'orange']}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="col">
          
            <div className="container">
            <h4>Reset Account History</h4>
              <table className='p-2 table table-striped table-bordered'>
                <thead>
                  <tr>
                  <th>Users</th>
                    <th>Total </th>
                    <th>SUCCESS</th>
                    <th>PENDING</th>
                    <th>FAILURE </th>
                    
                  </tr>
                </thead>
                <tbody style={{ padding: '3px' }}>
                  <tr>
                    <td>1</td>
                    <td>6</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                    
                  </tr>
                </tbody>

              </table>

              <div style={{ marginTop: '20px', marginRight: '20px' }}>
                <Switch
                  checked={buttons}
                  onChange={handleToggles}
                  inputProps={{ 'aria-label': 'controlled' }}

                />
                {buttons ? 'Turn off' : 'Graph view'}

                {buttons &&
                  <div className="container" style={{ backgroundColor: 'white', display: 'inline-block' }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 1, label: 'Failed ' },
                            { id: 2, value: 1, label: 'Pending' },
                            { id: 1, value: 2, label: 'Success' },

                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                      colors={['red', '#47e547', 'orange']}
                    />
                  </div>
                }
              </div>



            </div>
          </div>
        </div>
  
        <div className="container-fluid" style={{width:'1050px'}} >
        <table className="p-2 table table-striped table-bordered" style={{ backgroundColor: 'white', marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th className="px-5">AD User</th>
                    <th className="px-5">Date</th>
                    <th className="px-5">Time</th>
                    {/* <th className="px-5">Successful/Unsuccessful</th> */}
                    <th className="px-5">Status</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white' }}>
                  <td style={{ marginLeft: '50px' }}>NO OPERATIONS AVAILABLE</td>
                </tbody>
              </table>
        </div>
      

    </>
  );
};

export default DashBoard;
