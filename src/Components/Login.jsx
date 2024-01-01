import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom';
const Login = ({ handleLogin, loggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, password);
    };

    if (loggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: '#e7e3e7' }}>
                <div className="row">
                    <div className="col-lg-6 d-flex justify-content-center align-items-center">
                        <div className="container p-5" style={{ width: '80%' }}>
                            <h4 style={{ fontWeight: 'bolder' }}>Welcome back!</h4>
                            <p>Happy to see you again!</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"

                                    style={{
                                        width: '100%',
                                        backgroundColor: 'purple', color: 'white', padding: '10px'
                                    }}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src="./images/cr6.png"
                            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                            alt="Your image"
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login