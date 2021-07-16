// import React from 'react';
// import AppBar from './components/appbar';

// export default function App() {
//     return (
//         <>
//             <AppBar/>
//         </>
//     )
// }

import React from 'react';
import { Text } from "react-native";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import AddItem from '../components/addItem';
import AllItems from '../components/allitems';

const Home = () => <Text>Home</Text>;

const About = () => <h1>About</h1>;

const Users = () => <Text>Users</Text>;

export default function App() {
    return(
        <Router>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
                <Link to="/additem">Add Item</Link>
                <Link to="/allitems">All Item</Link>
                <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/additem">
                    <AddItem />
                </Route>
                <Route path="/allitems">
                    <AllItems />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                </Switch>
        </Router>
    )
}
