import React, { useEffect } from "react"
import Home from "./pages/home"  // Importing Home component with a capital H
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import{ Routes, Route} from "react-router-dom"
import AllBooks from "./pages/AllBooks"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails"
import { useDispatch,useSelector } from "react-redux"
import { authActions } from "./store/auth"
const App = () => {
  //w were having a problem that when user were logged in and we refreshed the page the login and signup page were back again altough the user was stilled logged in and this should not been shown so we are doinf this to handle it
 
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role)
  useEffect(() => {
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
dispatch(authActions.login())
dispatch(authActions.changeRole(localStorage.getItem("role")))

    }
  }, [])
return (
    <div>
    
              <Navbar />
              <Routes>
                <Route exact path = "/" element = { <Home />} />
                <Route  path = "/all-books" element = { <AllBooks />} />
                <Route  path = "/cart" element = { <Cart />} />
                <Route  path = "/profile" element = { <Profile />} />
                <Route  path = "/Login" element = { <Login />} />
                <Route  path = "/SignUp" element = { <SignUp />} />
                <Route path = "view-book-details/:id" element = {<ViewBookDetails />}/>
              </Routes>
              <Footer />
      
               
      
      
    </div>
  )
}

export default App
