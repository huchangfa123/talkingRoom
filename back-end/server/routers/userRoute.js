import Router from 'koa-router';
import userController from '../controller/user.ctrl';

const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/onlineUsers', userController.onlineUsers);
router.post('/ifLogin', userController.ifLogin);

export default router;
