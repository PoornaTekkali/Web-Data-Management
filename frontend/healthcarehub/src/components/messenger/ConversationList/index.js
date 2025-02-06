import React, {useState, useEffect} from 'react';
import axios from 'axios';
import profile from './../../../assets/profile.png'
import './ConversationList.css';

export default function ConversationList({ changeChat }) {
  const [conversations, setConversations] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [ filtername , setfiltername] = useState();

  
    const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };


  useEffect(() => {
    getConversations();
    console.log(conversations);
  },[])



 const getConversations = async () => {

      try {
            const response = await axios.get('/api/get/users',  {
            timeout: process.env.timeout  // Set timeout to 2 seconds
          })
            setConversations(response.data)
        }
          catch (error) {
    }
  }

 const searchConversations = async () => {

      try {
            const response = await axios.get(`/api/get/search/users?name=${filtername}`,  {
            timeout: process.env.timeout  // Set timeout to 2 seconds
          })
            setConversations(response.data)
        }
          catch (error) {
    }
  }

    return (
      <div className="conversation-list">

      <div className="toolbar">
        <div className="left-items"> </div>
        <h1 className="toolbar-title"> Messenger </h1>
        <div className="right-items"> <i className="toolbar-button ion-ios-add-circle-outline" /> </div>
      </div>
        
        <div className="conversation-search">
        
        <input
          type="Search"
          className="conversation-search-input"
          placeholder="Search Users"
          value={filtername}
          onChange={e => setfiltername(e.target.value)}
          onKeyDown={e => {
          if (e.key === 'Enter') {
            searchConversations();
          }
        }
      }
        />
      
      </div>
        {conversations.map((conversation , index)  =>
              <div
                  key={conversation.id}
                  className={`conversation-list-item ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, conversation)}
                >
                <img className="conversation-photo" src={profile} alt="conversation" />
                <div className="conversation-info">
                <h1 className="conversation-title">{ conversation.firstname }</h1>
                </div>
          </div>
          )}
      </div>
    );
}