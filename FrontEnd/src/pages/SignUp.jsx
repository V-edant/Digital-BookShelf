import React , {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const SignUp = () => {
  const [Values,setValues] = useState({username:"",
     email: "",
      password: "",
       address: "",})

const navigate = useNavigate()       
       const change = (e) => {
        const {name, value} = e.target
        setValues({ ...Values, [name]: value})
       }
       const submit = async ()=> {
          try {
              if(Values.username === "" || Values.email === "" ||Values.password === "" || Values.address === "" ){
                alert("All Feilds Are Required To Be Filled!")
              } else{
                const response = await axios.post("https://digital-bookshelf.onrender.com/api/v1/sign-up" ,Values)// this is the thing that is sending data to the backend
                alert(response.data.message)
                navigate("/LogIn")
              }
          }
          catch (error){
            alert(error.response.data.message)
          }
       }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>Username</label>
            <input 
              type="text" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
              placeholder='Username...'
              name='username' 
              
              required
              value={Values.username}
              onChange={change}
            />
          </div>
            <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Email</label>
            <input 
              type="text" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
              placeholder='xyz@email.com...'
              name='email' 
             
              required 
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Password</label>
            <input 
              type="password" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
              placeholder='Password...'
              name='password' 
             
              required 
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Address</label>
            <textarea 
              type="text" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
              rows="5"
              placeholder='Address...'
              name='address' 
              
              required 
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 hover:bg-white hover:text-zinc-800 transition-all duration-300' onClick={submit} >
              Sign Up

            </button>

          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or </p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an Account? &nbsp;     

<Link to = "/login" className='hover:text-blue-500'>
<u>LogIn</u>
</Link>
</p>  
        </div>
      </div>
    </div>
  );
}

export default SignUp;
