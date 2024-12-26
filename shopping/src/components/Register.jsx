import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const backgroundImageStyle = {
        backgroundImage: "url(https://t3.ftcdn.net/jpg/02/90/89/76/360_F_290897614_7RdAsk2GmumcGWZ2qklmV74hKlNmznSx.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 1,
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",  // Smaller padding for responsiveness
    };

    const [input, changeInput] = useState({
        email: "",
        password: "",
        repassword: ""
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
        repassword: false
    });

    const inputHandler = (event) => {
        changeInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleBlur = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const getFieldClass = (field) => {
        return touched[field] && !input[field] ? 'form-control is-invalid' : 'form-control';
    };

    const navigate = useNavigate();

    const readValues = (event) => {
        event.preventDefault();
        if (input.email && input.password && input.repassword) {
            axios.post("http://127.0.0.1:5000/registerUser", input)
                .then((response) => {
                    if (response.status === 200) {
                        //setLoginMessage("Login successful");
                        alert(response.data.message);
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        //setLoginMessage(error.response.data.message);
                        alert(error.response.data.message);
                    } else {
                        alert("An error occured!")
                        //setLoginMessage("An error occurred.");
                    }
                });
        } else {
            //setLoginMessage("Please fill out all fields.");
            alert("All the fields are required!");
        }
    };

    return (
        <div style={backgroundImageStyle}>
            <div style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                        <div className="row g-3">

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 m-4">
                                <div className="card mt-5" style={{ padding: "20px", width: "450px" }}>
                                    <div className="card-body">
                                        <h3 className="card-title text-center">Register</h3>

                                        <form onSubmit={readValues}>

                                            <div className="form-group">
                                                <label htmlFor="email">Email address</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className={getFieldClass('email')}
                                                    id="email"
                                                    placeholder="Enter Email"
                                                    value={input.email}
                                                    onChange={inputHandler}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.email && !input.email && <div className="invalid-feedback">Email is required.</div>}
                                            </div>

                                            <br />

                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className={getFieldClass('password')}
                                                    id="password"
                                                    placeholder="Password"
                                                    value={input.password}
                                                    onChange={inputHandler}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.password && !input.password && <div className="invalid-feedback">Password is required.</div>}
                                            </div>

                                            <br />

                                            <div className="form-group">
                                                <label htmlFor="password">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    name="repassword"
                                                    className={getFieldClass('repassword')}
                                                    id="repassword"
                                                    placeholder="Confirm Password"
                                                    value={input.repassword}
                                                    onChange={inputHandler}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.password && !input.password && <div className="invalid-feedback">Password is required.</div>}
                                            </div>

                                            <br />
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                                            </div>
                                            <br />
                                            <Link class="link-opacity-75-hover" to="/login">Already have an account? Login</Link>
                                        </form>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register