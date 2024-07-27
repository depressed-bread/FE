import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import image01 from "./image01.png";
import image02 from "./image02.png";
import image03 from "./image03.png";

const GlobalStyle = createGlobalStyle`
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

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    top: 20px;
    left: 20px;
`;

const Title = styled.div`
    margin: 20px 0;
    font-size: 18px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 15%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 23%;
`;

const Arrow = styled.div`
    cursor: pointer;
    font-size: 35px;
    margin: 0 30px;
    color: #00D065;
`;

const DotsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const DotStyles = styled.div`
    margin: 0 10px;
    cursor: pointer;
    font-size: 30px;
    color: ${({ isActive }) => (isActive ? '#00D065' : 'white')};
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
    margin-bottom: 20%;
    font-family: 'Ownglyph_meetme-Rg';
`;

const slides = [image01, image02, image03];

const Start = ({ Slides }) => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/login');
    };

    const handleLogoClick = () => {
        navigate('/home');
    };

    const Titles = ["감정 기반 지출 관리 서비스", "한 눈에 볼 수 있는 소비 달력", "감정별로 볼 수 있는 소비 내역"]
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex);
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex);
    }
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Logo onClick={handleLogoClick}>Logo</Logo>

                    <Title>
                        {Titles[currentIndex]}
                    </Title>

                    <ImageContainer>
                        <StyledImage src={slides[currentIndex]} alt={`slide ${currentIndex}`} />
                    </ImageContainer>

                    <Controls>
                        <Arrow onClick={goToPrevious}>&lt;</Arrow>
                        <DotsContainer>
                            {slides.map((slide, slideIndex) => (
                                <DotStyles key={slideIndex} isActive={slideIndex === currentIndex} onClick={() => goToSlide(slideIndex)}>&#9679;</DotStyles>
                            ))}
                        </DotsContainer>
                        <Arrow onClick={goToNext}>&gt;</Arrow>
                    </Controls>

                    <StartButton onClick={handleStartClick}>시작하기</StartButton>
                </AppWrapper>
            </Container>
        </>
    );
};

export default Start;
