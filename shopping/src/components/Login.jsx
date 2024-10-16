import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Login() {
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
    padding: "20px",
  };

  const [input, changeInput] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });


  // const [loginMessage, setLoginMessage] = useState("");

  const inputHandler = (event) => {
    changeInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleBlur = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const navigate = useNavigate();
  const readValues = (event) => {
    event.preventDefault();
    if (input.email && input.password) {
      axios.post("http://127.0.0.1:5000/loginUser", input)
        .then((response) => {
          if (response.status === 200) {
            //setLoginMessage("Login successful");
            alert("Successfully Logged in");
            navigate("/home");
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

  const getFieldClass = (field) => {
    return touched[field] && !input[field] ? 'form-control is-invalid' : 'form-control';
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={containerStyle}>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col-12 m-4">
                <div className="card mt-5" style={{ padding: "20px", width: "450px" }}>
                  <div className="card-body">
                    <h3 className="card-title text-center">Login</h3>
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
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                      </div>
                      <br />
                      <Link className="link-opacity-75-hover" to="/register">No account? Register here</Link>
                    </form>
                    {/* {loginMessage && <p className="mt-3 text-center">{loginMessage}</p>} */}
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

export default Login;
