import React, { useMemo } from 'react'
import { useParams, useNavigate, Navigate as Redirect } from "react-router-dom";
import { getHeroeById } from '../../selectors/getHeroeById';
import 'animate.css';

// import batman from '../../assets/heroes/dc-batman.jpg'; //Estatico

// const heroesImages = require.context('../../assets/heroes', true);

export const HeroScreen = () => {

    // const params = useParams();
    const { heroeId } = useParams();

    const history = useNavigate();

    //console.log(heroeId);

    //const hero = getHeroeById(heroeId);
    const hero = useMemo(() => getHeroeById(heroeId), [ heroeId ] );


    //console.log(hero);

    if ( !hero) {
        return <Redirect to="/" />;
    }

    const handleReturn = () => {
        
        //console.log (history);

        if (history.length <= 2 )
        {
            publisher==='DC Comics'?history('/dc'):history('/marvel');               
        } else {
            history(-1);
        }
        
        // const handleReturn = () => {
        //     history(-1);
        //   };
        // console.log (history(-1));
        // return <Redirect to="/" />;
    }

    const { 
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero; 


    return (
        <div  className="row mt-5">
            <div className="col-4">
                <img
                    src={ `../assets/heroes/${ heroeId }.jpg` }
                    // src={ heroesImages(`./${ heroeId }.jpg`) }
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                ></img>

            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3> { superhero  } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"> <b> First appearance: </b> { first_appearance } </li>
                </ul>
                <h5> Characters </h5>
                <p> { characters }</p>
                <button 
                    className="btn btn-outline-info"
                    onClick= { handleReturn }
                >

                    Return
                </button>
            </div>

            

        </div>
    )
}
