import React, { useContext } from 'react'
import Post from './Post/Post'
import CreatePost from './Post/CreatePost'
import { IsLoggedInContext } from '../App';
export default function Home(props) {
 
  const {  socket } = props
  const isLoggedIn = useContext(IsLoggedInContext);

  return (
    <div className='py-16 bg-slate-100'>
    
      <CreatePost isLoggedIn={isLoggedIn} /> 
      
      <Post isLoggedIn={isLoggedIn}  socket = {socket}  />
    </div>
  )
}
