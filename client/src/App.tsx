import { FC } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { FavoritesPage } from "./pages/favorites-page/FavoritesPage";
import { MainPage } from "./pages/main-page/MainPage";
import { NavigationBar } from "./components/NavigationBar";
import { ToastContainer } from "react-toastify";


import 'react-toastify/dist/ReactToastify.css';
import "./App.scss";

const App: FC = () => {
	return (
		<div className="App">
			<Router basename="/">
				<NavigationBar />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/favorites" element={<FavoritesPage />} />
				</Routes>
			</Router>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default App;