const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    dec:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    courseId:{
        type:String,
        require:true
    }
    
})

const course = mongoose.model('course' ,courseSchema);


module.exports=course