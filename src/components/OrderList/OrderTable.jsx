import React from 'react'
import OrderTableBlock from './OrderTableBlock';


const OrderTable = ({ list }) => {
    return (
        <div>
            <ul>
                {
                    list.map((orderOwner, index) => {
                        return (
                            <div key={index}>
                                <OrderTableBlock orderOwner={orderOwner} key={index} />
                            </div>     
                        )   
                    })
                }
            </ul>

        </div>
    )
}

export default OrderTable;