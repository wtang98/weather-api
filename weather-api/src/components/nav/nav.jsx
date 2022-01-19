import React from 'react'
import './nav.scss'

const Nav = ({title}) => {
    return (
        <div className='nav'>
            <h1>Weather Forecast</h1>
            <button><h4>{title}</h4></button>
        </div>
    )
}

export default Nav
