import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import {
    Routes as Switch,
    Navigate as Redirect,
    Route
  } from 'react-router-dom';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';
import { DcScreen } from '../components/dc/DcScreen';
import { SearchScreen } from '../components/search/SearchScreen';
export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-2">

                <Switch>
                    <Route exact path="/marvel" element={<MarvelScreen />} />
                    <Route exact path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route exact path="/dc" element={<DcScreen />} />
                    <Route exact path="/search" element={<SearchScreen />} />
                    {/* <Redirect to="/marvel"/> */}
                    <Route path="/*" element={<Redirect to="/Marvel"/>}>
                        {/* { <Redirect to="/"/>} */}
                        {/* { navigate('/', {replace: true}) } */}
                    </Route>
                </Switch>


            </div>

        </>
    )
}
