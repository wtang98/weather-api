import React,{ useState, useEffect } from 'react'
import './hourlyChart.scss'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement
)

const MyCharts = ({weatherData}) => {
    const [timesData, setTimesData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [feelsLikeData, setFeelsLikeData] = useState([])
    const [rainfallData, setRainfallData] = useState([])


    let chartData = {
        labels: timesData,
        datasets: [
            {
                label: 'Temperature',
                data: tempData,
                borderColor:"darkblue",
            },
            {
                label: 'Feels Like',
                data: feelsLikeData,
                borderColor:"grey",
            }
        ],
    }
    const loadChartData = () => {
        let times = [];
        let temps = [];
        let feelsLike = [];
        let rainFall = [];
        for(let i = 0; i<24 ;i++){
            if(i<12){
                if(i<10){
                    times.push(`0${i}:00am`)
                }else{
                    times.push(`${i}:00am`)
                }
            }else{
                times.push(`${i}:00pm`)
            }
            temps.push(weatherData?.forecast?.forecastday[0]?.hour[i].temp_c);
            feelsLike.push(weatherData?.forecast?.forecastday[0]?.hour[i].feelslike_c);
            rainFall.push(weatherData?.forecast?.forecastday[0]?.hour[i].precip_mm)
        }
        setTimesData(times)
        setTempData(temps)
        setFeelsLikeData(feelsLike)
        setRainfallData(rainFall)
    }
    const options = {
        display:true,
        responsive: true,
        maintainAspectRatio: true,
        title:{
            display: true,
            text: 'Temperature through the day'
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }

    useEffect(loadChartData,[weatherData?.forecast?.forecastday[0]?.hour[0].temp_c])
    return (
        <>
        <div className='chart'>
            {weatherData?.forecast?.forecastday[0]?.hour[0].temp_c == undefined ? (
                <div>loading...</div>
            
            ):(
                <div className='chart__container'>
                    <h2>Temperature through the day</h2>
                    <Line 
                    data={weatherData?.forecast?.forecastday[0]?.hour[0].temp_c == undefined ? null : chartData}
                    labels = 'temp in de'
                    options = {options}
                    />
                </div>
            )}
        </div>
        </>
    )
}

export default MyCharts
