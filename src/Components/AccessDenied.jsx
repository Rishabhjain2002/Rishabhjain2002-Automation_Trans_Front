import React from 'react'

const AccessDenied = ({message}) => {
  return (
    <>
    <div style={{ textAlign: 'center',margin:'225px',marginLeft:'300px'}}>
    <h2>Access Denied</h2>
    <p>{message}</p>
  </div>
  </>
  )
}

export default AccessDenied