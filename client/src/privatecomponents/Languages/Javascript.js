import React from 'react'
import { Navigate } from 'react-router-dom'
import "../../headers/Lang.css"
import Header from '../../headers/Header'
import LangHeader2 from '../../headers/LangHeader2'

const Javascript = () => {
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return (
        <div>
            <Header />
            <LangHeader2 />
            <div className="container">
                <h1>step 1:</h1>
                <h3>Use VScode Editor</h3>
                <p><b>Note :</b>please avoid using notepad for coding. For coding javascript, use Vscode for best experience and easy to debug(find error)</p>
                <h1>step 2:</h1>
                <h3>complete Telusko (navin reddy) javascript video series</h3>
                <a href="https://www.youtube.com/watch?v=PlbupGCBV6w&list=PLsyeobzWxl7rrvgG7MLNIMSTzVCDZZcT4" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch series of javascript</a>
                <p><b>Note:</b> Make sure you complete all videos in the series before going to step 3</p>
                <h1>step 3:</h1>
                <h3>complete Telugu Skillhub javascript 2hr video </h3>
                <a href="https://youtu.be/sPJB_2Kedds" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch video of javascript</a>
                <p><b>Note:</b> Make sure you watch complete video from ES5 to ES12 versions</p>

            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    )
}

export default Javascript

