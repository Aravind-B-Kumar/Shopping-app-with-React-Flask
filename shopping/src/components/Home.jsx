import React, { useEffect, useState } from 'react'
import axios  from 'axios'

const Home = () => {

    const [data, changeData] = useState([])
    const fetchData = () => {
        axios.get('http://127.0.0.1:5000/@me', {
          withCredentials: true,  // Ensures cookies are sent
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => { 
          changeData(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching current user:', error);
        });
      };
      
    useEffect(
        () => { fetchData() }, []
    )
  return (
    <div>
        
        <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data.map(
                                        (value, index) => {
                                            return <tr>
                                                <th scope="row">{value.id}</th>
                                                <td>{value.email}</td>
                                                <td>{value.password}</td>
                                            </tr>

                                        }
                                    )
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

    </div>
  )
}

export default Home