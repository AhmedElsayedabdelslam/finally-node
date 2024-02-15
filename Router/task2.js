const express =require("express")
const router =express.Router()
const auth =require("../middlewire/auth")
const authadmine =require("../middlewire/authadmine")
const Task2 =require("../Models/task2")

router.post("/task2" ,authadmine, async(req,res)=>{
    try{
        // const imageName=req.body.imageName
        // const carName=req.body.carName
        // const carDiscription =req.body.carDiscription
        // const price =require =req.body.price
        const task2 =new Task2({...req.body})
        await task2.save()
        res.status(200).send(task2)
    }catch(e){
        res.status(400).send(e)
    }
})
router.get("/task2Details" ,async(req,res)=>{
    Task2.find({}).then((task2) => {
        res.status(200).send(task2)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


router.delete('/inf-new-car',authadmine,async(req,res)=>{
    try{
        
        const _id = req.body._id
        const task = await Task2.findByIdAndDelete(_id)
        if(!task){
            res.status(404).send('No task is found')
        }
        res.status(200).send({_id,task})
    }
    catch(e){
        res.status(500).send(e.message)
    }
})



router.patch('/inf-new-car' , authadmine,async (req,res)=>{
    try {
     const _id =req.body._id
     const task2 =await Task2.findByIdAndUpdate (_id,req.body ,{
         new :true,
         runValidators :true
     })
     res.status(200).send(task2)
    }catch(error) {
          res.status(400).send(error)
    }
     
 })

module.exports=router