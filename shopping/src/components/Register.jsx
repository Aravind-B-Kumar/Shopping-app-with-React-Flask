import React from 'react'

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
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="email">Email address</label>
                                                <input type="email" className="form-control" id="email" placeholder="Enter Email" />
                                            </div>

                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Password" />
                                            </div>

                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="password">Confirm Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Confirm Password" />
                                            </div>

                                            <br />
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                                            </div>
                                            <br />
                                            <a class="link-opacity-75-hover" href="/login">Already have an account? Login</a>
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