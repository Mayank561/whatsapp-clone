const express = require('express');

const newConversation = require('../controller/conversation-controller.js');
const getConversation = require('../controller/conversation-controller.js');
const addUser = require('../controller/User-controller.js');
const getUser = require('../controller/User-controller.js');
const newMessage = require('../controller/message-controller.js');
const upload = require('../utils/upload.js');

const { newMessage: newMessageES6, getMessage } = require('../controller/message-controller.js');
const { uploadImage, getImage } = require('../controller/image-controller.js');

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
