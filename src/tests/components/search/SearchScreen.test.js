import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from '../../../auth/AuthContext';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Pruebas en <SearchScreen/>', () => {
    // const contextValue = {
    //     user: {
    //         logged: true,
    //         name: 'Juanito'
    //     }
    // }

    
    test('debe de mostrarse correctamente con valores por defecto', () => {

        const wrapper = mount (
            // <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/search']}>
                    <SearchScreen />
                </MemoryRouter>
            // </AuthContext.Provider>

        );
        
        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find('.alert-info').text().trim() ).toBe('Search a Heroe');
    });


    test('debe de mostrar a Batman y el input con el valor de queryString', () => {
        const wrapper = mount (
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <SearchScreen />
                </MemoryRouter>
        );

        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find('input').prop('value') ).toBe('batman');
    })
    

    test('debe de mostrar un error sino encuentra el heroe', () => {
        const wrapper = mount (
                <MemoryRouter initialEntries={['/search?q=batman123']}>
                    <SearchScreen />
                </MemoryRouter>
        );

        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find('.alert-danger').text().trim() ).toBe(`There is no a hero with "batman123"`);
    })

    test('debe de llamar el navegate a la nueva pantalla', () => {
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        })

        expect ( mockNavigate ).toHaveBeenCalled ();
        expect ( mockNavigate ).toHaveBeenCalledWith ('?q=batman');

        // wrapper.find('form').simulate('submit', {

        // })


    })
    
    
    
})
