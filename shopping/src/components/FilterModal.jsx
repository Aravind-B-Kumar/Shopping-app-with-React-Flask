import React from 'react';

const FilterModal = ({ show, handleClose, setFilterOption, setCategoryOption }) => {
    if (!show) return null;

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategoryOption(e.target.value);
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 1000,
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    };

    return (
        <div>
            <div style={overlayStyle} onClick={handleClose}></div>
            <div style={modalStyle}>
                <h2>Filter Products</h2>
                <div>
                    <label htmlFor="sortOrder">Sort by Price:</label>
                    <select id="sortOrder" onChange={handleFilterChange}>
                        <option value="">Select</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Filter by Category:</label>
                    <select id="category" onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </div>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default FilterModal;
