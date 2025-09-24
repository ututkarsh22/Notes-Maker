import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NewPost from './pages/NewPost'
import UpdatePost from './pages/UpdatePost'


const App = () => {
  return (
    
    <div className='h-full bg-black text-white flex flex-col p-3'>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/newPost" element={<NewPost/>}/>
      <Route  path="/editPost/:id" element={<UpdatePost/>}/>
    </Routes>
    
    
    </div>
  )
}

export default App