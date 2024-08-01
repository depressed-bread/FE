import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { createGlobalStyle } from 'styled-components';
import api from './Api';
import logoImage from './logo.png';

const GlobalStyle = createGlobalStyle`
//   @font-face {
//     font-family: 'Ownglyph_meetme-Rg';
//     src: url('fonts/온글잎\\ 밑미.ttf') format('woff2');
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
    overflow: hidden;
    z-index: 1;
`;

const Overlay = styled.div`
    width: 375px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    overflow: hidden;
    z-index: 2;
    opacity: 0.5;
`;

const ContentWrapper = styled.div`
    margin-top: -30%;
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    overflow: hidden;
    z-index: 3;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 20px;
    padding: 0 20px;
    z-index: 3;
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
    cursor: pointer;
`;

const EditInfo = styled.button`
    width: 100%;
    padding: 15px;
    border: 1px solid #00D065;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    background-color: white;
    font-family: 'Ownglyph_meetme-Rg';
    &:hover {
        font-weight: bold;
    }
`;

const ResetPassword = styled.button`
    width: 100%;
    padding: 15px;
    border: 1px solid #00D065;
    font-size: 20px;
    cursor: pointer;
    background-color: white;
    font-family: 'Ownglyph_meetme-Rg';
    &:hover {
        font-weight: bold;
    }
`;

const Logout = styled.button`
    width: 100%;
    padding: 15px;
    border: 1px solid #00D065;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    background-color: white;
    font-family: 'Ownglyph_meetme-Rg';
    &:hover {
        font-weight: bold;
    }
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
    font-family: 'Ownglyph_meetme-Rg';
`;

const Setting = () => {
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
    }, []);

    const handleLogout = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            await api.post('/logout');
            sessionStorage.removeItem('user');
            console.log(`${user.email} has logged out.`);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('로그아웃 에러:', error);
        }
    };

    const emotionImages = {
        'ANGRY': '/angry.png',
        'JOY': '/joy.png',
        'DEPRESSION': '/depression.png',
        'SAD': '/sad.png',
        'PANIC': '/panic.png',
        'ANXIETY': '/anxiety.png',
        'PROUD': '/proud.png',
        'THRILL': '/thrill.png'
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <ContentWrapper>
                    <EditInfo onClick={() => navigate('/edit-info')}>회원 정보 수정</EditInfo>
                    <ResetPassword onClick={() => navigate('/reset-password')}>비밀번호 재설정</ResetPassword>
                    <Logout onClick={handleLogout}>로그아웃</Logout>
                </ContentWrapper>

                <Overlay>
                    <Header>
                        <Logo src={logoImage} alt="Logo" />
                        {topEmotion && emotionImages[topEmotion] && <Emoji src={emotionImages[topEmotion]} alt="Emotion" onClick={() => navigate(-1)} />}
                    </Header>
                </Overlay>

                <AppWrapper>
                    <Menu>
                        <MenuItem onClick={() => navigate('/inputpage')}>
                            <FontAwesomeIcon icon={faPen} style={{ fontSize: '40px' }} />
                            내용입력
                        </MenuItem>
                        <MenuItem $active>
                            <FontAwesomeIcon icon={faHouse} style={{ fontSize: '40px' }} />
                            홈
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/loadingpage')}>
                            <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '40px' }} />
                            조회
                        </MenuItem>
                    </Menu>
                </AppWrapper>
            </Container>
        </>
    );
};

export default Setting;
