import React from 'react'
import './Menu.css'; 


const MenuTableRow = ({ itemID, name, description, price }) => {
    return (
        <li>
            <div className="grid-container item-container">
                <div className="name-block">{name}</div>
                <div className="price-block">${price}</div>
                <div className="description-block">{description.slice(0, 50)}</div>
            </div>
        </li>
    )
};

export default MenuTableRow