import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        // Fetch product details
        axios.get(`http://localhost:5000/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);

                axios.get(`http://localhost:5000/isInCart/${response.data.id}`, { withCredentials: true })
                    .then(response => {
                        if (response.data.inCart) {
                            setIsAddedToCart(true);
                        }
                    })
                    .catch(error => {
                        console.error('Error checking cart status:', error);
                    });

                // Fetch comments
                axios.get(`http://localhost:5000/getComments?productId=${response.data.id}`)
                    .then(response => {
                        setComments(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching comments:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
    }

    if (!product) {
        return <div className="text-center my-5">Product not found.</div>;
    }

    const buyNowPage = () => {
        navigate('/checkout');
    };

    const handleAddToCart = () => {
        axios.post(`http://localhost:5000/addOrRemoveCartItem/${product.id}`, {}, { withCredentials: true })
            .then(response => {
                setIsAddedToCart(!isAddedToCart);
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
            });
    };

        const handleAddComment = () => {
            axios.post(`http://localhost:5000/setComment`, { productId: product.id, comment: newComment }, { withCredentials: true })
                .then(response => {
                    setComments([...comments, [response.data.uname, newComment]]);
                    setNewComment("");
                })
                .catch(error => {
                    console.error('Error adding comment:', error);
                });
        };

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-5">
                        <img src={product.link} alt={product.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h1>{product.name}</h1>
                        <p className="text-muted">{product.category.replace(/(?:^|\s)'?(\w)/g, (match) => match.toUpperCase())}</p>
                        <h2 className="text-danger">${product.price}</h2>
                        <p>{product.description}</p>
                        <p><strong>Rating:</strong> {product.rating} ({product.ratingcount} reviews)</p>
                        <p>{product.longdesc}</p>
                        <button className="btn btn-primary btn-lg" style={{ padding: '10px 20px' }} onClick={buyNowPage}>Buy Now</button>
                        <button
                            className={`btn btn-lg ${isAddedToCart ? 'btn-success' : 'btn-outline-secondary'}`}
                            style={{ padding: '10px 20px', marginLeft: '10px' }}
                            onClick={handleAddToCart}
                        >
                            {isAddedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <br />
                <br />
                <div className="mt-5">
                    <h3>Comments</h3>
                    <div className="list-group">
                        {comments.map((comment, index) => (
                            <div className="list-group-item" key={index}>
                                <h5>{comment[0]}:</h5> {comment[1]}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h5>Add a comment</h5>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button className="btn btn-primary mt-2" onClick={handleAddComment} >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
