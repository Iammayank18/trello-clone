import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trello';

mongoose.connect(MONGO_URI).then(() => {
    console.log('connected');
}).catch(e => {
    console.error('DB connection failed:', e.message);
    process.exit(1);
})

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:''
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        required:true
    },
    status:{
        type:String,
        enum:['todo','in-progress','done'],
        default:'todo',
        required:true
    },
},{ timestamps:true })

const TASK=mongoose.model('Task',TaskSchema)
export default TASK

