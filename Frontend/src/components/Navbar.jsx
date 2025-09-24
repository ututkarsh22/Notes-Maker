import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[20%] flex lg:justify-between md:justify-between items-center text-green-500 md:p-10 lg:p-10 justify-between p-3  '>
        <h1 className="text-2xl font-bold">ThinkNotes</h1>
        <Link to="/newpost" className='flex justify-center items-center bg-green-600 text-black p-3 border-black rounded-full sm:'><h2 className='font-bold text-center'>+ New Note</h2></Link>
    </div>
  )
}

export default Navbar