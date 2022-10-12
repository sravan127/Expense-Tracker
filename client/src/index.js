import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import "./index.css"
import Register from './pages/Register';

const router=createBrowserRouter([
    {
        element: <App />,
        children:[
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path:"/register",
                element: <Register />   
            }
            
        ]
    },
    
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
