import React, { useState } from 'react'
import NavbarNewpost from '../components/NavbarNewpost'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {

    const[title,setTitle] = useState("");
    const[content,setContent] = useState("");
    const navigate = useNavigate();

    const handleCreate = async () =>{
        try {

            const res = await axios.post("http://localhost:5001/api/v1/new-note",{
                title,
                content
            });

            if (res.status === 201 || res.status === 200) {
            toast.success("Note created successfully!");
            navigate("/"); 
            }

            
        } catch (error) {
            console.log(error);
            toast.error("Error in creating your note");
        }
    }
  return (
     <div className='min-h-screen bg-black flex flex-col'>
        <NavbarNewpost/>
        <div className=' p-3 shadow-lg shadow-green-900'>
            <h1 className='text-4xl font-semibold  text-center'>Create Your New Note</h1>
        </div>
        <div className='h-[100%]  flex flex-col justify-center m-10 items-center'>
        <div className=' w-[60%]  m-5 p-5 flex flex-col shadow-xl shadow-gray-700 gap-10 md:gap-5'>
            <div className='flex flex-col p-3 gap-1'>
                <label className='text-2xl font-semibold ' >Title</label>
                <input type="text" className='bg-black border rounded-xl h-16 px-3' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='flex flex-col gap-1 p-3'>
                <label className='text-2xl font-semibold p-2' >Content</label>
                <textarea  id="content" className='bg-black border rounded-xl h-16 p-4' value= {content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>

            <button className='border w-[50%] m-auto h-16 bg-gray-600 text-xl font-semibold rounded-xl' onClick={handleCreate}>
                Create
            </button>
            
        </div>
        </div>

     </div>
  )
}

export default NewPost