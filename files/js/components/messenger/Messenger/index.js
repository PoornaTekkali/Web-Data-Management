import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import Navbar from './../../navbar/Navbar'
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Welcome from "./Welcome";

export default function Messenger({settings}) {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {


      const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/get/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });

          if (response.status === 200) {
            setCurrentUser(response.data.user)
          }
        } 
      } catch (error) {
            console.error('Error fetching user data:', error);
      }
    }
    fetchUser();

  }, []);


  useEffect(() => {
    if (currentUser) {
      socket.current = io('https://healthcare-messenger.onrender.com/');
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


    return (
      <div className="messenger">
            <Navbar settings={settings} />
        <div className="scrollable messengersidebar">
          <ConversationList changeChat={handleChatChange}/>
        </div>

        

      {currentChat === undefined ? (
        <div className="scrollable content">
            <Welcome currentUser={currentUser}/>
        </div>
          ) : (
          <div className="scrollable content">
            <MessageList currentChat={currentChat} socket={socket} currentUser={currentUser}/>
          </div>
          )}

      </div>
    );
}