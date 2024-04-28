import React,{useState, useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {allUsersRoute, host} from "../utils/APIroutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";
//import { use } from "../../../server/routes/userRoutes";
function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(()=>{
        const hanldeResize = () =>{
            setIsMobileView(window.innerWidth <= 719);
        };
        hanldeResize();
        window.addEventListener("resize", hanldeResize);
        return ()=> window.removeEventListener("resize", hanldeResize);
    },[]);
    
    useEffect(()=>{
        if(currentUser){
            
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    },[currentUser]);
    useEffect(
        ()=>{(
        async ()=>{
            if(!localStorage.getItem("chat-app-user")){
                alert("Please login to continue");
                navigate("/login");
            }else{

                setCurrentUser( await JSON.parse(localStorage.getItem("chat-app-user")))
                setIsLoaded(true);
            }
        }
        )();
            return ()=>{};
    },[navigate])
    useEffect(
        ()=>{ (async ()=>{
                if(currentUser){
                    if(currentUser.isAvatarImageSet){
                        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        setContacts(data.data);
                    }else{
                        navigate("/setAvatar");
                    }
                }
        })();
            return ()=>{};
        }
    ,[currentUser, navigate])
     
    const handleChatChange  = (chat) => {
        setCurrentChat(chat);
    }
    return (
        <>
            {isLoaded &&(
                isMobileView?(
                    currentChat === undefined ? (
                    <Container>
                        <Contacts
                            contacts = {contacts} 
                            currentUser = {currentUser} 
                            changeChat = {handleChatChange}
                            className = "contacts"
                        />
                    </Container>
                    ):(
                        <ChatContainer 
                        className = "container" 
                        currentChat = {currentChat} 
                        currentUser = {currentUser}
                        socket = {socket}
                        />
                    )
                   
                ):(
                    <Container>
                    <div className = "container">  
                        <Contacts 
                            contacts = {contacts} 
                            currentUser = {currentUser} 
                            changeChat = {handleChatChange}
                            className = "contacts"
                        />
                        {
                            isLoaded && currentChat === undefined ? (
                                <Welcome className = "chat-container" currentUser = {currentUser} />
                             ):(<ChatContainer className = "container" currentChat = {currentChat} currentUser = {currentUser} socket = {socket} />  
                )}

                    </div>
                </Container>)
            )}
        </>
       
    );

}

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;
    .container{
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display : grid;
        border-radius: 1rem;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 35% 65%;
        }/* this is for tablets */
        @media screen and (max-width: 720px) {
            grid-template-columns: 100%;
        }/* t{
        }his is for mobile devices */
    }

`;

export default Chat;
