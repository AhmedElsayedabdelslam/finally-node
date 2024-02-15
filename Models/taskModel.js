const mongoose = require('mongoose')

const TaskSchama =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    image : 
        {
            
            
        }
    ,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref : 'User'  // Model
        
    },
    
})

// const imageSchema = new mongoose.Schema({
//     filename: String,
//     contentType: String,
//     uploadDate: Date,
//     metadata: Object
//   });

//   TaskSchama.virtualpath('tasks' , {
//     ref: 'Image',
//     localField : "_id",
//     foreignField :"image",
    
//  }) 

// const Image = mongoose.model('Image', imageSchema, '/uploads/TASK'); 
const Task =mongoose.model('Task' ,TaskSchama)

module.exports = Task