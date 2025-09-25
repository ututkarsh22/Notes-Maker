import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import imageDelete from "../assets/deleteImg.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/api/v1/getNotes");
        setNotes(res.data.getNotes);
      } catch (error) {
        console.log("Error in fetching", error);
        toast.error("Fetching notes failed");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/v1/deletenote/${id}`);
      toast.success("Note deleted successfully");
      setNotes(notes.filter((e) => e._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="min-h-screen flex p-6 justify-center">
        {isLoading ? (
          <p className="text-xl font-semibold">Loading...</p>
        ) : notes.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {notes.map((note, ind) => (
              <div
                key={ind}
                className={`bg-green-900 p-4 border border-black rounded-lg shadow-xl shadow-gray-600 flex flex-col justify-between ${note.length>4 ? " " : "lg:h-[50%]"} ${note.length>2 ? " " : "md:h-[50%]"}`}
              >
    
                <div className="flex-1 flex flex-col gap-4">
                  <h1 className="font-bold text-xl text-center text-green-300">
                    {note.title}
                  </h1>
                  <p className="text-gray-200 text-sm whitespace-pre-line">
                    {note.content.length > 120
                      ? note.content.slice(0, 120) + "..."
                      : note.content}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  {/* Created Date */}
                  <div>
                    <h6 className="text-red-400 font-semibold text-sm">
                      Created On:
                    </h6>
                    <h4 className="text-xs text-gray-300">
                      {new Date(note.updatedAt).toLocaleString()}
                    </h4>
                  </div>

             
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/noteDetail/${note._id}`}
                      className="border px-3 py-1 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                    >
                      View
                    </Link>

                    <Link
                      to={`/editPost/${note._id}`}
                      className="border px-3 py-1 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(note._id)}
                      className="border border-green-900 rounded-xl p-2 hover:bg-gray-800 transition flex items-center justify-center"
                    >
                      <img
                        src={imageDelete}
                        alt="delete"
                        className="w-6 h-6 object-contain"
                      />
                    </button>
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
};

export default Home;
