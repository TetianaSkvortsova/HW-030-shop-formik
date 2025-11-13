import React from 'react';
import Header from "../components/Header/Header.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Products from "../components/Products/Products.jsx";
import Description from "../components/Description/Description.jsx";
import './MainPage.css';

function MainPage({setCategoryId, categoryId, productId, setProductId, setProductName}) {
    return (
        <>
            <Header/>
            <div className="main-content">
                <Categories setCategoryId={setCategoryId} setProductId={setProductId} categoryId={categoryId}/>
                <Products categoryId={categoryId} setProductId={setProductId} productId={productId} setProductName={setProductName}/>
                <Description productId={productId} categoryId={categoryId}/>
            </div>
        </>
    );
}

export default MainPage;