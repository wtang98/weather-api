import React from 'react'
import './result.scss'

const Result = ({weatherData}) => {
    
    const date = new Date()
    console.log(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return (
        <div className='result'>
            <div className='result__info'>
                <div className='result__info-left'>
                    <div className='result__info-left-top'>
                        <h2 className='dayOfWeek'></h2>
                        <h5 className='monthDay'></h5>
                        <h5 className='location'></h5>
                    </div>
                    <div className='result__info-left-bottom'>
                        <h2 className='temp'>{weatherData?.current?.temp_c}</h2>
                        <h5 className='desc'>{weatherData?.current?.condition.text}</h5>
                        {/* <img src={weatherData?.current?.condition.icon} alt="" /> */}
                    </div>
                    
                </div>
                <div className='result__info-right'>
                    <div className="result__info-right-top"> 

                    </div>
                    <div className="result__info-right-bottom">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result
