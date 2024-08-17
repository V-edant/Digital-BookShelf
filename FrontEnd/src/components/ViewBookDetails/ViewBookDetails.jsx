import React,{useEffect,useState} from 'react'
import axios from "axios" //this hells to getch data from the backend
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { GrLanguage } from 'react-icons/gr';
import { RiHeartAdd2Fill } from "react-icons/ri";
import { TbShoppingCartHeart } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";


const ViewDataDetails = () => {
   const {id} =  useParams()

   const [Data, setData] = useState()
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
   const role = useSelector((state) => state.auth.role)
  //  console.log(isLoggedIn, role)
   useEffect(() => { 
     const fetch = async() => {
     const response =  await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
    
     setData(response.data.data)
      }
      fetch()
     } , []) 

     const headers = {
      id: localStorage.getItem("id"),
      authorization : `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
    
    }
     const handleFavourite = async() => {
     const response =  await axios.put("http://localhost:1000/api/v1/add-book-to-favourite" , {}, {headers})
     alert(response.data.message)
     }
     const handleCart = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart" , {}, {headers})
    alert(response.data.message)
  }
  return (
   <> 
   {Data &&
     (<div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start '>
        <div className='w-full lg:w-3/6'>
        {" "}
        
        <div className=' flex flex-col lg:flex-row justify-around bg-zinc-800 p-12  rounded '>
          {" "}
        <img 
        src = {Data.url} 
        alt='/' 
        className='h-[50] md:h-[60vh] lg:h-[70vh] rounded'
         /> 

        {isLoggedIn === true && role === "user" && (
         <div className='flex flex-col md:flex-row lg:flex-col items-center  justify-between lg:justify-start  mt-4 lg:mt-0 '>
         <button className='text-white rounded lg:rounded-full text-3xl  p-3 bg-red-500 m-4 md:mr-0 transform transition-transform duration-300 hover:scale-110  flex items-center justify-center' onClick={handleFavourite}>
           <RiHeartAdd2Fill /> <span className='ms-4 block lg:hidden'>Add To Favourites !</span>
         </button>
         <button className='text-white rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 bg-blue-500 m-4 md:mr-0 transform transition-transform duration-300 hover:scale-110  flex items-center justify-center' onClick={handleCart}>
           <TbShoppingCartHeart /> <span className='ms-4 block lg:hidden'>Add To Cart !</span>
         </button>
       </div>
       )}
       


       {isLoggedIn === true && role === "admin" && (
         <div className='flex flex-col md:flex-row lg:flex-col items-center  justify-between lg:justify-start  mt-4 lg:mt-0 '>
         <button className='text-white rounded lg:rounded-full text-3xl  p-3  m-4 md:mr-0 transform transition-transform duration-300 hover:scale-110 hover:bg-red-100 flex items-center justify-center'>
         <FaUserEdit /> <span className='ms-4 block lg:hidden'>Edit Book</span>
         </button>
         <button className='text-red-500 rounded mt-8 md:mt-0  lg:rounded-full text-3xl p-3 bg-white-4 md:mr-0 transform transition-transform duration-300 hover:scale-110 hover:bg-blue-100 flex items-center justify-center'>
         <MdOutlineDeleteOutline /> <span className='ms-4 block lg:hidden'>Delete Book</span>
         </button>
       </div>
       )}
        </div>


        </div>
        <div className='p-4 w-full lg:w-3/6' >
        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {Data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
            <GrLanguage className = "me-3 " />{Data.language}</p>
        <p className='mt-4 text-zinc-100 text-3xl font-semibold' >
            Price : ₹ {Data.price}/-{" "}
        </p>
        </div>
        </div>)}
        {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center '> < Loader /> </div>}
   </>
  )
}

export default ViewDataDetails