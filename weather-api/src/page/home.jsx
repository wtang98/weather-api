import React, {useEffect, useState} from 'react'
import './home.scss'
import Result from '../components/result/result'
import MyCharts from '../components/chart/hourlyChart'
import GoogleMaps from '../components/map/map'

const Home = () => {
    const [weatherData, setWeatherData] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    // const [location, setLocation] = useState(latitude,longitude)
    
    //fetching Data
    useEffect(() => {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
        }else{
            alert('location not found')
        }
    },[])
    const handleLat = (lat) =>{
        setLatitude(lat)
    }
    const handleLon = (lon) =>{
        setLongitude(lon)
    }

	useEffect(() => {
		fetch(`http://api.weatherapi.com/v1/forecast.json?key=a97287063e5247b88a4123535221301&q=${latitude} ${longitude}&days=10&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data =>  setWeatherData(data))
            .catch(error => console.log(error))
	}, [latitude,longitude])



    return (
        <>
            <div className='home'>
                <h1>Weather Forecast</h1>
                <div className="home__info">
                    <Result weatherData={weatherData}/>
                    <MyCharts weatherData={weatherData}/>
                </div>
                <div className="home__map">
                    <GoogleMaps latitude={latitude} longitude={longitude}/>
                </div>
            </div>
        </>
    )
}

export default Home
