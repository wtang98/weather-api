import React from 'react'
import './daysForcast.scss'

const DaysForcast = ({icon, dayOfWeek, temp}) => {
    return (
        <div className='forcast'>
            <div className="forcast__icon">
                <img src={icon} alt="" />
            </div>
            <div className="forcast__dayOfWeek">
                <p>{dayOfWeek}</p>
            </div>
            <div className="forcast__temp">
                <p>{temp}</p>
            </div>
        </div>
    )
}

export default DaysForcast
