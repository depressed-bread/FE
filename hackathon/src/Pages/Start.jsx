import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoImage from './logo.png';
import Home from './home.png';
import View from './view.png';

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
    margin: 20px 0;
    font-size: 30px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-top: 10%;
`;

const ImageContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 10%;
`;

const StyledImage = styled.img`
    width: 100%;
    margin-top: 10%;
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

const DotStyles = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== '$isActive',
})`
    margin: 0 10px;
    cursor: pointer;
    font-size: 30px;
    color: ${({ $isActive }) => ($isActive ? '#00D065' : 'white')};
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

const slides = [logoImage, Home, View];

const Start = ({ Slides }) => {
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
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    {/* <Header>
                        <Logo src={logoImage} alt="Logo" />
                    </Header> */}

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
                                <DotStyles key={slideIndex} $isActive={slideIndex === currentIndex} onClick={() => goToSlide(slideIndex)}>&#9679;</DotStyles>
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
