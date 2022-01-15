import React,{ useEffect, useState }  from 'react'
// import { useEffect } from 'react/cjs/react.development';
import './result.scss'
import WeatherDetails from './weatherDetails/weatherDetails.jsx';
import DaysForcast from './daysForcast/daysForcast.jsx'

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Result = ({weatherData}) => {
    const [uvStrength, setUvStrength] = useState('')
    const [windDirection, setWindDirection] = useState('')
    const [airQuality, setAirQuality] = useState('')
    const [greeting, setGreeting] = useState('Hello')
    
    const date = new Date()
    const hours = date.getHours();
    
    const currentData = weatherData?.current;
    const foreCast = weatherData?.forecast;
    
    useEffect(() => {
        switch(hours){
            case 6,7,8,9,10,11:
                setGreeting('Good Morning!')
            break;
            case 12:
                setGreeting('Its noon!')
            break;
            case 13,14,15,16,17,18:
                setGreeting('Good Afternoon!')
            break;
            case 19,20,21,22,23,24,0,1,2,3,4,5:
                setGreeting('Good Evening!')
        }
    },[])

    useEffect(()=> {
        switch(parseInt(currentData?.uv)){
            case 1,2:
                setUvStrength('Low');
            break;
            case 3,4,5:
                setUvStrength('Moderate');
            break;
            case 6,7:
                setUvStrength('High');
            break;
            case 8,9,10:
                setUvStrength('Very High');
            break;
            case 11:
                setUvStrength('Extreme');
            break;
        }
    },[currentData?.uv])

    useEffect(()=> {
        switch(currentData?.wind_dir){
            case 'S':
                setWindDirection('South');
            break;
            case 'W':
                setWindDirection('West');
            break;
            case 'E':
                setWindDirection('East');
            break;
            case 'N':
                setWindDirection('North');
            break;
            case 'NE':
                setWindDirection('North East');
            break;
            case 'NW':
                setWindDirection('North West');
            break;
            case 'SE':
                setWindDirection('South East');
            break;
            case 'SW':
                setWindDirection('South West');
            break;
        }
    },[currentData?.wind_dir])

    useEffect(()=> {
        switch(parseInt(currentData?.air_quality['gb-defra-index'])){
            case 1,2,3:
                setAirQuality('Low')
            break;
            case 4,5,6:
                setAirQuality('Moderate')
            break;
            case 7,8,9:
                setAirQuality('High')
            break;
            case 10:
                setAirQuality('Very High')
            break;
        }
    },[currentData?.air_quality['gb-defra-index']])

    
    return (
        <>
            {currentData?.feelslike_c == undefined ? (
                <div className="loadingScreen">
                    loading...
                </div>
            ):(
            <div className='result'>
                <h2>{greeting} Here is the weather were you are</h2>
                <div className='result__info'>
                    <div className='result__info-left'>
                        <div className='result__info-left-top'>
                            <h2 className='dayOfWeek'>{weekday[date.getDay()]}</h2>
                            <h5 className='monthDay'>{`${date.getDate()}th ${month[date.getMonth()]}`}</h5>
                            <div className='result__info-left-top-location'>
                                <h5>{weatherData?.location?.region}</h5>
                                <h5>{weatherData?.location?.country}</h5>
                            </div>
                        </div>
                        <div className='result__info-left-bottom'>
                            <h3 className='temp'>{`${currentData?.temp_c}°C`}</h3>
                            <h5 className='desc'>{currentData?.condition.text}</h5>
                            {/* <img src={currentData?.condition.icon} alt='' /> */}
                        </div>
                    </div>
                    <div className='result__info-right'>
                        <div className='result__info-right-top'> 
                            <WeatherDetails keyWord='Feels Like' value={`${currentData?.feelslike_c} °C`}/>
                            <WeatherDetails keyWord='Wind' value={`${currentData?.wind_kph} km/h`}/>
                            <WeatherDetails keyWord='Wind Direction' value={`${windDirection}`}/>
                            <WeatherDetails keyWord='Humidity' value={`${currentData?.humidity} %`}/>
                            <WeatherDetails keyWord='Ultra Violet light strength' value={`${currentData?.uv} ${uvStrength}`}/>
                            <WeatherDetails keyWord='Rainfall' value={`${currentData?.precip_mm} mm`}/>
                            <WeatherDetails keyWord='Air Pollution Index' value={`${currentData?.air_quality['gb-defra-index']} ${airQuality}`}/>
                        </div>
                        <div className='result__info-right-bottom'>
                            <DaysForcast icon={foreCast?.forecastday[0]?.day?.condition.icon} dayOfWeek={"Today"} temp={foreCast?.forecastday[1]?.day?.avgtemp_c}/>
                            <DaysForcast icon={foreCast?.forecastday[1]?.day?.condition.icon} dayOfWeek={weekday[date.getDay()+1]} temp={foreCast?.forecastday[1]?.day?.avgtemp_c}/>
                            <DaysForcast icon={foreCast?.forecastday[2]?.day?.condition.icon} dayOfWeek={weekday[date.getDay()+2]} temp={foreCast?.forecastday[2]?.day?.avgtemp_c}/>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Result
