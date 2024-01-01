import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const LogOut = ({setLoggedIn}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedIn(false); 
    navigate('/login'); 
};
  
  return (
    <>
  <div className="className" style={{ color:'white', padding:'5px'}}>
   
    <h2 style={{color:'black'}}>Are you Confirm you want to Log-Out ?</h2>
   <button style={{backgroundColor:'red', marginTop:'10px',padding:'5px'}} onClick={handleLogout}>Logout</button>
  
  </div>
 
    
  </>
  )
}

export default LogOut