import React,{ useEffect, useState }  from 'react'
// import { useEffect } from 'react/cjs/react.development';
import './result.scss'
import WeatherDetails from './weatherDetails/weatherDetails.jsx';
import DaysForcast from './daysForcast/daysForcast.jsx'

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Result = ({weatherData}) => {
    const [clockState, setClockState] = useState();
    const [background, setBackground] = useState(undefined)
    
    let greeting = 'Hello!';
    let airQuality = '';
    let uvRating = '';
    let windDirection = ''
    const currentData = weatherData?.current;
    const foreCast = weatherData?.forecast;
    
    const date = new Date()
    const hours = date.getHours();
    const day = date.getDate();
    const monthOfYear = month[date.getMonth()]
    
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
    
    let arrOfDiretions = '';
    let direction = ''
    if(windDir != undefined){
        arrOfDiretions = windDir.split('')
        for(let i = 0; i< arrOfDiretions.length;i++){
            if(arrOfDiretions[i]== 'S'){
                arrOfDiretions[i] = 'South'
            }else if(arrOfDiretions[i]=='W'){
                arrOfDiretions[i] = 'West'
            }else if(arrOfDiretions[i]=='N'){
                arrOfDiretions[i] = 'North'
            }else if(arrOfDiretions[i]=='E'){
                arrOfDiretions[i] = 'East'
            }
        }
    direction = arrOfDiretions.join(' ')
    }

    useEffect(() => {
        setInterval(() => {
            const datee = new Date()
            setClockState(datee.toLocaleTimeString())
        },1000)
    }, [])

    let condition = weatherData?.current?.condition?.text;
    const loadBackground = () => {
        if(condition === 'Sunny'){
            setBackground('sunny')
        }else if(condition === 'Clear'){
            setBackground('clear')
        }else if(condition === 'Rain'){
            setBackground('rainy')
        }else if(condition === 'Fog'|| 'Freezing Fog'|| 'Mist'){
            setBackground('fog')
        }else if(condition === 'Cloudy' || 'Overcast'){
            setBackground('cloudy')
        }else if(condition === 'Patchy light rain with thunder' || 'Moderate or heavy rain with thunder' || 'Patchy light snow with thunder' 
        || 'Moderate or heavy snow with thunder'){
            setBackground('thunder')
        }else if(condition === 'Light snow' || 'Patchy snow possible' || 'Patchy light snow' 
        || 'Patchy moderate snow' || 'Moderate snow' || 'Patchy heavy snow' || 'Heavy snow'){
            setBackground('snow')
        }else if(condition === 'Rainy' || 'Patchy rain possible' || 'Patchy light drizzle'|| 'Light drizzle'
        || 'Patchy light rain', 'Light rain' || 'Moderate rain at times' || 'Moderate rain' 
        || 'Heavy rain at times' || 'Heavy rain' || 'Light freezing rain' || 'Moderate or heavy freezing rain' 
        || 'Light rain shower' || 'Moderate or heavy rain shower' || 'Torrential rain shower'){
            setBackground('rainy')
        }
    }
    useEffect(loadBackground, [condition])
    

    return (
        <>
            {currentData?.feelslike_c == undefined ?(
                <div className="loadingScreen">
                    loading...
                </div>
            ):(
            <div className='result'>
                <h2>{date.getHours() < 12? `${clockState}am`: `${clockState}pm`}</h2>
                <h2>{greeting} Here is the weather were you are</h2>
                <div className='result__info'>
                    {background != undefined && <div className={`result__info-left ${background}`}>
                        <div className='result__info-left-top'>
                            <h1 className='dayOfWeek'>{weekday[date.getDay()]}</h1>
                            <h4 className='monthDay'>{day == 1 ? `${day}st ${monthOfYear}`: day == 2?`${day}nd ${monthOfYear}`: day == 3?`${day}rd ${monthOfYear}` : `${day}th ${monthOfYear}`}</h4>
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
                            <WeatherDetails keyWord='Feels Like' value={`${currentData?.feelslike_c} °C`}/>
                            <WeatherDetails keyWord='Wind' value={`${currentData?.wind_kph} km/h`}/>
                            <WeatherDetails keyWord='Wind Direction' value={`${direction}`}/>
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
