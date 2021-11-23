import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
//no esta para dom v6
//export const LoginScreen = ( { histoy  } ) => {

export const LoginScreen = () => {
    
    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        //console.log('Click');
        //no funciona para V6
        //histoy.push('/');
        //Esto si funciona para V6
        //navigate('/');
        //no funciona para V6
        //histoy.replace('/');
        //Esto si funciona para V6 y sirve para reemplazar la historia de navagacion
        
        //publisher==='DC Comics'?navigate('/dc'):navigate('/marvel');

        const lastPath = localStorage.getItem('lastPath') || '/';

        dispatch({
            type: types.login, 
            payload : {
                name: 'Eduardo'
            }
         });

         navigate(lastPath, {replace: true});

    }

    return (
        <div className="container mt-5">
            <h1>LoginScreen</h1>
            <hr/>

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >

                Login

            </button>
        </div>
    )
}
