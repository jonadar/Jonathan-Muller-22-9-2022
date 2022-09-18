import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { FavoritesPage } from "./pages/favorites-page/FavoritesPage";
import { MainPage } from "./pages/main-page/MainPage";

import "./App.scss";


const App = () => {
	return (
		<div className="App">
			<Router>
				<div>
					<span>Weather App</span>
					<a href="/">Home</a>
					<a href="/favorites">Favorites</a>
				</div>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/favorites" element={<FavoritesPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
