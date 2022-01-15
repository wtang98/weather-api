import React,{useState} from 'react'
import { Line } from 'react-chartjs-2'
import { useEffect } from 'react/cjs/react.development'
import './chart.scss'

const Chart = ({weatherData}) => {

    return (
        <div className='chart'>
            {/* <Line 
                data={chartData}
                options = {{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: false // Hide legend
                    },
                    scales: {
                        y: {
                            display: true // Hide Y axis labels
                        },
                        x: {
                            display: false // Hide X axis labels
                        }
                    }   
                }}
            /> */}
        </div>
    )
}

export default Chart
