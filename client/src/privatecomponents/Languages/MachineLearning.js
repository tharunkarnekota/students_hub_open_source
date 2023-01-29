import React from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../../headers/Header'
import LangHeader3 from '../../headers/LangHeader3'
import "../../headers/Lang.css"

const ML = () => {
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return (
        <div >
            <Header />
            <LangHeader3 />
            <div className='container'>
                
                <h1>step 1:</h1>
                <h3>complete Krish Naik channel's Machine Learning Playlist</h3>
                <a href="https://youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch series on ML</a>
                <p><b>Note:</b>Make sure you have perfect mentor and team to guide you and support you in learning ML</p>

            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    )
}

export default ML
