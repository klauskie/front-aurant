import React from 'react'
import { Link } from 'react-router-dom';
import './TopMenu.css'; 
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';


const TopMenu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <ul className="nav ml-auto">
                    <li className="nav-item">
                        <Link to='/menu' className="nav-link">
                            <AiOutlineHome size={30} color="gray" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/orders' className="nav-link">
                            <FiShoppingCart size={30} color="gray" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default TopMenu