import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GetNoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/v1/getNote/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p className="text-lg font-medium">Note not found</p>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
  <div className="w-full max-w-3xl min-h-[70vh] bg-gray-900 rounded-2xl shadow-xl shadow-green-600 p-8 flex flex-col">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-green-400">Note Detail</h1>
      <Link
        to="/"
        className="bg-green-700 hover:bg-green-600 px-5 py-2 rounded-lg font-medium text-white transition"
      >
        Back to Home
      </Link>
    </div>

    {/* Title Section */}
    <div className="mb-6">
      <label className="text-lg font-semibold text-gray-400">Title:</label>
      <h2 className="text-2xl font-bold text-white mt-2">{note.title}</h2>
    </div>

    {/* Content Section */}
    <div className="flex-1 mb-6">
      <label className="text-lg font-semibold text-gray-400">Content:</label>
      <div className="bg-gray-800 mt-2 p-4 rounded-lg shadow-inner overflow-y-auto max-h-[300px]">
        <p className="text-gray-300 whitespace-pre-line">{note.content}</p>
      </div>
    </div>

    {/* Footer */}
    <div className="flex justify-end">
      <p className="text-sm text-gray-400 italic">
        Last Updated: {new Date(note.updatedAt).toLocaleString()}
      </p>
    </div>
  </div>
</div>
  );
};

export default GetNoteDetail;
