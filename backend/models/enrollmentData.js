const mongoose = require('mongoose')
const enrollSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    courseId:{
        type:String,
        require:true
    },
    enrollId:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    enrollDate:{
        type:String,
        require:true
    },
    issueStatus:{
        type:String,
        require:true
    }
    
})

const enroll = mongoose.model('enrollment' ,enrollSchema);


module.exports=enroll