import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'

const Home = () => {
    const [data, changeData] = useState([])
    const fetchData = () => {
        axios.get("http://127.0.0.1:5000/homedata")
            .then(
                (response) => { changeData(response.data) }
            ).catch()
    }
    useEffect(
        () => { fetchData() }, []
    )


    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                         <div className="row g-3">  {/* object with keys {category, description, id, image, price, rating, title}) */}
                            {
                                data.map((value, index) => {
                                    return <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            {value}   
                                        </div>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home