import React, {useContext} from 'react';
import './Description.css';
import {DataContext} from "../../contexts/contexts.js";

function Description({productId, categoryId}) {

    const {content} = useContext(DataContext);
    const categories = content || [];

    const indexCategoryId = categories.length > 0 ? categories.findIndex(item => item.id === categoryId) : -1;
    const productsList = categories[indexCategoryId] || {};

    const indexProductId = productId
        ? productsList.products.findIndex(item => item.id === productId)
        : -1;

    return (
        <div className="description-container">
            <h1>Опис товару</h1>
            {
                categories.length > 0 && productId &&
                    <span>{productsList.products[indexProductId].description}</span> || <span></span>

            }
        </div>
    );
}

export default Description;