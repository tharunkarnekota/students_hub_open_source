import React from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../../headers/Header'
import LangHeader3 from '../../headers/LangHeader3'
import "../../headers/Lang.css"

const OS = () => {
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return (
        <div >
            <Header />
            <LangHeader3 />
            <div className='container'>
            
                <h1>step 1:</h1>
                <h3>complete Gate Smasher's Operating System playlist </h3>
                <a href="https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch video on OS</a>
                
                <h1>step 2:</h1>
                <h3>complete Neso Academy's Operating System playlist </h3>
                <a href="https://youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch video on OS</a>
            
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </div>
    )
}

export default OS
