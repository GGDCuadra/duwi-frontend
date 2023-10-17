import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/Login/Login'
import About from './components/AboutUs/AboutUs'
import Register from './components/Register/Register'
import { Navbar } from './components/Navbar/Navbar'
import './index.css'
import MovieDetail from './components/MovieDetail/MovieDetail'
import SeriesDetail from './components/SeriesDetail/SeriesDetail'
import UserDashboard from './components/UserDashboard/UserDashboard'
import FormCreate from './components/FormCreate/FormCreate'
import Cards from './components/Cards/Cards'
import FormCreate from './components/FormCreate/FormCreate'
import Cards from './components/Cards/Cards'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/home' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/movies' element={<Cards type='movies'/>}/>
      <Route path='/series' element={<Cards type='series'/>}/>
      <Route path='/movies' element={<Cards type='movies'/>}/>
      <Route path='/series' element={<Cards type='series'/>}/>
      <Route path='/movie/:id' element={<MovieDetail/>}/>
      <Route path='/serie/:id' element={<SeriesDetail/>}/>
      <Route path='/user' element={<UserDashboard/>}/>
      <Route path='/formCreateEdit' element={<FormCreate/>}/>
    </Routes>
   </div>
  )
}

export default App
