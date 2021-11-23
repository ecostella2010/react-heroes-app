import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}) )

const mockDispatch = jest.fn();


describe('Pruebas en <Navbar/>', () => {
    //Pedro
    const contextValue = {
        dispatch: mockDispatch,
        user: {
            logged: true,
            name: 'Pedro'
        },
    }

    const wrapper = mount (
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element= {<Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>

    ); 

    test('debe de mostrarse correctamente', () => {
       
        //Snapshot
        expect ( wrapper ).toMatchSnapshot();
        expect ( wrapper.find('.text-info').text().trim()).toBe('Pedro');
        //.text-info = ... Pedro
    });
    
    test('debe de llamar al logout, llamar eñ navigate y el dispatch con los argumentos', () => {
        wrapper.find('button').prop('onClick')();
        expect ( contextValue.dispatch ).toHaveBeenCalledWith({"payload": {"logged": false}, "type": types.logout }); 
        expect ( mockNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
    });
    



})
