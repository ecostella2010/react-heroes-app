import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';
import 'animate.css';

export const HeroList = ( { publisher } ) => {

    //const heroes = getHeroesByPublisher( publisher );

    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ] );


    return (
        // <ol></ol>
        //es para version boostrap 5 <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="card-columns animate__animated animate__fadeIn">
            {
                heroes.map ( hero => (
                    // <li key= { hero.id }>
                    //     {hero.superhero}
                    // </li>
                    <HeroCard key= { hero.id }
                        { ...hero }
                    />
                ) )
            }
            
        </div>
    )
}
