import React from 'react'
import icon from '../images/icon.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get("http://localhost:5000/dropSession",{ withCredentials: true })
            .then(response => {
                navigate('/login');
            })
            .catch(error => {
                console.error('Error ', error);
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{paddingBlockStart: 0}}>
                <div className="container-fluid bg-warning">
                    <a className="navbar-brand" href="/home">
                        <img style={{ height: "65px" }} src={icon} alt="" />
                        <strong>Shopping Cart</strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {/* <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="/search">Search</a>
                            <a className="nav-link active" aria-current="page" href="/add">Add</a>
                        </div> */}
                    </div>

                    <div className="d-flex">
                        <button className="btn btn-outline-secondary me-2" type="button" onClick={() => window.location.href='/cart' }>Cart</button>
                        <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
