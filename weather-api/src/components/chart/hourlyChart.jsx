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

    let times = [];
    let temps = [];
    let feelsLike = [];
    let rainFall = [];
    
    let chartData = {
        labels: timesData,
        datasets: [
            {
                label: 'Temperature',
                data: tempData,
                fill: true,
                borderColor:"darkblue",
                borderWidth:3,
                pointRadius:0,
                // pointBorderColor: "rgba(0,0,0,0)",
                // pointBackgroundColor: "rgba(0,0,0,0)",
                // pointHoverBackgroundColor: "#5ac53b",
                // pointHoverBorderColor:"#000000",
                // pointHoverBorderWidth:4,
                // pointHoverRadius:3,
            },{
                label: 'Feels Like',
                data: feelsLikeData,
                fill: true,
                borderColor:"grey",
                borderWidth:3,
                pointRadius:0,
            },{
                label: 'Rain Fall',
                data: rainFall,
                fill: true,
                borderColor:"blue",
                borderWidth:3,
                pointRadius:0,
            }
        ],
    }
    
    const loadChartData = () => {
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

    useEffect(loadChartData,[weatherData?.forecast?.forecastday[0]?.hour[0].temp_c])
    return (
        <div className='chart'>
            {weatherData?.forecast?.forecastday[0]?.hour[0].temp_c == undefined ? (
                <div>loading...</div>
            ):(
            <Line 
                data={weatherData?.forecast?.forecastday[0]?.hour[0].temp_c == undefined ? null : chartData}
                options = {{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        title:{
                            display: true,
                            text: 'Temperature through the day'
                        },
                        legend: true // Hide legend
                    },
                }}
            />)}
        </div>
    )
}

export default MyCharts
