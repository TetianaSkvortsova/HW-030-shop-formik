import React from 'react';
import './UserOrders.css';
import {Link} from "react-router";

function UserOrders() {
    const STORAGE_KEY = 'userOrders';
    const CURRENT_USER = 'currentUser';
    const existingOrdersString = localStorage.getItem(STORAGE_KEY);
    const currentUserString = localStorage.getItem(CURRENT_USER);
    let existingOrders = existingOrdersString ? JSON.parse(existingOrdersString) : [];
    let currentUser = currentUserString ? JSON.parse(currentUserString) : {};
    const currentUserOrders = existingOrders.filter((order) => (order.currentUser === currentUser.id));

    return (
        <div className="user-orders-container">
            <div className="field-names">
                <p>Товар</p>
                <p>Кількість</p>
                <p>Місто</p>
                <p>Склад</p>
                <p>Ім`я</p>
                <p>Коментар</p>
            </div>
            {
                existingOrders.length > 0 && currentUserOrders.length > 0
                    ? currentUserOrders.map(order => (
                        <div className="order-data" key={order.id}>
                            <p>{order.productName}</p>
                            <p>{order.amount}</p>
                            <p>{order.city}</p>
                            <p>{order.storage}</p>
                            <p>{order.firstName}</p>
                            <p>{order.comment}</p>
                        </div>)
                    )

                    : <h2 className="no-orders"><span>No orders yet.</span></h2>
            }
            <nav>
                <Link to="/">Повернутися до покупок</Link>
            </nav>
        </div>
    );
}

export default UserOrders;