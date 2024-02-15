const express =require("express")
const task2O =require("../Models/task2Order")
const auth =require("../middlewire/auth")
const router =express.Router()

router.post("/showCars" ,auth,async(req,res)=>{
    try {
    //  const carsName =req.body.carName
    // const price =req.body.price
    const order =new task2O({...req.body, owner: req.user._id})
    await order.save()
    res.status(200).json(order)

    }catch(e) {
        res.status(400).json(e.message) 
    }
})

router.get("/task2OrderDetails" ,async(req,res)=>{
    task2O.find({}).then((task2) => {
        res.status(200).send(task2)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.delete('/showOrderofCars',async(req,res)=>{
    try{
        const _id = req.body._id
        const task = await task2O.findByIdAndDelete(_id)
        if(!task){
            res.status(404).send('No task is found')
        }
        res.status(200).send({_id,task})
    }
    catch(e){
        res.status(500).send(e.message)
    }
})
module.exports=router