import React,{ useEffect, useState }  from 'react'
// import { useEffect } from 'react/cjs/react.development';
import './result.scss'
import WeatherDetails from './weatherDetails/weatherDetails.jsx';
import DaysForcast from './daysForcast/daysForcast.jsx'

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Result = ({weatherData}) => {
    
    let greeting = 'Hello!';
    let airQuality = '';
    let uvRating = '';
    let windDirection = ''
    const currentData = weatherData?.current;
    const foreCast = weatherData?.forecast;
    
    const date = new Date()
    const hours = date.getHours();
    if(5 <= hours && hours < 12){
        greeting='Good Morning!'
    }else if(hours == 12){
        greeting='Its noon!'
    }else if(12 <= hours && hours < 19){
        greeting='Good Afternoon!'
    }else if(19 <= hours && hours <= 24 && hours < 5){
        greeting='Good Evening!'
    }

    const aQIndex = parseInt(currentData?.air_quality['gb-defra-index']);
    if(0 < aQIndex <= 3){
        airQuality = 'Low'
    }else if(3 < aQIndex <= 6){
        airQuality = 'Moderate'
    }else if(6 < aQIndex <= 9){
        airQuality = 'High'
    }else if(9 < aQIndex){
        airQuality = 'Very High'
    }

    const uvIndex = currentData?.uv
    if(uvIndex < 3){
        uvRating = 'Low'
    }else if(3 <= uvIndex < 6){
        uvRating = 'Moderate'
    }else if(6 <= uvIndex < 8){
        uvRating = 'High'
    }else if(8 <= uvIndex < 11){
        uvRating = 'Very High'
    }else{
        uvRating = 'Extreme'
    }

    const windDir = currentData?.wind_dir
    if(windDir == 'S'){
        windDirection = 'South'
    }
    if(windDir == 'W'){
        windDirection = 'West'
    }
    if(windDir == 'N'){
        windDirection = 'North'
    }
    if(windDir == 'E'){
        windDirection = 'East'
    }
    if(windDir == 'SW'){
        windDirection = 'South West'
    }
    if(windDir == 'SE'){
        windDirection = 'South East'
    }
    if(windDir == 'NW'){
        windDirection = 'North West'
    }
    if(windDir == 'NE'){
        windDirection = 'North East'
    }

    return (
        <>
            {currentData?.feelslike_c == undefined ?(
                <div className="loadingScreen">
                    loading...
                </div>
            ):(
            <div className='result'>
                <h2>{greeting} Here is the weather were you are</h2>
                <div className='result__info'>
                    <div className='result__info-left'>
                        <div className='result__info-left-top'>
                            <h1 className='dayOfWeek'>{weekday[date.getDay()]}</h1>
                            <h4 className='monthDay'>{`${date.getDate()}th ${month[date.getMonth()]}`}</h4>
                            <div className='result__info-left-top-location'>
                                <h4>{weatherData?.location?.region}</h4>
                                <h4>{weatherData?.location?.country}</h4>
                            </div>
                        </div>
                        <div className='result__info-left-bottom'>
                            <h1 className='temp'>{`${currentData?.temp_c}°C`}</h1>
                            <h2 className='desc'>{currentData?.condition.text}</h2>
                            {/* <img src={currentData?.condition.icon} alt='' /> */}
                        </div>
                    </div>
                    <div className='result__info-right'>
                        <div className='result__info-right-top'> 
                            <WeatherDetails keyWord='Feels Like' value={`${currentData?.feelslike_c} °C`}/>
                            <WeatherDetails keyWord='Wind' value={`${currentData?.wind_kph} km/h`}/>
                            <WeatherDetails keyWord='Wind Direction' value={`${windDirection}`}/>
                            <WeatherDetails keyWord='Humidity' value={`${currentData?.humidity} %`}/>
                            <WeatherDetails keyWord='Ultra Violet light strength' value={`${currentData?.uv} ${uvRating}`}/>
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
