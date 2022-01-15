import React, {useEffect, useState} from 'react'
import './home.scss'
import Result from '../components/result/result'
import Chart from '../components/chart/chart'

const Home = () => {
    const [weatherData, setWeatherData] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [location, setLocation] = useState(latitude,longitude)
    console.log(location)
    
    //fetching Data
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
		fetch(`http://api.weatherapi.com/v1/forecast.json?key=a97287063e5247b88a4123535221301&q=${latitude} ${longitude}&days=10&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data =>  setWeatherData(data))
            .catch(error => console.log(error))
	}, [latitude,longitude])


    //Setting Chart Data
    let times = [];
    let temps = [];
    const [xData, setXData] = useState();
    const [yData, setyData] = useState([]);

    const chartData = {
        labels: xData,
        datasets: [
            {
                label: '',
                data: yData,
                fill: true,
                backgroundColor: "black",
                borderColor:"#5ac53b",
                borderWidth:2,
                pointBorderColor: "rgba(0,0,0,0)",
                pointBackgroundColor: "rgba(0,0,0,0)",
                pointHoverBackgroundColor: "#5ac53b",
                pointHoverBorderColor:"#000000",
                pointHoverBorderWidth:4,
                pointHoverRadius:6,
            },
        ],
    }

    useEffect(() => {
        for(let i = 0; i<24 ;i++){
            times.push(`${i}:00`)
        }
    },[])
    setXData(times)

    useEffect(() => {
        for(let i = 0; i<weatherData?.forecast?.forecastday[0]?.hour[i].length;i++){
            temps.push(weatherData?.forecast?.forecastday[0]?.hour[i].temp_c);
        }
    },[])
    setyData(temps)


    console.log(weatherData?.forecast?.forecastday[0]?.hour[18].temp_c,'ss')
    // console.log(weatherData)
    return (
        <div className='home'>
            <h1>Weather Forecast</h1>
            {/* {JSON.stringify(weatherData)} */}
            <Result weatherData={weatherData}/>
            {/* <Chart weatherData={weatherData}/> */}
        </div>
    )
}

export default Home
