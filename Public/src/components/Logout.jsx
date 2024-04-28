import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { host } from '../utils/APIroutes';
import {BiPowerOff} from "react-icons/bi";


export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async() => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <Button>
            <BiPowerOff onClick = {handleClick} size = "30px" />
        </Button>
    )
}

const Button = styled.button`
  display: flex;
    font-size: 0.5rem;
    justify-content: center;
    align-items: center;
    background: #9c88ff;
    border: none;
    border-radius: 20%;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        background: #7a5cff;
        transform: scale(1.1);
    }
`;