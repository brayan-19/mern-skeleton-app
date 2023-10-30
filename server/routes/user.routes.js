import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import auth from '../../client/auth/auth-helper';

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.route('/api/users/defaultphoto')
.get(userCtrl.defaultphoto)

router.route('/api/users/follow')
.put(authCtrl.requireSignin,
  userCtrl.addFollowing,
  userCtrl.addFollower)


router.route('/api/users/unfollow')
.put(authCtrl.requireSignin,
  userCtrl.removeFollowing,
  userCtrl.removeFollower)

  router.route('/api/auth/signin')
  .post(authCtrl.signin);
  router.route('/api/auth/signout')
  .get(authCtrl.signout);

router.param('userId', userCtrl.userById);

export default router;
