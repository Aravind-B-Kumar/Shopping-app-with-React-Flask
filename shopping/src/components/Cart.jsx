import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch cart items
        axios.get('http://localhost:5000/cartItems', { withCredentials: true })
            .then(response => {
                setCartItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
    }

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <h1>Your Cart</h1>
                <div className="list-group">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <Link to={`/product/${encodeURIComponent(item[1])}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="list-group-item d-flex align-items-center border mb-4" key={item[0]} style={{ padding: '20px', borderRadius: '5px' }}>
                                <span className="badge bg-primary rounded-pill me-3">{index + 1}</span>
                                <img src={item[5]} alt={item[1]} style={{ width: '100px', height: 'auto', marginRight: '20px' }} />
                                <div>
                                    <h5 className="mb-1">{item[1]}</h5>
                                    <p className="mb-1">{item[3]}</p>
                                    <small><strong>Price:</strong> ${item[2]}</small><br />
                                    <small><strong>Category:</strong> {item[4].replace(/(?:^|\s)'?(\w)/g, (match) => match.toUpperCase())}</small><br />
                                    <small><strong>Rating:</strong> {item[6]} ({item[7]} reviews)</small><br />
                                    <small>{item[8]}</small>
                                </div>
                            </div>
                            </Link>
                        ))
                    ) : (
                        <div className="list-group-item">
                            <p>Your cart is empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
