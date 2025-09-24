import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import imageDelete from '../assets/deleteImg.png';
import {Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Home = () => {

    const[notes,setNotes] = useState([]);
    const[isLoading,setLoading] = useState(false);
    useEffect(()=>{
        
        const fetchNotes = async() => {
        try {
            
            setLoading(true)
            const res = await axios.get("http://localhost:5001/api/v1/getNotes");
            console.log(res);
            setNotes(res.data.getNotes);
            
        } catch (error) {
            console.log("Error in fetching",error);
            toast.error("Fetching notes failed");

        }finally {
        setLoading(false);
      }
    }


        fetchNotes();

    },[])


    const handleDelete = async (id) =>{
      
      try {
        
        await axios.delete(`http://localhost:5001/api/v1/deletenote/${id}`)
        toast.success("Note deleted successfully");
        setNotes(notes.filter((e) => e._id !== id));

      } catch (error) {
        console.log(error)
        toast.error("Delete failed");
      }
    }

 return (
  <div className='min-h-screen text-white'>
    <Navbar/>
       <div className="min-h-screen flex p-4 justify-center">
    {isLoading ? (
      <p className="text-xl font-semibold">Loading...</p>
    ) : notes.length > 0 ? (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 min-w-full md:gap-4  p-3">
        {notes.map((note, ind) => (
          <div
            key={ind}
            className={`bg-green-900  p-2 border border-black rounded-lg shadow-xl shadow-gray-600 ${notes.length > 4 ? " " : "lg:h-[40%]"}`}
          >
           <div className=' h-[100%] flex flex-col justify-between'>
            <div className=' h-[100%] flex flex-col gap-4'>
            <h1 className='font-bold text-xl text-center'>{note.title}</h1>
            <p>{note.content}</p>
            </div>
            <div className='p-1 flex justify-between items-center'>
               <div>
                <h6 className='text-red-400'>Created On:</h6>
                <h4>{note.updatedAt}</h4>
                </div>
                <div className='lg:flex md:flex  gap-2 p-2 lg:items-center md:items-center'>
                  <button className='border p-1 rounded-xl px-3 ml-2 lg:mt-1 md:mt-1'><Link to={`/editPost/${note._id}`}>Edit</Link></button>
                 <button className=' p-2 hover:bg-gray-700 border border-green-900 rounded-xl' onClick={()=>{handleDelete(`${note._id}`)}}> <Link to="/"><img src={imageDelete} alt="" className='lg:w-10 lg:h-7 h-8 w-12'/></Link></button>
                </div>

            </div>
           </div>

            
          </div>
        ))}
      </div>
    ) : (
      <p className="text-lg font-medium">No notes found</p>
    )}
  </div>

  </div>
);
}

export default Home