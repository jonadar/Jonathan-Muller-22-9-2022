import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { FavoritesPage } from "./pages/favorites-page/FavoritesPage";
import { MainPage } from "./pages/main-page/MainPage";
import { NavigationBar } from "./components/NavigationBar";

import "./App.scss";



const App = () => {
	return (
		<div className="App">
			<Router basename="/">
				<NavigationBar />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/favorites" element={<FavoritesPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
