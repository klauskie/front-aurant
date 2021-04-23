import React from 'react'
import '../Menu/Menu.css'; 


const OrderItem = ({ item }) => {

    return (
        <li>
            <div className="grid-container item-container">
                <div className="name-block">{item.item_id}</div>
                <div className="price-block">{item.instructions}</div>
                <div className="description-block">{item.quantity}</div>
            </div>
        </li>
    )
};

export default OrderItem