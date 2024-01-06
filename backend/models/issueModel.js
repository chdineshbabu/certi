const mongoose = require('mongoose')
const issueSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    courseId:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    enrollId:{
        type:String,
        require:true
    },
    issueId:{
        type:String,
        require:true
    },
    issueDate:{
        type:String,
        require:true
    },
    enrollDate:{
        type:String,
        require:true
    },
    verifiedStatus:{
        type:String,
        require:true
    },
    transactionHash:{
        type:String,
        require:true
    },
    blockHash:{
        type:String,
        require:true
    },
    blockNumber:{
        type:String,
        require:true
    },
    from:{
        type:String,
        require:true
    }
    
})

const issue = mongoose.model('issue' ,issueSchema);


module.exports=issue