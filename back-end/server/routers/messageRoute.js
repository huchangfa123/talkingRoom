import Router from 'koa-router';
import messageController from '../controller/message.ctrl';

const router = new Router();

router.get('/:id', messageController.getRoomMessage);

export default router;