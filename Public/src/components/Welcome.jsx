import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

export default function Welcome({currentUser}) {
const [username, setUserName] = useState('');

useEffect (()=>{
    (async ()=>{
       setUserName(await JSON.parse(localStorage.getItem('chat-app-user')).username);
    })()
},[])
    return (
        <Container>
            
                <h1>Welcome, <span>{username}</span>!</h1>
                <img src={Robot} alt='Robot' />
                <h3>Select someone to chat with...</h3>

        </Container>
    );
}

const Container = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
