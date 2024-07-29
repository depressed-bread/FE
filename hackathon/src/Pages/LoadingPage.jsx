import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import logoImage from './logo.png';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('/fonts/온글잎\\ 밑미.ttf') format('truetype');
  }
  body {
    font-family: 'Ownglyph_meetme-Rg', sans-serif;
  }
`;

const emojis = {
    'ANGRY': '/angry.png',
    'JOY': '/joy.png',
    'DEPRESSION': '/depression.png',
    'SAD': '/sad.png',
    'PANIC': '/panic.png',
    'ANXIETY': '/anxiety.png',
    'PROUD': '/proud.png',
    'THRILL': '/thrill.png'
};

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #FEFEFE;
    position: relative;
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
    overflow: hidden;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 20px;
    padding: 0 20px;
    z-index: 1;
    background-color: #FEF69B;
`;

const Logo = styled.img`
  width: 30px;
  height: auto;
  margin-top: 10px;
  margin-left: 10px;
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 10px;
    margin-right: 10px;
`;

const EmojiWrapper = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    animation: ${rotate} 4s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RotatingEmoji = styled.img`
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(${props => props.$angle}deg) translateY(-120px);
`;

const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Menu = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    position: absolute;
    bottom: 0;
    background-color: #FEF69B;
    z-index: 1;
    margin-bottom: 3%;
`;

const MenuItem = styled.div`
    cursor: pointer;
    font-size: 16px;
    color: ${props => (props.$active ? '#00D065' : '#B0B0B0')};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoadingPage = () => {
    const navigate = useNavigate();
    const [topEmotion, setTopEmotion] = useState('');

    useEffect(() => {
        const fetchTopEmotion = async () => {
            try {
                const response = await api.get('/api/user/emotion');
                const emotion = response.data.emotion;
                setTopEmotion(emotion);
            } catch (error) {
                console.error('Error fetching top emotion:', error);
            }
        };

        fetchTopEmotion();

        const timer = setTimeout(() => {
            navigate('/viewpage');
        }, 5000); // 5초 후에 viewpage로 이동

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container>
            <GlobalStyle />
            <AppWrapper>
                <Header>
                    <Logo src={logoImage} alt="Logo" />
                    {topEmotion && <Emoji src={emojis[topEmotion]} alt="Emotion" />}
                </Header>
                <ContentWrapper>
                    <EmojiWrapper>
                        {Object.keys(emojis).map((emotion, index) => {
                            const angle = (index / 8) * 360;
                            return <RotatingEmoji key={emotion} src={emojis[emotion]} $angle={angle} alt={emotion} />;
                        })}
                    </EmojiWrapper>
                </ContentWrapper>
                <Menu>
                    <MenuItem onClick={() => navigate('/inputpage')}>
                        <FontAwesomeIcon icon={faPen} style={{ fontSize: '40px' }} />
                        내용입력
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/home')}>
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '40px' }} />
                        홈
                    </MenuItem>
                    <MenuItem $active>
                        <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '40px' }} />
                        조회
                    </MenuItem>
                </Menu>
            </AppWrapper>
        </Container>
    );
};

export default LoadingPage;
