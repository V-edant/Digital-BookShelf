import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSort } from "react-icons/md";
import {useSelector } from "react-redux"

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role)

    if(isLoggedIn === false){
        links.splice(2,3) // If the user is not logged in (isLoggedIn === false), the links array is modified to remove the "Cart" and "Profile" links.
    }
    if(isLoggedIn == true && role === "user"){
        links.splice(4,1)
    }
    if(isLoggedIn == true && role === "admin"){
        links.splice(2,2)
    }
    if(isLoggedIn == false && role === "admin"){
        links.splice(2,1)
    }
    
    

   

    const [MobileNav, setMobileNav] = useState("hidden"); //MobileNav is a state variable that controls the visibility of the mobile navigation menu. Initially, it is set to "hidden".

    return (
        <>
            <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
                <Link to="/" className='flex items-center'>
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">Digital BookShelf</h1>
                </Link>
                <div className='nav-links-digitalbookshelf block md:flex items-center gap-4'>
                    
                    
                    <div className='hidden md:flex gap-4'>
                        {links.map((items, i) => (
                           <div className='flex items-center '>
                           {items.title === "Profile" || items.title === "Admin Profile" ? ( <Link
                                to={items.link}
                                className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                                key={i}
                            >
                                {items.title} 
                            </Link> ) :  (<Link
                                to={items.link}
                                className='hover:text-blue-500 transition-all duration-300'
                                key={i}
                            >
                                {items.title} {" "}
                            </Link> )}
                           </div>
                        ))}
                    </div>

                    
                    {isLoggedIn === false && (
                        <div className='hidden md:flex gap-4'>
                        <Link
                            to="/Login"
                            className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                        >
                            LogIn
                        </Link>
                        <Link
                            to="/SignUp"
                            className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                        >
                            SignUp
                        </Link>
                    </div>
                    )}


                    <button
                     className='block md:hidden text-white text-2xl hover:text-zinc-400' 
                    onClick={() => 
                    MobileNav === "hidden" 
                    ? setMobileNav("block") 
                    : setMobileNav("hidden")}>
                        <MdOutlineSort />
                    </button>
                </div>
            </nav>
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link
                        to={items.link}
                        className={` ${MobileNav}text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={() => 
                            MobileNav === "hidden" 
                            ? setMobileNav("block") 
                            : setMobileNav("hidden")}
                    >
                        {items.title}{" "}
                    </Link>
                ))}


                    {isLoggedIn === false && (
                        <>
                        
                <Link
                    to="/Login"
                    className= {`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                >
                    LogIn
                </Link>
                <Link
                    to="/SignUp"
                    className= {`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                >
                    SignUp
                </Link>
                </>
                    )}


            </div>
        </>
    );
};

export default Navbar;
