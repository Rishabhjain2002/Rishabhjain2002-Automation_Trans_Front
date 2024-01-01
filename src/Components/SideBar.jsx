import React from 'react'
import { AiTwotoneHome, AiFillContacts } from 'react-icons/ai'
import { GiAbstract002 } from 'react-icons/gi'
import { BiLogOutCircle, BiBarChartAlt } from 'react-icons/bi'
import { FiMonitor } from 'react-icons/fi'
import { IoSettingsSharp } from 'react-icons/io5'

import { Link } from 'react-router-dom';

const SideBar = () => {
    const handleLogout =()=>{
        alert('Successully Logged Out');
    }

    return (
        <>
            <nav id="sidebar" className="" style={{ backgroundColor: 'white' }}>
                <div className="position-sticky">
                    <ul className="nav flex-column">
                        <div className="navbar">
                            <h4 style={{ backgroundColor: 'white', color: 'rgb(231 67 109)', padding: '15px', fontWeight: 'bolder' }}>translab.io</h4>
                        </div>

                        <div className="sidebar">
                            <div className="p-1">
                                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                                    <h5><AiTwotoneHome /> Dashboard</h5>
                                </Link>
                            </div>


                            <div className='p-1' style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/operation" style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                        <h5 style={{ color: '#5e5757', margin: 0 }}><GiAbstract002 /> Operations</h5>
                                    </button>
                                </Link>
                            </div>

                                        <div className='p-1' style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link to="/priveleges" style={{ textDecoration: 'none' }}>
                                                <button style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}>
                                                    <h5 style={{ color: '#5e5757', margin: 0 }}><IoSettingsSharp /> Settings</h5>
                                                </button>
                                            </Link>
                                        </div>
                            <div className='p-1' style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/monitor" style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                        <h5 style={{ color: '#5e5757', margin: 0 }}><FiMonitor /> Monitor</h5>
                                    </button>
                                </Link>
                            </div>

                            <div className='p-1' style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/logout" style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                        <h5 style={{ color: '#5e5757', margin: 0 }}><BiLogOutCircle /> Log-Out</h5>
                                        
                                    </button>
                                    
                                </Link>
                            </div>
                        </div>

                    </ul>
                </div>
            </nav >
        </>
    )
}

export default SideBar