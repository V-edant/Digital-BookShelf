const express = require("express")
const app = express();
const cors = require("cors")//cors helps in data transfer from back to front or vice a versa

require("dotenv").config()
require("./conn/conn")

const User= require ("./routes/user");
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")
app.use(cors())
app.use(express.json())
//routes
app.use("/api/v1", User)
app.use("/api/v1", Books)
app.use("/api/v1", Favourite)
app.use("/api/v1", Cart)
app.use("/api/v1", Order)

//this helps to check if our backend is working or not

// app.get("/", (req,res) =>{
//    res.send("Heloo from backend side") 
// })
//creatimg port

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

// app.listen(process.env.PORT, () =>{
//     console.log(`Server Started at port ${process.env.PORT}`)
// })
