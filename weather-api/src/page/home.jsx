import React, {useEffect, useState} from 'react'
import './home.scss'
import Result from '../components/result/result'

const Home = () => {
    const [weatherData, setWeatherData] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [location, setLocation] = useState(latitude,longitude)
    const [loading, setLoading] = useState(true)
    console.log(location)
    

    useEffect(() => {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
        }else{
            console.log('location not found')
            setLocation('London')
        }
    },[])
    console.log(latitude,longitude)

	useEffect(() => {
		fetch(`https://api.weatherapi.com/v1/forecast.json?key=a97287063e5247b88a4123535221301&q=${latitude},${longitude}&days=10&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data =>  setWeatherData(data))
            .catch(error => console.log(error))
	}, [latitude,longitude])

    // console.log(weatherData)
    return (
        <div className='home'>
        <h1>Weather Forecast</h1>
            {/* {JSON.stringify(weatherData)} */}
            {weatherData != false ? <Result weatherData={weatherData}/> : "loading..." }
        </div>
    )
}

export default Home
