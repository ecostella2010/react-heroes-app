import React from 'react';

import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import {
    //Route, 
    MemoryRouter
    //useLocation,
    //Navigate as Redirect
  } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aqui</span>
}) )
  

describe('Pruebas en <PrivateRoute/>', () => {
    //jest.mock('react-router-dom', () => mockFunction());
    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si esta autenticado y guardar localStorage', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/']}>
                     <PrivateRoute  
                        isAuthenticated = { true } 
                        component = {  () => <span>Listo!</span>}
                      />
                </MemoryRouter>
            </AuthContext.Provider>
            
        );
        //console.log(wrapper.html());    
        //expect ( wrapper ).toMatchSnapshot (); 
        expect ( wrapper.find ('span').exists() ).toBe ( true );
        expect  ( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/' );

    });

    test('debe de bloquear el componente si no está autenticado', () => {
        const contextValue = {
            user: {
                logged: false
            },
        };
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute  
                isAuthenticated = { false } 
                component = {  () => <span>Listo!</span>}
                />
            </MemoryRouter>
        );
        //console.log(wrapper.html());  
        expect ( wrapper.text().trim() ).toBe ('Saliendo de aqui'); 
    });

    // test('debe de mostrar el componente si esta autenticado y guardar localStorage', () => {
        
    //     const contextValue = {
    //         user: {
    //             logged: true,
    //             name: 'Pepe'
    //         },
    //     }

    //     const wrapper = mount(
    //         <MemoryRouter>
    //             <PrivateRoute  
    //             isAuthenticated = { true } 
    //             component = {  () => <span>Listo!</span>}
    //             />
    //         </MemoryRouter>
    //     );
    //     //console.log(wrapper.html());    
    //     //expect ( wrapper ).toMatchSnapshot (); 
    //     expect ( wrapper.find ('span').exists() ).toBe ( true );
    //     expect  ( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/' );

    // });

    
    
    
})
