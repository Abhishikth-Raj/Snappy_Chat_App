import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import Logout from './Logout';

function Contacts({contacts,currentUser, changeChat }) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);    
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect (()=> {(async ()=>{
        // console.log(contacts);
        if(currentUser){
            setCurrentUsername(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    })();
        return () => {};
    },[currentUser]);

    const changeCurrentChat = (index, contact) =>{
        setCurrentSelected(index);
        changeChat(contact);
    }

     //console.log(currentUserImage,currentUsername);
    return (
       <>   
            {currentUserImage && currentUsername && (
                <Container>
                    <div className='brand'>
                        <img width = "50rem" src={Logo} alt='logo' />
                        <h1>Snappy</h1>
                    </div>
                    <div className='contacts'>
                        {
                            contacts.map((contact,index)=>{
                                return (
                                    <div key = {index} className={`contact ${index === currentSelected ? "selected" : ""}`}
                                    onClick = {()=>changeCurrentChat(index,contact)}
                                    >
                                        <div className = "avatar">
                                            <img src = {`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                            alt = "avatar" 
                                            />
                                        </div>
                                        <div className='username'>
                                            <h3>{contact.username}</h3>    
                                        </div>
                                    </div>
                                );
                        })}
                    </div>
                    <div className='current-user'>
                        <div className = "avatar">
                            <img 
                             src = {`data:image/svg+xml;base64,${currentUserImage}`}
                                alt = "avatar"
                             />
                             </div>
                            <div className = 'username'>
                                <h2>{currentUsername}</h2>

                                <Logout/>
                            </div>
                        
                    </div>
                </Container>
            )}
       </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  border-radius: 1rem;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: left;
    border-radius: 1rem;
    color: white;
    img {
      height: 2rem;
      ${'' /* aligh-self: left; */}
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 3rem;
      }
    }
    .contact{
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1.5rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.35s ease-in-out;
      &:hover {
        transform: scale(1.05); 
        }
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {

    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    .avatar {
      img {
        height: 5rem;
        max-inline-size: 100%;
        padding: 0.2rem;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 2rem;
        }
      }
    }
    @media screen and (max-width: 720px) {
      height: 100vh;
      width: 100vw;
      .username{
        h2{
          font-size: 1.5rem;
        }
      }
      .avatar {
        img {
          height: 2rem;
          max-inline-size: 100%;
          padding: 0.2rem;
        }
      }
    }
   
  }
 
   
`;


export default Contacts;