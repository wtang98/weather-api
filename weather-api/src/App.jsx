import React,{ useState, useEffect } from 'react'
import './App.scss';
import Home from './page/home';
// import GoogleMap from './components/map/map';

const App = () => {


	return (
		<div className="App">
			<Home/>
			{/* <GoogleMap/> */}
		</div>
	);
}

export default App;
