const mongoose =require("mongoose")

const task2Schame =new mongoose.Schema({
    carName :{
        type :String,
        trim :true,
        required:true
    },
    price :{
        type :String,
        trim :true,
        required:true
    },
    owner :{
        required:true,
        type :mongoose.Schema.Types.ObjectId,
        ref :'User'
    }

})

const task2Order =mongoose.model('Task2O',task2Schame)
module.exports=task2Order