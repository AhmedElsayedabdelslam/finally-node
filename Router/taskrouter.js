const express = require('express')
const Task = require('../Models/taskModel')
const auth = require("../middlewire/auth")
const authadmine = require("../middlewire/authadmine")
const router = express.Router()
const { imageupload } = require("../Models/upload")



// router.post('/task1',auth,imageupload.array("image",12),async (req, res) => {
//     try {
//         // console.log(req.)
//         const title =req.body.title
//         const description =req.body.description
//         const image=req.body.image
//         req.file=image
//         // console.log(image)
//         const task = new Task({title,description,owner: req.user._id })
//         await task.save()
//         res.status(200).send({task,
//             images:image

//         })
//         // res.send(req.file)                                        
//     }
//     catch (e) {
//         res.status(400).send(e.message) 
//     }

// }) 
// router.post('/task1',auth,imageupload.array("image",12),async (req, res) => {
//     try {
//         // console.log(req.)

//         // const image =req.files
//         console.log(req.file)
//         const task = new Task({...req.body,owner: req.user._id })
//         await task.save()
//         res.status(200).send({task  
//         })
//         // res.send(req.file)                                        
//     }
//     catch (e) {
//         res.status(400).send(e.message) 
//     }

// }) 
router.post('/task1', auth, imageupload.single("image"), async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const image = req.file
    console.log(image)
    const task = new Task({...req.body,image, owner: req.user._id })
    await task.save()
    res.json({ image, task })

});


router.get('/tasksDetails', authadmine, async (req, res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks)
    }).catch((e) => {
        res.status(400).send(e)
    })

})

router.delete('/task1Inf',async(req,res)=>{
    try{
        
        const _id = req.body._id
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            res.status(404).send('No task is found')
        }
        res.status(200).send({_id,task})
    }
    catch(e){
        res.status(500).send(e.message)
    }
})





module.exports = router 