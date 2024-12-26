import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filterOption, setFilterOption] = useState('');
    const [categoryOption, setCategoryOption] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/homedata")
            .then(response => {
                const transformedData = response.data.map(item => ({
                    id: item[0],
                    title: item[1],
                    price: item[2],
                    description: item[3],
                    category: item[4],
                    link: item[5],
                    rating: item[6],
                    ratingcount: item[7],
                    longdesc: item[8]
                }));
                setData(transformedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const imageStyle = {
        width: '100%',
        maxHeight: '250px',
        objectFit: 'contain'
    };

    const cardStyle = {
        height: '390px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    const handleShowFilters = () => {
        setShowFilters(!showFilters);
    };

    const filterData = (data) => {
        let filteredData = [...data];

        if (categoryOption) {
            filteredData = filteredData.filter(item => item.category === categoryOption);
        }

        if (filterOption === 'lowToHigh') {
            filteredData.sort((a, b) => a.price - b.price);
        } else if (filterOption === 'highToLow') {
            filteredData.sort((a, b) => b.price - a.price);
        }

        return filteredData;
    };

    return (
        <div>
            <NavBar />
            <div className="container">
            
                <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-2">All Products</p>
                    <button onClick={handleShowFilters}>
                        Filter
                    </button>
                </div>
                {showFilters && (
                    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', marginBottom: '20px' }}>
                        <div>
                            <label htmlFor="sortOrder">Sort by Price: </label>
                            <select id="sortOrder" onChange={(e) => setFilterOption(e.target.value)}>
                                <option value="">Select</option>
                                <option value="lowToHigh">Low to High</option>
                                <option value="highToLow">High to Low</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="category">Filter by Category: </label>
                            <select id="category" onChange={(e) => setCategoryOption(e.target.value)}>
                                <option value="">All Categories</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="women's clothing">Women's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                            </select>
                        </div>
                    </div>
                )}
                <div className="row g-3">
                    {filterData(data).map((value, index) => (
                        <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" key={index}>
                            <Link to={`/product/${encodeURIComponent(value.title)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card" style={cardStyle}>
                                    <img src={value.link} className="card-img-top" alt={value.title} style={imageStyle} />
                                    <div className="card-body">
                                        <p className="card-text">{value.title}</p>
                                        <p className="card-text">${value.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
