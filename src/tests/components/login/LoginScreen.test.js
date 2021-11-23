import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockDispatch = jest.fn();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}) )


describe('Pruebas en <LoginScreen/>', () => {
    
    //Pedro
    const contextValue = {
        dispatch: mockDispatch,
        user: {
            logged: false
        },
    }

    const wrapper = mount (
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element= {<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>

    ); 


    test('debe de hacer match con el snapshot', () => {

        expect ( wrapper ).toMatchSnapshot(); 
        
    });

    test('debe de realizar el dispatch y la navegación', () => {

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        wrapper.find('button').prop('onClick')();

        expect ( contextValue.dispatch ).toHaveBeenCalledWith({payload: {name: 'Eduardo'}, type: types.login }); 
        expect ( mockNavigate ).toHaveBeenCalledWith('/', {replace: true});

        localStorage.setItem ('lastPath', '/dc');
        handleClick();

        expect ( mockNavigate ).toHaveBeenCalledWith('/dc', {replace: true});

        //dispatch ( ... name: Fernando)

        //mockNavigate { /marvel, { replace : true}}

        //LocalStorage.setItem ('lastpath', '/dc')

        //handleClick

        //mockNavigate { /, { replace : true}}
    });
    
})
