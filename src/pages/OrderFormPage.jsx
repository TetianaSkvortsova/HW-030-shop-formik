import React from 'react';
import OrderForm from "../components/OrderForm/OrderForm.jsx";
import Header from "../components/Header/Header.jsx";

function OrderFormPage({productName}) {
    return (
        <>
            <Header />
            <OrderForm productName={productName}/>
        </>
    );
}

export default OrderFormPage;
