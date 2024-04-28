import React from 'react';
import styled from 'styled-components';

export default function Messages({messages, currentUser}) {
    return (
        <Container>
            <h1>ChatMessages</h1>
        </Container>
    )
}

const Container = styled.div`
    height: 80%;
`;