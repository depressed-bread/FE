import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoImage from './logo.png';
import Home from './home.png';
import View from './view.png';
import font from './온글잎밑미.ttf';

const GlobalStyle = createGlobalStyle`
   @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url(${font}) format('truetype');
   }
  body {
    font-family: 'Ownglyph_meetme-Rg';
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #FEFEFE;
    overflow: hidden;
`;

const AppWrapper = styled.div`
    width: 375px;
    max-width: 375px;
    min-height: 100vh;
    background-color: #FEF69B; 
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // box-sizing: border-box;
`;

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
    flex: 1; 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin: 0 10px;
`;

const StyledImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const Arrow = styled.div`
    cursor: pointer;
    font-size: 35px; 
    margin: 0 20px;
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
    margin-top: auto;
    font-family: 'Ownglyph_meetme-Rg';
    margin-bottom: 10%;
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
