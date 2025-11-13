import React, {useContext} from 'react';
import './Products.css';
import {DataContext} from "../../contexts/contexts.js";
import {useNavigate} from "react-router";

function Products({categoryId, setProductId, productId, setProductName}) {
    const isUserLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    const navigate = useNavigate();

    const {content, isLoading, error} = useContext(DataContext);

    const categories = content || [];
    const indexCategoryId = categories.length > 0 ? categories.findIndex(item => item.id === categoryId) : -1;

    if (isLoading) {
        return <div className="products-container">Loading Products...</div>;
    }

    if (error) {
        return <div className="products-container error">Error: {error}</div>;
    }

    const selectedCategory = categories[indexCategoryId];
    const products = selectedCategory ? selectedCategory.products : [];

    const handleClick = (id) => {
        return () => {
            setProductId(id);
        }
    }

    const handleBuy = (productName) => {
        return () => {
            setProductName(productName);
            isUserLoggedIn
                ? navigate('/order')
                : navigate('/auth');
        }
    }

    return (
        <div className="products-container">
            <h1>{selectedCategory ? selectedCategory.name : 'Оберіть категорію'}</h1>
            <ul>
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id} onClick={handleClick(product.id)}
                            className={product.id === productId ? 'active' : ''}>
                            <div>{product.name}</div>
                            <div className={"price"}>${product.price}</div>
                            <button type="button" onClick={handleBuy(product.name)}>Купити</button>
                        </li>
                    ))
                ) : (
                    <li>Будь ласка, оберіть категорію</li>
                )}
            </ul>
        </div>
    );
}

export default Products;