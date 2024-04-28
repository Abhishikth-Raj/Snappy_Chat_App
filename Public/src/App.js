import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/setAvatar" element={<SetAvatar />} />
                <Route path="/" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

// explain what the Routes and Route components do clearly
// the routes component is the parent component that contains all the routes
// the route component is a child component of the routes component
// the route component is used to define a route
// the path prop defines the path of the route
// the element prop defines the component that is rendered when the route is visited
// the element prop is a JSX element
// the element prop is a child component of the route component

//explain what the BrowserRouter component does clearly
