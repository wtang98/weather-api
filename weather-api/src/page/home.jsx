import React, {useEffect, useState} from 'react'
import './home.scss'
import Result from '../components/result/result'
import MyCharts from '../components/chart/hourlyChart'
import GoogleMaps from '../components/result/searchBar/searchBar'

const Home = () => {
    const [weatherData, setWeatherData] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [timeZ, setTimeZ] = useState('')
    
    const handleLat = (lat) =>{
        setLatitude(lat)
    }
    const handleLon = (lon) =>{
        setLongitude(lon)
    }

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

	useEffect(() => {
		fetch(`https://api.weatherapi.com/v1/forecast.json?key=a97287063e5247b88a4123535221301&q=${latitude} ${longitude}&days=10&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data =>  setWeatherData(data))
            .catch(error => console.log(error))
	}, [longitude])

    const timeZone = weatherData?.location?.tz_id;

    return (
        <>
            <div className='home'>
                <div className="home__info">
                    <Result weatherData={weatherData} latitude={latitude} longitude={longitude} handleLat={handleLat} handleLon={handleLon} timeZone={timeZone}/>
                    <MyCharts weatherData={weatherData}/>
                </div>
            </div>
        </>
    )
}

export default Home
