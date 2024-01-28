import express from 'express';
import newConversation from '../controller/conversation-controller.js';
import getConversation from '../controller/conversation-controller.js';
import addUser from '../controller/User-controller.js';
import getUser from '../controller/User-controller.js';
import newMessage from '../controller/message-controller.js';
import upload from '../utils/upload.js';
import { newMessage as newMessageES6, getMessage } from '../controller/message-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';

const route = express.Router();

route.post('/add', addUser);
route.get('/users', getUser);

route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);

route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessage);

route.post('/file/upload', upload.single('file'), uploadImage);
route.get('/file/:filename', getImage);

export default route;
