import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import logoImage from './logo.png';

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

const FindIdButton = styled.button`
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

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const FindId = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [foundId, setFoundId] = useState('');
    const [error, setError] = useState('');

    const handleFindIdClick = async () => {
        setError('');
        try {
            const response = await api.post('/api/user/find-id', {
                name: userName,
                phone: phoneNumber
            });

            if (response.data.email) {
                setFoundId(response.data.email); // API에서 가져온 이메일 설정
            } else {
                setError('사용자가 존재하지 않습니다.');
            }
        } catch (error) {
            console.error('API 호출 중 오류가 발생했습니다.', error);
            setError('사용자가 존재하지 않습니다.');
        }
        setModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleActionButtonClick = () => {
        if (foundId) {
            navigate('/login');
        } else {
            navigate('/signup');
        }
        closeModal();
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Logo src={logoImage} alt="Logo" />
                    <Input
                        type="text"
                        placeholder="이름"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="전화번호"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <FindIdButton onClick={handleFindIdClick}>아이디 찾기</FindIdButton>

                    {modalOpen && (
                        <ModalBackdrop>
                            <ModalContent>
                                {foundId ? (
                                    <>
                                        <ModalText>{userName}님의 이메일은</ModalText>
                                        <ModalText>{foundId}</ModalText>
                                        <ModalButton onClick={handleActionButtonClick}>로그인하기</ModalButton>
                                    </>
                                ) : (
                                    <>
                                        <ModalText>이메일이 존재하지 않습니다.</ModalText>
                                        <ErrorMessage>{error}</ErrorMessage>
                                        <ModalButton onClick={handleActionButtonClick}>회원가입하기</ModalButton>
                                    </>
                                )}
                            </ModalContent>
                        </ModalBackdrop>
                    )}
                </AppWrapper>
            </Container>
        </>
    );
};

export default FindId;
