import Router from 'koa-router';
import userController from '../controller/user.ctrl';

const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/onlineUsers', userController.onlineUsers);
router.post('/ifLogin', userController.ifLogin);
router.post('/createRoom', userController.createRoom);
router.post('/joinRoom', userController.joinRoom);
router.post('/leaveRoom', userController.leaveRoom);
router.get('/myRooms', userController.getMyRooms);
router.get('/myInfo', userController.getUserData);


export default router;
