import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

import Priveleges from './Components/Privileges/Priveleges';
import Operation from './Components/Operations/Operation';
import LogOut from './Components/LogOut';


//import SideBar from './Components/SideBar';
import Monitor from './Components/Monitor';
import CreatePriv from './Components/Privileges/CreatePriv';
import UpdatePriv from './Components/Privileges/UpdatePriv';
import airflowApi from './API/airflowApi';


import Admin from './Components/Admin';
import Unlock from './Components/Operations/Unlock';
import Reset from './Components/Operations/Reset';
import ViewPriv from './Components/Privileges/ViewPriv';
import DashBoard from './Components/DashBoard';
//import LandingPage from './Components/LandingPage';
import Layout from './Components/Layout';
import Login from './Components/Login';
import AccessDenied from './Components/AccessDenied';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'tester@123') {
      setLoggedIn({ loggedIn: true, role: 'admin' });
      alert('Login successful');
    } else if (username === 'operation' && password === 'tester@123') {
      setLoggedIn({ loggedIn: true, role: 'operation' });
      alert('Login successfull')
    }
    else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />

          {loggedIn.loggedIn ? (
            <Route path="/" element={<Layout />}>
              {/* Common routes for both admin and operation */}

              <Route path="dashboard" element={<DashBoard />} />

              <Route path="/operations" element={<Operation />} />
              <Route path='/unlock' element={<Unlock />} />
              <Route path='/reset' element={<Reset />} />
              <Route path='/monitor' element={<Monitor />} />
              <Route path='/logout' element={<LogOut setLoggedIn={setLoggedIn} />} />

              <Route path='/admin' element={<Admin />} />


              {/* Admin-specific routes */}
              {loggedIn.role === 'admin' && (
                <>
                  <Route path="/settings" element={<Priveleges />} />
                  <Route path='/create' element={<CreatePriv />} />
                  <Route path='/update' element={<UpdatePriv />} />
                  <Route path='/view' element={<ViewPriv />} />
                  <Route path='/admin' element={<Admin />} />
                </>
              )}

              {/* Operation-specific routes */}
              {loggedIn.role === 'operation' && (
                <>
                  {/* Add operation-specific routes here */}
                  <Route
                    path="/settings"
                    element={<AccessDenied message={
                      <>
                        Access Denied: Operation user cannot access Settings.
                        <br />
                       <h6>Contact ADMIN</h6> 
                      </>}
                    />}
                  />
                  <Route
                    path="/create"
                    element={<AccessDenied message={
                      <>
                        Access Denied: Operation user cannot access Settings.
                        <br />
                       <h6>Contact ADMIN</h6> 
                      </>}
                    />}
                  />

                </>
              )}
            </Route>
          ) : (
            <Route path="/*" element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
          )}
        </Routes>
      </Router>

    </>
  );
}

export default App;
