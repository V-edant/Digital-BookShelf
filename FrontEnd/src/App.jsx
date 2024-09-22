// import React, { useEffect } from "react"
// import Home from "./pages/home"                                                                                                      // Importing Home component with a capital H
// import Navbar from "./components/Navbar/Navbar"
// import Footer from "./components/Footer/Footer"
// import{ Routes, Route} from "react-router-dom"
// import AllBooks from "./pages/AllBooks"
// import SignUp from "./pages/SignUp"
// import Login from "./pages/Login"
// import Cart from "./pages/Cart"
// import Profile from "./pages/Profile"
// import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails"
// import { useDispatch,useSelector } from "react-redux"
// import { authActions } from "./store/auth"
// import Favourites from "./components/Profile/Favourites"
// import UserOrderHistory from "./components/Profile/UserOrderHistory"
// import Settings from "./components/Profile/Settings"
// import AllOrders from "./pages/AllOrders"
// import AddBook from "./pages/AddBook"
// import UpdateBook from "./pages/UpdateBook";

// const App = () => {
// const dispatch = useDispatch()
//   const role = useSelector((state) => state.auth.role)
//   useEffect(() => {
//     if(
//       localStorage.getItem("id")&&
//       localStorage.getItem("token")&&
//       localStorage.getItem("role")
//     ){
// dispatch(authActions.login())
// dispatch(authActions.changeRole(localStorage.getItem("role")))

//     }
//   }, [])
// return (
//     <div>
    
//               <Navbar />
//               <Routes>
//                 <Route exact path = "/" element = { <Home />} />
//                 <Route  path = "/all-books" element = { <AllBooks />} />
//                 <Route  path = "/cart" element = { <Cart />} />
//                 <Route  path = "/profile" element = { <Profile />} >
//                 {role === "user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} /> }
//                 {role === "admin" && <Route path="/profile/add-book" element={<AddBook />} /> }
//                 <Route path="/profile/settings" element={<Settings />} /> 
//                  </Route>
//                 <Route  path = "/Login" element = { <Login />} />
//                 <Route  path = "/updateBook/:id" element = { <UpdateBook />} />
//                 <Route  path = "/SignUp" element = { <SignUp />} />
//                 <Route path = "view-book-details/:id" element = {<ViewBookDetails />}/>
//               </Routes>
//               <Footer />
      
               
      
      
//     </div>
//   )// AT LINE 40 //here we can define multiple routes herer and also index here ttell that by-default where you will go i.e directly to the Favourites
//   //AT LINE 42 inki madat se yeh hoora hai ki jo side bar banaya hai waha pr jo favourites and order history ahi jb uspe click karoge toh page toh wohi rahega bss profile se directly aap favourites ya order history pe re-direct ho jaoge
// }

// export default App

import React, { useEffect } from "react";
import Home from "./pages/home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory"; // Make sure you import this!
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {/* For users: */}
          {role === "user" && (
            <>
              <Route index element={<Favourites />} /> {/* Default profile page */}
              <Route path="orderHistory" element={<UserOrderHistory />} /> {/* New order history route */}
            </>
          )}
          {/* For admins: */}
          {role === "admin" && (
            <>
              <Route index element={<AllOrders />} /> {/* Admin default */}
              <Route path="add-book" element={<AddBook />} />
            </>
          )}
          {/* Common routes for both users and admins */}
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
