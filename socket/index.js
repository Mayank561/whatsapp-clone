import { Server } from 'socket.io';

const io = new Server(8000, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userData, socketId) => {
  if (!users.some(user => user.sub === userData.sub)) {
    users.push({ ...userData, socketId });
    console.log(`User added: ${userData.name}, ID: ${userData.sub}`);
  } else {
    console.log(`User already exists: ${userData.name}, ID: ${userData.sub}`);
  }
};

const removeUser = (socketId) => {
  const removedUser = users.find(user => user.socketId === socketId);

  if (removedUser) {
    users = users.filter(user => user.socketId !== socketId);
    console.log(`User removed: ${removedUser.name}, ID: ${removedUser.sub}`);
  } else {
    console.log(`User not found for socket ID: ${socketId}`);
  }
};

const getUser = (userId) => {
  return users.find(user => user.sub === userId);
};

io.on('connection', (socket) => {
  console.log('User connected');

  // Connect
  socket.on('addUser', (userData) => {
    addUser(userData, socket.id);
    io.emit('getUsers', users);
  });

  // Send message
  socket.on('sendMessage', (data) => {
    const user = getUser(data.receiverId);

    if (user) {
      io.to(user.socketId).emit('getMessage', data);
    } else {
      console.error(`User not found for id: ${data.receiverId}`);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
