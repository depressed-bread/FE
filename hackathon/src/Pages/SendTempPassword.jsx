import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import logoImage from './logo.png';
import font from './온글잎밑미.ttf';
import BackImage from './back.png';

const GlobalStyle = createGlobalStyle`
   @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url(${font}) format('truetype');
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
`;

const Logo = styled.img`
    width: 100px;
    margin-top: 50%;
    margin-bottom: 20%;
`;

const Input = styled.input`
    width: 80%;
    padding: 15px;
    margin-bottom: 5%;
    border: 1px solid #00D065;
    border-radius: 5px;
    font-size: 20px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 1%;
    text-align: center;
    width: 80%;
`;

const SendTempPasswordButton = styled.button`
    background-color: #FFD8E1;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 35px;
    width: 90%;
    margin-bottom: 20px;
    font-family: 'Ownglyph_meetme-Rg';
    &:hover {
        color: #FF86FF;
    }
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #FEFEFE;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 80%;
    max-width: 300px; /* 모달의 최대 너비 설정 */
    font-family: 'Ownglyph_meetme-Rg';
`;

const ModalText = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ModalButton = styled.button`
    background-color: #FFD8E1;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 25px;
    margin-top: 20px;
    font-family: 'Ownglyph_meetme-Rg';
    &:hover {
        color: #FF86FF;
    }
`;

const BackButton = styled.button`
    border: none;
    cursor: pointer;
    font-size: 15px;
    background-color: #FEF69B;
    font-family: 'Ownglyph_meetme-Rg';
    position: absolute;
    top: 40px;
    left: 20px;
`;

const SendTempPassword = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [tempPasswordSent, setTempPasswordSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendTempPasswordClick = async () => {
        if (!email) {
            setErrorMessage('이메일을 입력해주세요.');
            return;
        } else {
            setErrorMessage('');
        }

        try {
            const response = await api.post('/api/user/send-temp-password', { email });
            if (response.status === 200) {
                setTempPasswordSent(true);
            } else {
                setTempPasswordSent(false);
            }
            setModalOpen(true);
        } catch (error) {
            console.error('Failed to send temporary password:', error);
            setTempPasswordSent(false);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setTempPasswordSent(false);
        setEmail('');
    };

    const handleLoginButtonClick = () => {
        navigate('/login');
        closeModal();
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Logo src={logoImage} alt="Logo" />

                    <BackButton onClick={() => navigate(-1)}><img src={BackImage} alt="Back" style={{width:'30px',height:'40px'}}/></BackButton>

                    <Input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <SendTempPasswordButton onClick={handleSendTempPasswordClick}>임시 비밀번호 전송</SendTempPasswordButton>
                    {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                    {modalOpen && (
                        <ModalBackdrop>
                            <ModalContent>
                                {tempPasswordSent ? (
                                    <>
                                        <ModalText>임시 비밀번호가 전송되었습니다.</ModalText>
                                        <ModalButton onClick={handleLoginButtonClick}>로그인하기</ModalButton>
                                    </>
                                ) : (
                                    <ModalText>임시 비밀번호 전송에 실패했습니다.</ModalText>
                                )}
                            </ModalContent>
                        </ModalBackdrop>
                    )}
                </AppWrapper>
            </Container>
        </>
    );
};

export default SendTempPassword;
