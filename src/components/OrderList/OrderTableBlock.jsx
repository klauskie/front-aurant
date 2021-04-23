import React from 'react'
import '../Menu/Menu.css'; 
import OrderItem from './OrderItem';


const OrderTableBlock = ({ orderOwner }) => {

    return (
        <div>
            <li>
                <div className="h2-tag">{orderOwner.client.Name}</div>
            </li>

            <ul>
                {
                    orderOwner.order_list.map((item, index) => <OrderItem item={item} /> )
                }
            </ul>
            
        </div>
    )
};

export default OrderTableBlock