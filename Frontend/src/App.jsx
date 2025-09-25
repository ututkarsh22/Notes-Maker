import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NewPost from './pages/NewPost'
import UpdatePost from './pages/UpdatePost'
import GetNoteDetail from './pages/getNoteDetail'


const App = () => {
  return (
    
    <div className='h-full bg-black text-white flex flex-col p-3'>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/newPost" element={<NewPost/>}/>
      <Route  path="/editPost/:id" element={<UpdatePost/>}/>
      <Route  path="/noteDetail/:id" element={<GetNoteDetail/>}/>
    </Routes>
    
    
    </div>
  )
}

export default App