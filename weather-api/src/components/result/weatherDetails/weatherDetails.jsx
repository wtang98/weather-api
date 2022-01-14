import React from 'react'
import './weatherDetails.scss'

const WeatherDetails = ({keyWord, value}) => {
    return (
        <div className='details'>
            <div className='details__key'>
                {keyWord}
            </div>
            <div className='details__value'>
                {value}
            </div>
        </div>
    )
}

export default WeatherDetails
