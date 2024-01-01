import React from 'react'
import { Link } from 'react-router-dom'
const Monitor = () => {
  const DBA_FS = 'DBA_FS_value';
  const scriptText = `ssh <hostname> ${DBA_FS}/DBA/bin/chgdbspwd -d <database> -S <schema> -p <password>`;

  const boxStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    width: '50%',
    margin: '20px auto',
  };

  const preStyle = {
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
  };

    const linkStyle = {
        textDecoration: 'none',
        color:'black'
    };
  return (<>    <div className="className" style={{ color:'white', padding:'5px'}}>
   <Link to ='/' style={linkStyle}> <h2>Running Operation</h2></Link>
  
  </div>
  <div className="text-align-center">
  <h6 className='p-5'>Current Running Operation :</h6>
  </div>
   <div style={boxStyle}>
   <pre style={preStyle}>{scriptText}</pre>
 </div>
 </>

  )
}

export default Monitor