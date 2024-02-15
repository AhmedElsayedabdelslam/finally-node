const mongoose = require("mongoose")

const taskSchama2 = new mongoose.Schema({
    imageName: {
        type: String,
        required: true,
        trim: true
    },
    carName: {
        type: String,
        required: true,
        trim: true
    },
    carDiscription: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    // owner :{
    //     type :mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref :'User'
    // }
})

const Task2 =mongoose.model('Task2',taskSchama2)
module.exports=Task2