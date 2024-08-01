import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({data}) => {
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
        <div className='flex items-center flex-col justify-center'> {" "}
        <img src={"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"} className='h-[10vh]' />

        <p className='mt-3 text-xl text-zinc-100 font-semibold'>
          {data.username}
        </p>
        <p className='mt-1 text-normal text-zinc-300'> 
          {data.email}
       </p>
       <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block' ></div>
        </div>
   
        <div className=' w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to = "/profile"
          className = "text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300" >

            Favourites
            </Link>
            <Link to = "/profile/orderHistory"
            className = "text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300" 


            >
               Order History
            </Link>
            <Link to = "/profile/settings"
            className = "text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300" 
            >
              Settings
              </Link>
        </div>
        </div>
  )
}

export default Sidebar