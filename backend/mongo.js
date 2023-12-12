
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://chdinesh:Dinesh@cluster0.8pt3fcu.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Database is connected");
}).catch(() => {
    console.log('Connection Failed')
})

const newSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    institue:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    position:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const collection = mongoose.model('colletion' ,newSchema);


module.exports=collection