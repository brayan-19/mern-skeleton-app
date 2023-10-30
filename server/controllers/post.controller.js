import formidable from 'formidable';
import Post from '../models/post.model';
import errorHandler from './../helpers/dbErrorHandler';
import fs from 'fs';
import dbErrorHandler from './../helpers/dbErrorHandler';
import { error } from 'console';

const listNewsfeed = async (req, res) => {
  const following = req.profile.following;
  following.push(req.profile_id);
  try {
    const Post = await Post.find({postedBy:{$in:req.profile.following}})
    .populate('comments.postedBy','_id name')
    .populate('postedBy','_id name')
    .sort('-created')
    .exec();
    res.status(200).json({ data: posts});
  }catch(err){
    return res.status(200).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
};
const listByUser =async (req , res) =>{
  try{
    let posts = await Post.find({postedBy:req.profile_id})
    .populate ('comment.postedBy','_id name')
    .populate ('postedBy','_id name')
    .sort('-created')
    .exec();

    res.status (200).json(posts);
  } catch(err){
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
};

const postById = async (req,res,next,id) =>{
  try{
    let post =await Post.findById(id).populate('postedBy','_id name').exec();
    if (!post)
    return res.status('400').json({
    error:'post not found'
  });
  req.post=post;
  next();
  }catch (err){
    return res.status('400').json({
      error:'could not retrieve use post'
    });
  }
};

const create = (req,res,next)=>{
  let form =new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse (req,async(err,fields,files) =>{
    if (err){
      return res.status(400).json({
        error:'image could not be uploaded'
      });
    }
    let post = new Post =(fields);
    post.postedBy=req.profile;

    if (files,photo){
      post.photo.data = fs.readFileSync(files.photo.filepath);
      post.photo.contentType = files.photo.type;
    }

    try{
      let result = await post.save();
      res.json(result);
    }catch(error){
      return res.status(400).json({
        error:errorHandler.getErrorMessage(err)
      });
    }
  });
}

const isPoster =(req,res) =>{
  let isPoster = req.post &&req.auth && req.post.postById._id==req.auth._id;
  if (!isPoster) {
    error:'User is not authorized';
  }
  next();
};

const like= async (req,res) =>{
  try{
    let result =await post.findByIdAndUpdate(req.body.postld,{$push:{likes:req.body.userid}},{new:true});
    res.status(200).json(result);
  }catch(err){
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
};

const unlike = async(req,res)=>{
  try{
    let result = await Post.findByIdAndUpdate(req.body.postld,{$pull:{likes:req.body.userid}},{new:true});
    res.status(200).json(result);
  }catch(err){
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
};

const comment = async(req,res) => {
  let comment=req.body.comment;
  comment.postedBy= req.body.userid;
  try{
    let result=await Post.findByIdAndUpdate(req.body.postld,{$push:{comments: comment}},{new:true})
    .populate('comments.postedBy','_id name')
    .populate('postesBy','_id name')
    .exec();
    res.status(200).json(result);
  }catch(err){
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err),
      dest:'desd'
    });
  }
};

const uncomment =async (req,res)=>{
  let comment=req.body.comment;
  try{
    let result =await Post.findByIdAndUpdate(
      req.body.postld,
      {$pull:{comments:{_id:comment_id}}},
      {new:true}
    )
    .populate('comments.postedBy','_id name')
    .populate('postedBy','_id name')
    .exec();
    res.status(200).json(result);
  }catch(err){
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
};

const photo = (req,res,next)=>{
  res.set('content-Type',req.post.photo.buffer);
  return res.send(req.post.photo.data);
};

const remove =async(req,res)=> {
  let post=req.post;
  try{
    let deletedPost=await post.remove();
    res.status(400).json(deletedPost);
  } catch (err){
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
  };

export default{
  create,
  comment,
  isPoster,
  like,
  listNewsfeed,
  listByUser,
  photo,
  postById,
  remove,
  uncomment,
  unlike
};

  
