import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import About from './components/AboutUs/AboutUs'
import Register from './components/Register/Register'
import MovieDetail from './components/MovieDetail/MovieDetail'
import SeriesDetail from './components/SeriesDetail/SeriesDetail'
import UserDashboard from './components/UserDashboard/UserDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/movie/:id' element={<MovieDetail/>}/>
      <Route path='/serie/:id' element={<SeriesDetail/>}/>
      <Route path='/user' element={<UserDashboard/>}/>
    </Routes>
   </div>
  )
}

export default App
