import axios from "axios";
import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import Chat from '../pages/Chat';
import ChatInput from './ChatInput';
import Messages from './Messages';
import {SlArrowLeft} from 'react-icons/sl';
import { sendMessageRoute } from "../utils/APIroutes";
import { getAllMessagesRoute } from "../utils/APIroutes"; 
import {v4 as uuidv4} from "uuid";
export default function ChatContainer({currentChat, currentUser, socket}) {
    // const [avatar, setAvatar] = useState(undefined);
    // const [username, setUsername] = useState(undefined);
    // const [id, setId] = useState(undefined);
    // useEffect(()=>{
    //     (async ()=>{
    //         setAvatar(await JSON.parse(contactAvatar));
    //         setUsername(await JSON.parse(contactUsername));
    //         setId(await JSON.parse(contactId));
    //     })();
    //     return ()=>{};
    // },[contactAvatar, contactUsername, contactId]
    
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
   useEffect(()=>{
      (async()=>{
        if(currentChat){
      const response = await axios.post(getAllMessagesRoute,{
        from: currentUser._id,
        to: currentChat._id,
      
      });

    // console.log(currentChat._id);
    // console.log(currentUser._id);
    //   console.log(response.data);
      setMessages(response.data);
      }
   })();
    
    },[currentChat, currentUser]);
   

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute,{
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        });
        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: currentUser._id,
          message: msg,
        });
        const msgs = [...messages];
        msgs.push({
          fromSelf: true,
          message: msg
        });
        setMessages(msgs);
    };

    useEffect(()=>{
      (async()=>{
        if(socket.current){
          socket.current.on("msg-receive",(msg)=>{
            setArrivalMessage({fromSelf: false, message: msg});
          })
        }
      })();
    },[socket]);

    useEffect(()=>{
      (async()=>{
        arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])
      })();
    },[arrivalMessage]);

    useEffect(()=>{
      (async()=>{
        scrollRef.current?.scrollIntoView ({behaviour: "smooth"});
      })();
    },[messages]);

    return (
        <>
            {currentChat && (
            <Container>
                <div className="chat-header">
                    <div className="user-details">
                        <button className="btn" onClick={()=>{
                            let temp = currentChat;
                            currentChat = undefined;
                            window.location.reload();
                            currentChat = temp;
                        }}>
                            <SlArrowLeft size = "20px" />
                        </button>
                        <div className="avatar">
                            <img src = {`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                            alt = "avatar" />
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout />
                </div>
                <div className = "chat-messages">
                      {
                        messages.map((message) =>{
                          return (
                             <div ref = {scrollRef} key = {uuidv4()}>
                                <div className = {`message ${message.fromSelf ? "sended":"recieved"}`}>
                                  <div className = "content">
                                      <p>
                                        {message.message}
                                      </p>
                                  </div>
                                </div>
                             </div>
                            );
                        })}
                </div>
                <div className = "chat-input">
                <ChatInput handleSendMsg = {handleSendMsg}/>  
                </div>
            </Container>
            )}
        </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1800px) {
    grid-template-rows: 15% 70% 15%;
  }
 
  @media screen and (max-width: 720px) {
    grid-template-rows: 10% 75% 10%;
    height: 100vh;
    background-color: #131324;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .btn{
      display: flex;
      font-size: 0.2rem;
      font-weight: bold;
      
      justify-content: center;
      align-items: center;
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
          shadow: 0 0 1rem white;
          transform: scale(1.3);
      }
      }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto; 
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
        @media screen and (max-width: 720px) {
          max-width: 100%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }

`;