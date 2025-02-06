import React, { useState, useEffect, useRef } from "react";
import Message from '../Message';
import moment from 'moment';
import axios from "axios";
import profile from './../../../assets/profile.png'
import sound from './../../../assets/glass.mp3'
import './MessageList.css';

const MY_USER_ID = 'apple';

export default function MessageList({ currentChat, socket , currentUser}) {
  const [messages, setMessages] = useState([]);
  const [ message , setmessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const token = localStorage.getItem('token');



  useEffect(() => {

    const getMessages = async () => {
      try {
      const data = {
      from: currentUser.id,
      to: currentChat.id,
    }
      const response = await axios.post('/api/get/messages', data , {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      console.log(response);
      setMessages(response.data);
    }
    catch (error) { 
      console.log(error);
    }
    }
    getMessages();
    

    
  }, [currentChat]);

  

const handleSendMsg = async (msg) => {

try {
    const response = await axios.post('/api/send/message', {
      from: currentUser.id,
      to: currentChat.id,
      text: msg,
    },{
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });

    console.log('Sending message');
    console.log(response.data.message);
    socket.current.emit("send-msg", response.data.message );

    const msgs = [...messages];
    msgs.push(response.data.message);
    setMessages(msgs);
  }
  catch (error) { 
      console.log(error);
    }
}



  const Addmessage = () => {
    if (message.length > 0) {
      handleSendMsg(message);
      setmessage("");
    }
  };


  useEffect(() => {
    if (socket.current) {
      const defaultMessageSound = document.getElementById('defaultMessageSound');
      
      console.log('message recieved');
      socket.current.on("msg-recieve", (msg) => {
        if(msg){
          defaultMessageSound.play();
        }
        setArrivalMessage(msg);
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

useEffect(() => {
  if (messages.length > 0) {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}, [messages]);






  const renderMessages = () => {
  return messages.map((message, index) => (
    <Message
      key={index}
      isMine={message.from === currentUser.id}
      startsSequence={index === 0 || messages[index - 1].author !== message.author}
      endsSequence={index === messages.length - 1 || messages[index + 1].author !== message.author}
      created_at={message.created_at} // Always show created_at
      text={message.text}
    />
  ));
}

    return(
      <div className="message-list">
      <div className="toolbar">
      
        <div className="left-items" ><img className="conversation-photo" src={profile} alt="conversation" /> <h1 style={{'color':"white"}}>  {currentChat.firstname} </h1> </div>
        <div className="right-items">  </div>
      </div>

        <audio id="defaultMessageSound" src={sound} preload="auto" style={{"display": "none"}}></audio>


        <div className="message-list-container" ref={scrollRef}>{renderMessages()}</div>

      <div className="compose" style={{'height': '6%'}}>
        <input
          type="text"
          value={message}
          onChange={e => setmessage(e.target.value)}
          className="compose-input"
          placeholder="Type a message, @name"
          onKeyDown={e => {
          if (e.key === 'Enter') {
            Addmessage();
          }
        }}
          
        />
        <button className='SendMessage' onClick={Addmessage} > Send  </button>
        

        </div>
      

      </div>

    );
}