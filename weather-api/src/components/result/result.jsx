import React,{ useEffect, useState }  from 'react'
// import { useEffect } from 'react/cjs/react.development';
import './result.scss'
import WeatherDetails from './weatherDetails/weatherDetails.jsx';
import DaysForcast from './daysForcast/daysForcast.jsx'
import SearchBar from './searchBar/searchBar';

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Result = ({weatherData, latitude, longitude, handleLat, handleLon, timeZone}) => {
    const [clockState, setClockState] = useState();
    const [background, setBackground] = useState(undefined)
    
    let greeting = 'Hello!';
    let airQuality = '';
    let uvRating = '';
    const currentData = weatherData?.current;
    const foreCast = weatherData?.forecast;
    
    const date = new Date()
    const hours = new Date().getHours();
    const day = date.getDate();
    const monthOfYear = month[date.getMonth()]
    const altTime = date.toLocaleTimeString('en-UK', {timeZone: timeZone})
    const altTimeHours = altTime.split(":")[1];

    useEffect(() => {
        setInterval(() => {
            const datee = new Date()
            setClockState(datee.toLocaleTimeString('en-UK'))
        },0)
    }, [timeZone])
    
    if(5 <= hours && hours < 12){
        greeting='Good Morning!'
    }else if(hours === 12){
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
    
    let arrOfDiretions = [];
    let direction = ''
    if(windDir !== undefined){
        arrOfDiretions = windDir.split('')
        for(let i = 0; i< arrOfDiretions.length;i++){
            if(arrOfDiretions[i]=== 'S'){
                arrOfDiretions[i] = 'South'
            }else if(arrOfDiretions[i]==='W'){
                arrOfDiretions[i] = 'West'
            }else if(arrOfDiretions[i]==='N'){
                arrOfDiretions[i] = 'North'
            }else if(arrOfDiretions[i]==='E'){
                arrOfDiretions[i] = 'East'
            }
        }
        direction = arrOfDiretions.join(' ')
    }

    let condition = weatherData?.current?.condition?.text;
    const loadBackground = () => {
        if(condition === 'Sunny'){
            setBackground('sunny')
        }else if(condition === 'Clear'){
            setBackground('clear')
        }else if(condition === 'Cloudy' || condition ===  'Overcast' || condition === 'Partly cloudy'){
            setBackground('cloudy')
        }else if(condition === 'Fog'|| condition === 'Freezing fog'|| condition === 'Mist'){
            setBackground('fog')
        }else if(condition === 'Patchy light rain with thunder' || condition ===  'Moderate or heavy rain with thunder' || condition ===  'Patchy light snow with thunder' 
        || condition ===  'Moderate or heavy snow with thunder'){
            setBackground('thunder')
        }else if(condition === 'Light snow' || condition ===  'Patchy snow possible' || condition ===  'Patchy light snow' 
        || condition ===  'Patchy moderate snow' || condition ===  'Moderate snow' || condition ===  'Patchy heavy snow' || condition ===  'Heavy snow'){
            setBackground('snow')
        }else if(condition === 'Rain'|| condition ===  'Rainy','Patchy rain possible'|| condition === 'Patchy light drizzle'|| condition === 'Light drizzle'
            || condition === 'Patchy light rain'|| condition ===  'Light rain'|| condition === 'Moderate rain at times'|| condition === 'Moderate rain' 
            || condition === 'Heavy rain at times'|| condition === 'Heavy rain'|| condition === 'Light freezing rain'|| condition === 'Moderate or heavy freezing rain' 
            || condition === 'Light rain shower'|| condition === 'Moderate or heavy rain shower'|| condition === 'Torrential rain shower'){
            setBackground('rainy')
        }
    }
    useEffect(loadBackground, [condition])



    
    return (
        <>
            {currentData?.feelslike_c === undefined ? (
                <div className="loadingScreen"></div>
            ):(
            <div className='result'>
                <header className="result__header">
                    <h1>Weather App</h1>
                    {latitude !== '' && longitude !== '' && <SearchBar latitude={latitude} longitude={longitude} handleLat={handleLat} handleLon={handleLon}/>}
                </header>
                <h2>{hours < 12? `${clockState}am`: `${clockState}pm`}</h2>
                <h3>{greeting}</h3>
                <div className='result__info'>
                    {background !== undefined && <div className={`result__info-left ${background}`}>
                        <div className='result__info-left-top'>
                            <h2 className='dayOfWeek'>{weekday[date.getDay()]}</h2>
                            <h4 className='monthDay'>{day === 1 ? `${day}st ${monthOfYear}`: day === 2?`${day}nd ${monthOfYear}`: day === 3?`${day}rd ${monthOfYear}` : `${day}th ${monthOfYear}`}</h4>
                            <h4>{altTime}</h4>
                            <div className='result__info-left-top-location'>
                                <h4>{weatherData?.location?.region}</h4>
                                <h4>{weatherData?.location?.country}</h4>
                            </div>
                        </div>
                        <div className='result__info-left-bottom'>
                            <div className="result__info-left-bottom-left">
                                <h1 className='temp'>{`${currentData?.temp_c}°C`}</h1>
                                <h2 className='desc'>{currentData?.condition.text}</h2>
                            </div>
                            <div className='result__info-left-bottom-right'>
                                <img src={currentData?.condition.icon} alt='' />
                            </div>
                        </div>
                    </div>}
                    <div className='result__info-right'>
                        <div className='result__info-right-top'> 
                            <WeatherDetails keyWord='Feels Like' value={`${currentData?.feelslike_c}°C`}/>
                            <WeatherDetails keyWord='Wind' value={`${currentData?.wind_kph} km/h`}/>
                            <WeatherDetails keyWord='Wind Direction' value={`${direction}`}/>
                            <WeatherDetails keyWord='Humidity' value={`${currentData?.humidity}%`}/>
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
