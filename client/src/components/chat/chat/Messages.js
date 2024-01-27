import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, styled } from '@mui/material';
import { io } from 'socket.io-client';
import { getMessages, newMessages } from '../../../service/api';
import { AccountContext } from '../../../context/AccountProvider';
import Message from './Message';
import Footer from './Footer';

const Wrapper = styled(Box)`
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-size: 50%;
`;

const StyledFooter = styled(Box)`
  height: 55px;
  background: #ededed;
  width: 100%;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ person, conversation }) => {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');

  const scrollRef = useRef();
  const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      if (conversation && person) {
        const data = await getMessages(conversation._id);
        setMessages(data);
      }
    };
    getMessageDetails();
  }, [conversation?._id, person?._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (incomingMessage && conversation?.members?.includes(incomingMessage.senderId)) {
      setMessages((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage, conversation]);

  const receiverId = conversation?.members?.find((member) => member !== account.sub);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (!value || !conversation) return;

    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: receiverId,
          conversationId: conversation._id,
          type: 'text',
          text: value,
        };
      } else {
        message = {
          senderId: account.sub,
          conversationId: conversation._id,
          receiverId: receiverId,
          type: 'file',
          text: image,
        };
      }

      socket.current.emit('sendMessage', message);

      await newMessages(message);

      setValue('');
      setFile(null);
      setImage('');
      setNewMessageFlag((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message, index) => (
            <Container key={index} ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
