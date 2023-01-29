import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

import Forgetpassword from './components/Forgetpassword'
import Resetpassword from './components/Resetpassword'

import Dashboard from './privatecomponents/Dashboard'
import Indprofile from './privatecomponents/Indprofile'
import Indprofile2 from './privatecomponents/Indprofile2'


import Myprofile from './privatecomponents/Myprofile'
import Languages from './privatecomponents/Languages'

    import Academics from './privatecomponents/Languages/Academics'
    import Placements from './privatecomponents/Languages/Placements'
    import CLanguage from './privatecomponents/Languages/CLanguage'
    import Python from './privatecomponents/Languages/Python'
    import Java from "./privatecomponents/Languages/Java"
    import Github from './privatecomponents/Languages/Github'
    import Linkedin from './privatecomponents/Languages/Linkedin'
    import Hackerrank from './privatecomponents/Languages/Hackerrank'
    import Codechef from './privatecomponents/Languages/Codechef'
    import DS from './privatecomponents/Languages/DS'
    import CPP from './privatecomponents/Languages/CPP'

    import Html from './privatecomponents/Languages/HTML'
    import Javascript from './privatecomponents/Languages/Javascript'
    import Reactpage from './privatecomponents/Languages/React'
    import Nodejs from './privatecomponents/Languages/Nodejs'
    import Express from './privatecomponents/Languages/Express'
    import Mern from './privatecomponents/Languages/Mern'
    import Next from './privatecomponents/Languages/Next'
    import ReactNative from './privatecomponents/Languages/ReactNative'

    import Databases from './privatecomponents/Languages/Databases'
        import Mysql from './privatecomponents/Languages/MySQL'
        import MongoDB from './privatecomponents/Languages/MongoDB'
        import Mssql from './privatecomponents/Languages/Mssql'
        import Firebase from './privatecomponents/Languages/Firebase'


    import Flask from './privatecomponents/Languages/Flask'
    import Django from './privatecomponents/Languages/Django'
    import Numpy from './privatecomponents/Languages/Numpy'
    import Pandas from './privatecomponents/Languages/Pandas'
    import ML from './privatecomponents/Languages/MachineLearning'
    import Linux from './privatecomponents/Languages/Linux'
    import OS from './privatecomponents/Languages/OS'
    import CN from './privatecomponents/Languages/CN'


import Mentors from './privatecomponents/Mentors'
import Project from "./privatecomponents/Project"
import Requirements from "./privatecomponents/Requirements"


import Trending from './privatecomponents/Trending'
import Alumini from './privatecomponents/Alumini'
import Aluminiprofile from './privatecomponents/Aluminiprofile'

import Teachers from './privatecomponents/Teachers'
import Resources from './privatecomponents/Resources'
import Youtube from './privatecomponents/Youtube'
import Internship from './privatecomponents/Internship'

import Clubs from './privatecomponents/Clubs'
// import Gdsc from './privatecomponents/clubsgroup/Gdsc'
import Gdsc from './privatecomponents/clubsgroup/Gdsc'
import Dss from './privatecomponents/clubsgroup/Dss'
import Photography from './privatecomponents/clubsgroup/Photography'
import Nss from './privatecomponents/clubsgroup/Nss'

import Contact from "./privatecomponents/Contact"



const App = () => {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/forgetpassword' exact element={<Forgetpassword />} />
        <Route path='/resetpassword' exact element={<Resetpassword />} />

        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/indprofile/:id' exact element={<Indprofile />} />
        <Route path='/indprofile2/:id' exact element={<Indprofile2 />} />

        <Route path='/myprofile' exact element={<Myprofile />} />
        <Route path='/languages' exact element={<Languages />} />

          <Route path="/academics" exact element={<Academics />} />
          <Route path="/placements" exact element={<Placements />} />
          <Route path="/cLanguage" exact element={<CLanguage />} />
          <Route path='/python' exact element={<Python />} />
          <Route path='/java' exact element={<Java />} />
          <Route path="/github" exact element={<Github />} />
          <Route path="/linkedin" exact element={<Linkedin />} />
          <Route path="/hackerrank" exact element={<Hackerrank />} />
          <Route path="/codechef" exact element={<Codechef />} />
          <Route path="/ds" exact element={<DS />} />
          <Route path="/cpp" exact element={<CPP />} />

          <Route path="/html" exact element={<Html />} />
          <Route path='/javascript' exact element={<Javascript />} />
          <Route path="/reactjs" exact element={<Reactpage />} />
          <Route path='/nodejs' exact element={<Nodejs />} />
          <Route path="/expressjs" exact element={<Express />}  />
          <Route path='/mern' exact element={<Mern />} />
          <Route path='/nextjs' exact element={<Next />} />
          <Route path="/reactnative" exact element={<ReactNative />} />

          <Route path="/databases" exact element={<Databases />} />
            <Route path="/mysql" exact element={<Mysql />} />
            <Route path="/mongodb" exact element={<MongoDB />} />
            <Route path="/mssql" exact element={<Mssql />} />
            <Route path="/firebase" exact element={<Firebase />} />

          <Route path="/flask" exact element={<Flask />} />
          <Route path="/django" exact element={<Django />} />
          <Route path="/numpy" exact element={<Numpy />} />
          <Route path="/pandas" exact element={<Pandas />} />
          <Route path="/machineLearning" exact element={<ML />} />
          <Route path="/linux" exact element={<Linux />} />
          <Route path="/os" exact element={<OS />} />
          <Route path="/cn" exact element={<CN />} />

        <Route path='/mentors' exact element={<Mentors />} />
        <Route path='/project' exact element={<Project />} />
        <Route path='/requirements' exact element={<Requirements />} />

      
        <Route path='/trending' exact element={<Trending />} />
        <Route path='/alumini' exact element={<Alumini />} />
        <Route path='/aluminiprofile' exact element={<Aluminiprofile />} />
        <Route path='/teachers' exact element={<Teachers />} />
        <Route path='/resources' exact element={<Resources />} />
        <Route path='/youtube' exact element={<Youtube />} />
        <Route path='/internship' exact element={<Internship />} />

        <Route path='/clubs' exact element={<Clubs />} />
          <Route path='/Nss' exact element={<Nss />} />
          <Route path='/gdsc' exact element={<Gdsc />} />
          <Route path='/dss' exact element={<Dss />} />
          <Route path='/photography' exact element={<Photography />} />

        <Route path='/contact' exact element={<Contact />} />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
