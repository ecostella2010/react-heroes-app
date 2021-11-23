import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
  } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
// import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
    const { user } = useContext( AuthContext ); 

    return (

        <Router>
            {/* <h1>Hola</h1>     */}
            <div>
                {/* <Navbar /> */}
    
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. 
                <Switch>
                        <Route path="/about" element={<AboutScreen />}>
                        </Route>
                </Switch>    
                    
                */}
                <Switch>
                    {/* <Route exact path="/login" element={ <LoginScreen /> } /> */}
                    {/* <PublicRoute exact path="/login" element={ <LoginScreen /> } /> */}
                    <Route exact path="/login" element={ <PublicRoute isAuthenticated = { user.logged } component = { LoginScreen }/> } />
                    <Route path="/*" element={ <PrivateRoute isAuthenticated = { user.logged } component = { DashboardRoutes } /> } />
                    {/* dom v5 <PrivateRoute isAuthenticated = { user.logged } path="/*" element={ <DashboardRoutes /> } /> */}
                    {/* <Route exact path="/login" element={<LoginScreen />} /> */}
                </Switch>
            </div>
        </Router>
    )
}
