import Router from 'koa-router';
import userController from '../controller/user.ctrl';

const router = new Router()

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
