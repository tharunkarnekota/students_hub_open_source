import React from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../../headers/Header'
import LangHeader3 from '../../headers/LangHeader3'
import "../../headers/Lang.css"

const Pandas = () => {
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
                <a href="https://youtu.be/brgzTJwHIKI" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch video on Pandas</a>
                <p><b>Note:</b>Make sure you have basic idea on python</p>

                <h1>step 2:</h1>
                <h3>complete Krish Naik's ( English ) 3 videos on pandas </h3>
                <a href="https://youtu.be/QUClKFFn1Vk" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch first video</a><br /><br />
                <a href="https://youtu.be/tW1BWtQRZ2M" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch second video</a><br /><br />
                <a href="https://youtu.be/BN0nnnadFl0" target="_blank" rel="noreferrer" className="btn btn-info">Click here to Watch Third video</a>

            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </div>
    )
}

export default Pandas
