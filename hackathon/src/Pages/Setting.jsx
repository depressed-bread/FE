import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { createGlobalStyle } from 'styled-components';
import api from './Api';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('fonts/온글잎\\ 밑미.ttf') format('woff2');
  }
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
    margin-top: -20%;
    width: 15%;
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

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 10px;
    color: black;
    font-family: 'Ownglyph_meetme-Rg';
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

    const handleLogout = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            await api.post('/logout');
            sessionStorage.removeItem('user');
            console.log(`로그아웃 성공`);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('로그아웃 에러:', error);
        }
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
                        <Logo>Logo</Logo>
                        <Emoji src='./angry.png' alt="Emotion" onClick={() => navigate(-1)} />
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
