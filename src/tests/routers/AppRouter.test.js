import React from 'react';


import { mount, shallow } from "enzyme";
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter/>', () => {
    const contextValue = {
        user: {
            logged: false
        }
    }

    test('debe de mostar el login si no está autenticado', () => {

        const contextValue = {
            user: {
                logged: false
            }
        }
        
        const wrapper = mount (
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>

        );
        
        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find('h1').text().trim() ).toBe('LoginScreen');

        //console.log( wrapper.html());

    });

    test('debe de mostar el componnete de marvel si está autenticado', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        }
        
        const wrapper = mount (
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>

        );
        
        //console.log( wrapper.html());

        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find('h1').text().trim() ).toBe('Marvel Screen');
        expect ( wrapper.find('.navbar').exists() ).toBe( true );

        

    });
    
});
