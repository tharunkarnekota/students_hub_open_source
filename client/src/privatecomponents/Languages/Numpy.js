import React from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../../headers/Header'
import LangHeader3 from '../../headers/LangHeader3'
import "../../headers/Lang.css"

const Numpy = () => {
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return (
        <div >
            <Header />
            <LangHeader3 />
            <div className='container'>
            
                <h1>step 1:</h1>
                <h3>complete Sundeep Saradhi Kanthey's ( Telugu ) 2hr video </h3>
                <a href="https://youtu.be/p2k_9I4VGYs" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch video on numpy</a>
                <p><b>Note:</b>Make sure you have basic idea on python</p>

                <h1>step 2:</h1>
                <h3>complete Krish Naik's ( English ) 2 videos on numpy </h3>
                <a href="https://youtu.be/vh525RjO6C0" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch first video</a><br /><br />
                <a href="https://youtu.be/OISfc1it7lc" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch second video</a>
                
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </div>
    )
}

export default Numpy
