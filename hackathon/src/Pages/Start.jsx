import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoImage from './logo.png';
import Home from './home.png';
import View from './view.png';

const GlobalStyle = createGlobalStyle`
//   @font-face {
//     font-family: 'Ownglyph_meetme-Rg';
//     src: url('/fonts/온글잎\\ 밑미.ttf') format('woff2');
//   }
  body {
    font-family: 'Ownglyph_meetme-Rg';
  }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #FEFEFE;
`;

const AppWrapper = styled.div`
    width: 375px;
    height: 100vh;
    background-color: #FEF69B; 
    padding: 20px;
    display: flex; 
    flex-direction: column;
    align-items: center;
    position: relative;
`;

// const Header = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
// `;

// const Logo = styled.img`
//     width: 30px;
//     height: auto;
//     margin-top: 10px;
// `;

const Title = styled.div`
    font-size: 25px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin: 10% 0 0.2% 0;
    height: 10vh;
`;

const ImageContainer = styled.div`
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
    
`;

const StyledImage = styled.img`
    width: 100%;
    margin-top: 30%;
    object-fit: cover;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
`;

const Arrow = styled.div`
    cursor: pointer;
    font-size: 35px; 
    margin: 0 50px;
    color: #00D065;
`;

const StartButton = styled.button`
    background-color: #FFD8E1;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 35px;
    width: 60%;
    margin-top: 60px;
    font-family: 'Ownglyph_meetme-Rg';
    
`;

const slides = [logoImage, Home, View];

const Start = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/login');
    };

    const Titles = ["우울해서 빵 샀어", "한 눈에 볼 수 있는 소비 달력", "감정별로 볼 수 있는 소비 내역"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Title>
                        {Titles[currentIndex]}
                    </Title>
                    <ImageContainer>
                        <Arrow onClick={goToPrevious}>&lt;</Arrow>
                        <StyledImage src={slides[currentIndex]} alt={`slide ${currentIndex}`} />
                        <Arrow onClick={goToNext}>&gt;</Arrow>
                    </ImageContainer>
                    <StartButton onClick={handleStartClick}>시작하기</StartButton>
                </AppWrapper>
            </Container>
        </>
    );
};

export default Start;
