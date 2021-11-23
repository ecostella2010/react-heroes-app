import React, { useMemo } from 'react';
import queryString from  'query-string';
// import { heroes } from '../../data/heroes';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard'
import { useNavigate, useLocation } from "react-router-dom";
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ( ) => {

    const location = useLocation();

    //console.log(location);

    // const queryString = require('query-string');
    // const parsed = queryString.parse(location.search);
    // console.log(parsed);
    //=> {foo: 'bar'}
    const { q = ''} = queryString.parse(location.search);

    
    
    const initialForm = {
        searchText: q
    };

    const history = useNavigate();

    const [ formValues, handleInputChange] = useForm( initialForm );
    const { searchText } = formValues;

    //const heroesFiltered = heroes;

    //const heroesFiltered =  getHeroesByName ( searchText );

    const heroesFiltered = useMemo(() => getHeroesByName ( q ), [ q ]);

    // heroes.filter ( hero => hero.superhero.includes( searchText )); 

    const handleSearch = (e) => {
        e.preventDefault();
        history(`?q=${ searchText }` );
        console.log(searchText);
       
    }
    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>
            
            <div className="row">
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr/>
                    <form onSubmit={ handleSearch }>
                        <input
                            type ="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name = "searchText"
                            autoComplete="off"
                            value = { searchText } 
                            onChange= { handleInputChange }
                        />
                        <button
                            type = "submit"
                            className="btn btn-block btn-outline-primary"
                        >    Search
                        </button>
                        
                    </form>

                </div>
                <div className="col-7">
                    <h4> Results </h4>
                    <hr/>

                    {
                        ( q === '' )
                        &&
                        <div className="alert alert-info">
                            Search a Heroe
                        </div>

                    }

{
                        ( q !== ''  && heroesFiltered.length === 0)
                        &&
                        <div className="alert alert-danger">
                            There is no a hero with "{ q }"
                        </div>
                        
                    }
                    

                    {

                        heroesFiltered.map ( hero => (
                            <HeroCard 
                                key = { hero.id }
                                { ...hero }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
