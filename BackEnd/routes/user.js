const router = require ("express").Router()

const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {authenticateToken} = require("./userAuth")

//sign up
router.post("/sign-up", async (req,res) =>{
    try{
        const{username,email,password,address} = req.body

        //check what usernmae length is more than 4
        if(username.length < 4){
            return res.status(400).json({message:"Username length should be greater than 3"})
        }
      //chek username already exisi or not?
      const existingUsername = await User.findOne({username:username})

  if(existingUsername){
    return res.status(400).json({message:"Username already exists"})

  }

  //chek email already exisi or not?
  const existingEmail = await User.findOne({email:email})

  if(existingEmail){
    return res.status(400).json({message:"Email already exists"})

  }

  //check password length
  if(password.length<= 5){
    return res.status(400).json({message:"Password's length should be greater than 5 "})
  }
  const hashPass = await bcrypt.hash(password, 10);

  const newUser = new User({
    username:username,
    password:hashPass,
    email:email,
    address : address,
});
    await newUser.save();
    return res.status(200).json ({message:"SignUp is Successfull"});




    }catch(error){
      console.log(error)
        res.status(500).json({message:"Internal Server Error"});
    }
})


//Sign In
router.post("/sign-in", async (req,res) =>{
  try{
       const {username,password} = req.body;

       const exsistingUser = await User.findOne({username})
       if(!exsistingUser){
        res.status(400).json({message:"Invalid Credentials"});

       }

              await bcrypt.compare(password, exsistingUser.password , (err,data) => {
                if (data){

                  const authClaims = [{
                    name:exsistingUser.username},
                    {role:exsistingUser.role}]

                  const token = jwt.sign({authClaims}, "bookstore123", {expiresIn:"30d"})
                  res.status(200).json({id: exsistingUser._id, role : exsistingUser.role,token:token })
                }
                else{
                  res.status(400).json({message:"Invalid Credentials"})
                }
              })

  }
      catch(error){
      res.status(500).json({message:"Internal Server Error"});
  }
})

//get user information 
router.get("/get-user-information", authenticateToken, async (req,res)=>{
  try{
  const{id} = req.headers;
  const data = await User.findById(id).select('-password')// - sign here means to exclude the password
  return res.status(200).json(data)

  } catch(error){
    res.status(500).json({message: "Internal Server Error"})
  }
})

//update address
router.put("/update-address" , authenticateToken , async (req,res) => {
  try{
    const{id} = req.headers;
    const {address} = req.body
    await User.findByIdAndUpdate(id,{address : address})
    return res.status(200).json({message :"Your Address Has Been Updated Successfully" })
  } catch (error){
    res.status(500).json({message: "Internal Server Error"})

  }
})




module.exports=router;