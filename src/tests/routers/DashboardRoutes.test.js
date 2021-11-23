import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";



describe('Pruebas en <DashboardRoutes/>', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Juanito'
        }
    }
    

    test('debe de mostrarse correctamente - Marvel /', () => {
   
        const wrapper = mount (
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>

        ); 

        //console.log( wrapper.html());

        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find ('.text-info').text().trim()).toBe ('Juanito');
        expect ( wrapper.find ('h1').text().trim()).toBe ('Marvel Screen');

    });

    test('debe de mostrarse correctamente de DC', () => {
   
        const wrapper = mount (
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>

        ); 

        //console.log( wrapper.html());

        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find ('h1').text().trim()).toBe ('DC Screen');

    });
    
});
