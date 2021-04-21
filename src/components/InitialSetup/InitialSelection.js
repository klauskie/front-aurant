import React from 'react'
import { Link } from 'react-router-dom';

const InitialSelection = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to='/create-party' className="nav-link">Create Party</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/join-party' className="nav-link">Join Party</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default InitialSelection;