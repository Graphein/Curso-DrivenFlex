import React from 'react';
import styled from 'styled-components';
import { FaFilm } from 'react-icons/fa';

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    background-color: #EE897F;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    color: #FFFFFF;
    font-size: 28px;
    font-weight: bold;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

function Header() {
    return (
        <HeaderContainer>
            <Logo>
                <FaFilm size={32} />
                Cineflex
            </Logo>
        </HeaderContainer>
    );
}

export default Header;
