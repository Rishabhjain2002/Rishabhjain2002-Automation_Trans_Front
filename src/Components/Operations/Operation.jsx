import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Operation = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'black'
  };

  return (
    <>
      <div className="container-fluid" style={{  color: 'white', padding: '4px', display: 'flex' }}>   <Link to='/operations ' style={linkStyle}>
        <h2>Operations: </h2></Link>
        <div className="container m-1 px-2" >
          <button style={{ backgroundColor: '#3A3166' , marginRight:'10px', width:'140px'}}><Link to='/unlock' style={{textDecoration:'none',color:'white'}}> Unlock Account</Link> </button>
          <button style={{ backgroundColor: '#FC5F6C' , width:'140px'}}><Link to='/reset' style={{textDecoration:'none',color:'white'}}> Reset Password</Link></button>
        </div>
      </div>
      
    </>
  );
};

export default Operation;
