import React, { useState } from 'react'
import arrowImage  from "../assets/arrow.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdatePost = () => {

    const{id} = useParams();
    const[NewTitle,setTitle] = useState("");
    const[content,setContent] = useState("");
    const navigate = useNavigate();



    const handleChange = async () =>{
        try {
            
            await axios.put(`http://localhost:5001/api/v1/update-note/${id}`,{
            NewTitle,
            content,
        });

        toast.success("Note updated successfully")
        setTimeout(() => {
            navigate("/");
        }, 2000);
        } catch (error) {
            console.error("Udpate failed!",error);
            toast.error("Error in note updation");
        }
        
    }

    
   return (
    <div className='min-h-screen flex flex-col gap-3 justify-center items-center p-3'>
        <div className=' w-[60%] flex items-center '>
        <Link to="/" className='border w-[35%] lg:w-[9%] lg:gap-1 md:w-[15%] flex h-8 justify-center items-center  rounded-3xl font-bold bg-white text-black'><img src={arrowImage} alt="arrow" className='w-6 h-6 md:w-5 md:h-5' />
        <h3> Back </h3>
        </Link>
        </div>
        <div className='border  w-[60%] flex flex-col p-4 gap-10 shadow-xl shadow-green-600 '>
            <div className=''>
                <h1 className='text-4xl font-semibold text-center p-3'>Edit Your Note</h1>
            </div>
            <div className='flex flex-col gap-3'>
            <label className='font-bold text-2xl'>Title</label>
            <input type="text" name="title" className='h-16 bg-black border p-2' placeholder='Write your title here..' value ={NewTitle} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='flex flex-col gap-3'>
            <label className='font-bold text-2xl'>Content</label>
            <textarea name="content" id="content" placeholder='Write your content here...' className='mb-5 h-16 bg-black  border p-2' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
            <button className='border w-[50%] m-auto h-16 bg-gray-600 text-xl font-semibold rounded-xl' onClick={handleChange}>Update</button>
        </div>
    </div>
  )
}

export default UpdatePost