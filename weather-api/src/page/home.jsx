import React, {useEffect, useState} from 'react'
import './home.scss'
import Result from '../components/result/result'
import MyCharts from '../components/chart/hourlyChart'

const Home = () => {
    const [weatherData, setWeatherData] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [location, setLocation] = useState(latitude,longitude)
    const [background, setBackground] = useState('')
    
    //fetching Data
    useEffect(() => {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
        }else{
            alert('location not found')
            setLocation('London')
        }
    },[])

	useEffect(() => {
		fetch(`http://api.weatherapi.com/v1/forecast.json?key=a97287063e5247b88a4123535221301&q=${latitude} ${longitude}&days=10&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data =>  setWeatherData(data))
            .catch(error => console.log(error))
	}, [latitude,longitude])

    let condition = weatherData?.current?.condition?.text;
    const loadBackground = () => {
        if(condition === 'Sunny'){
            setBackground('sunny')
        }
        if(condition === 'Rainy'){
            setBackground('rainy')
        }
        if(condition === 'Clear'){
            setBackground('clear')
        }
        if(condition === ''){
            setBackground('rainy')
        }
        if(condition === 'Fog'){
            setBackground('fog')
        }
    }
    useEffect(loadBackground, [condition])
    console.log(background)

    return (
        <>
            {background != undefined && <div className={`home ${background}`}>
                <h1>Weather Forecast</h1>
                <Result weatherData={weatherData}/>
                <MyCharts weatherData={weatherData}/>
            </div>}
        </>
    )
}

export default Home
