import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema([{
  title: {
    type: String,
    trim: true,
    required:"title is required"
  },
   photo:{
   data:Buffer,
   contentType:String
  },
  posteBy:{
    type:mongoose.Schema.ObjectId,
    ref:user
  },
  created:{
    type:Date,
    default:Date.now
  },
  likes:[{
    type:mongoose.Schema.ObjectId,
    ref:User
  }],
  comments:[{
    Text: String,
    created:{
      type:Date,
      default:Date.now
    },
    minlength: 10,
    maxlength: 250
  }],
}]);

export default mongoose.model('Post', PostSchema);