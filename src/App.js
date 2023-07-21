import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./app.scss";
import {Provider} from "react-redux";
import {store} from "./features/store"

// import {Provider} from "react-redux";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RandomNumbersBoard_2 from "./Game_components_2/RandomNumbersBoard_2";
import RandomNumbersBoard from "./Game_components_2/RandomNumbersBoard";

import Board from "./Game_components_2/Board_v3";

// // Movie_App
// import store from './fakeshop_redux/store'
// import FakeshopCart from "./fakeshop_components/FakeshopCart"

const App = () => (
    <Provider store={store}>
    <div className="app">
        <BrowserRouter>
            <Header />

            {/*<Board />*/}
            {/*<RandomNumbersBoard />*/}
            {/*<RandomNumbersBoard_2 />*/}

            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/movie/:imdbID" element={<MovieDetails/>} />
                    <Route path="*" element={<h1>404 Route not found!</h1>} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>

        {/*Simple React-Redux:*/}
        {/*<Provider store={store}>*/}
        {/*    <FakeshopCart/>*/}
        {/*</Provider>        */}

    </div>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />)

export default App;