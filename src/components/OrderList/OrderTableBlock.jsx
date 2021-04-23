import React from 'react'


const OrderTableBlock = ({ orderOwner }) => {

    return (
        <div>
            {orderOwner.Owner.Name}
            <br/>
            {orderOwner.item_id}
        </div>
    )
};

export default OrderTableBlock