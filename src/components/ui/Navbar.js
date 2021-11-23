import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {

    const navigate = useNavigate();

    const { user, dispatch } = useContext( AuthContext );
    //console.log ( user.name );

    //const { user: { name } } = useContext( AuthContext );
    //console.log ( name );

    // const handleChangeUser = useMemo(() => 
    //     setUser( 
    //     {
    //         name: 'Eduardo'
    //     }, [ user ]
    //     ))

    const handleLogout = () => {

        navigate('/login', {replace: true}); 

        // 1.- Dispatch
        dispatch({
            type: types.logout, 
            payload : {
                logged: false
            }
         });
}

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeclassname="active"
                        className="nav-item nav-link" 
                        exact="true"
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeclassname="active"
                        className="nav-item nav-link" 
                        exact="true"
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink 
                        activeclassname="active"
                        className="nav-item nav-link" 
                        exact="true"
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">
                        { user.name }
                    </span>
                    <button 
                        activeclassname="active"
                        className="nav-item nav-link btn"
                        onClick = { handleLogout } 
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}