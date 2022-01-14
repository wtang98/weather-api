import React, {useEffect, useState} from 'react'
import './home.scss'
import Result from '../components/result/result'

const Home = () => {
    const [weatherData, setWeatherData] = useState({})
    const [location, setLocation] = useState("")
	let place = 'london';
    
    
    // const any = () => {
    //     if("geoloaction" in navigator){
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setLocation(position.coords.latitude, position.coords.longitude);
    //         })
    //     }else{
    //         setLocation('London')
    //     }
    // }
    useEffect(() => {
        if("geoloaction" in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude, position.coords.longitude);
            })
        }else{
            console.log('location not found')
            setLocation('London')
        }
    },[])
    // console.log(location)

	useEffect(() => {
		fetch(`https://api.weatherapi.com/v1/current.json?key=a97287063e5247b88a4123535221301&q=${place}&aqi=yes`)
            .then(response => response.json())
            .then(data =>  setWeatherData(data))
            .catch(error => console.log(error))
	}, [])

    // console.log(weatherData)
    return (
        <div className='home'>
        <h1>Weather Forecast</h1>
            {JSON.stringify(weatherData)}
            <Result weatherData={weatherData}/>  
        </div>
    )
}

export default Home
