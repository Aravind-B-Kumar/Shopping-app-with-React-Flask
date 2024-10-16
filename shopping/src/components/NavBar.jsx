import React from 'react'
import icon from '../images/icon.png'

const NavBar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{paddingBlockStart:0}} >
                <div class="container-fluid bg-warning">
                    <a class="navbar-brand" href="/"><img style={{ height: "65px" }} src={icon} alt="" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="/search">Search</a>
                            <a class="nav-link active" aria-current="page" href="/add">Add</a>
                        </div>
                    </div>

                    {/* <form class="d-flex" role="search">
                        <input class="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success me-3" type="submit">Search</button>
                    </form> */}

                </div>

            </nav>
        </div>
    )
}

export default NavBar