import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}) )


describe('Pruebas en <HeroScreen/>', () => {
    
    test('no debe de mostrar el heroScreen si no hay heroe en el URL', () => {
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe']}>
                <Routes>
                    <Route path="/heroe" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No hay heroe</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect ( wrapper.find('h1').text().trim()).toBe('No hay heroe');
    })

    test('debe de mostrar un heroe si el parametro existe y se encuentra', () => {
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Routes>
                    <Route path="/heroe/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No hay heroe</h1>} />
                </Routes>
            </MemoryRouter>
        );
        //console.log( wrapper.html());    
        //expect ( wrapper.find('h1').text().trim()).not.toBe('No hay heroe');
        expect ( wrapper.find ('.row').exists()).toBe( true );
    })

    test('debe de regresar a la pantalla anterior', () => {

        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Routes>
                    <Route path="/heroe/:heroeId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect ( mockNavigate ).toHaveBeenCalledWith("/marvel");

        
    })
    

    test('debe de mostrar el No heroe Page si no tenemos un heroe', () => {
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroe/marvel-spider1223']}>
                <Routes>
                    <Route path="/heroe/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No hay heroe</h1>} />
                </Routes>
            </MemoryRouter>
        );
        //console.log( wrapper.html());    
        expect ( wrapper.text().trim()).toBe('No hay heroe');
        //expect ( wrapper.find ('.row').exists()).toBe( true );
    })
    

})
