import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import api from './Api';
import logoImage from './logo.png';
import font from './온글잎밑미.ttf';

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
    width: 150px;
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

const EditButton = styled.button`
    background-color: #FFD8E1;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 35px;
    width: 90%;
    margin-top: 20px;
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
    border: 1px solid #00D065;
    border-radius: 5px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ModalText = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ResetPassword = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');  // 이메일 상태 추가
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEditClick = async () => {
        try {
            const response = await api.post('/api/user/reset-password', {
                email,
                currentPassword,
                newPassword
            });

            if (response.data.message === "비밀번호가 성공적으로 변경되었습니다.") {
                // API 호출 성공시, 모달 열기
                setModalOpen(true);

                // 3초 후 홈으로 이동
                setTimeout(() => {
                    navigate('/home');
                    closeModal();
                }, 3000);
            } else {
                // 실패 메시지 처리
                console.error('비밀번호 변경 실패:', response.data.message);
            }
        } catch (error) {
            // API 호출 실패
            console.error('수정에러', error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Logo src={logoImage} alt="Logo" />

                    <Input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="현재 비밀번호"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="새 비밀번호"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <EditButton onClick={handleEditClick}>비밀번호 재설정</EditButton>
                </AppWrapper>

                {modalOpen && (
                    <ModalBackdrop>
                        <ModalContent>
                            <ModalText>비밀번호 재설정이 완료되었습니다!</ModalText>
                        </ModalContent>
                    </ModalBackdrop>
                )}
            </Container>
        </>
    );
};

export default ResetPassword;
