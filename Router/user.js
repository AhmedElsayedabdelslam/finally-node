const express =require("express");
const User =require("../Models/user");
// const { error } = require("console");
const bcryptjs =require("bcryptjs")
const router =express.Router();
const jwt =require("jsonwebtoken")
const auth = require("../middlewire/auth");
const authadmine =require("../middlewire/authadmine");
const { Task } = require("../Models/taskModel");
const { json } = require("body-parser");
//for register 

router.post("/" , async (req,res)=>{
    const username =req.body.username
    const email =req.body.email
    const password =req.body.password
    const age =req.body.age
    const existuser = await User.findOne({email:req.body.email})
    if(existuser){
        return res.status(400).send("Email is already exist please enter anthor email")
        // throw new Error("Email is already exist please enter anthor email")
    }else{
        const user=new User({username,email,password,age});
         user.save()
        .then((data)=>{
            console.log("A new person has registered ")
            res.status(200).send(data)
        })
        .catch((error)=>{
            res.send(error)
            // throw new Error(error)
        }) 
    }

})


router.post("/login" ,async (req,res)=>{
    const email =req.body.email
    const password =req.body.password
    const user =await User.findOne({email:email})
    if(!user){
        res.status(400).send("Invalid Password or Email")
    }else{
        const ismatch = await bcryptjs.compare(password,user.password)
        if(!ismatch){
            res.status(400).send("Invalid Password")
        }else{
            // const token =await user.generateToken();
            console.log("Your process is sucsses")
            // const token=generate(user._id)
            const token=await  user.generateToken()
            console.log("")
            const refreshToken = jwt.sign(
                { _id: user.id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '15m' }
              );
            const cookieOption = {
                expires: new Date(Date.now()+ 30*24*60*60*1000 ),
            };
            res.cookie("acsses-token",token,cookieOption)
           
            res.status(200).send({user,token,refreshToken})
        }
        
       
    }
    
})





// for admine auth
router.post("/developerPage"  ,authadmine,(req,res)=>{
    res.json("Welcome Admine")
})
  router.get("/userDetails", authadmine,(req,res)=>{
    User.find({}).then((users)=>{
          res.status(200).send(users)
    }).catch((e)=>{
        res.status(400).send(e)
    })
  })


  router.get('/apiUpdate/:id',authadmine,(req,res)=>{
    console.log(req.params)
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
           return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

router.patch('/updataUser' , authadmine,async (req,res)=>{
   try {
    const id =req.body.id
    const user =await User.findByIdAndUpdate (id,req.body ,{
        new :true,
        runValidators :true
    })
    res.status(200).send(user)
   }catch(error) {
         res.status(400).send(error)
   }
    
})


router.delete('/deleteUser' ,authadmine,async(req,res)=>{
    try {
    const _id =req.body.id
    const user =await User.findByIdAndDelete(_id)
    res.status(200).json(user)
   }catch(error) {
         res.status(400).json(error)
   }
    
})

// logout :
router.delete('/Home',auth,async(req,res)=>{
    try {
        const id =req.user._id
        const user =await User.findByIdAndDelete(id)
        res.status(200).json(user)
       }catch(error) {
             res.status(400).json(error)
       }
})

router.delete('/logoutAll',authadmine,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})







module.exports=router