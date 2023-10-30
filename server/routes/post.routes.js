import express from 'express';
import authCtrl from'../controllers/auth.controller';
import userCtrl from'../controllers/user.controller';
import postCtrl from'../controllers/post.controller';
const router = express.Router();

const route=express.Router();

router.route('/api/posts/feed/:userid').get( authCtrl.requireSignin,postCtrl.listNewsfeed);

router.route('/api/posts/by/:userid').get(authCtrl.requireSignin.postCtrl.listByUser);

router.route('/api/posts/new/:userid').post(authCtrl.requireSignin,postCtrl.create);

router.route('/api/posts/photo/:postid').get(postCtrl.photo);

router.route('/api/posts/like').put(authCtrl.requireSignin.postCtrl.like);

router.route('/api/posts/unlike').put(authCtrl.requireSignin,postCtrl.unlike);

router.route('/api/post/postld').delete(authCtrl.requireSignin,postCtrl.isPoster,postCtrl.remove);

router.route('/api/post/comment').put(authCtrl.requireSignin,postCtrl.comment);

router.route('/api/post/uncomment').put(authCtrl.requireSignin,postCtrl.uncomment);

router.param('userid',userCtrl.userById);

router.param('postid',postCtrl.postById);

export default router;