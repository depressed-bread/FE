import React, { useState, useEffect } from 'react';
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
    font-family: 'Ownglyph_meetme-Rg';
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

const EditInfo = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get('/api/user/info');
                setName(response.data.name || '');
                setPhone(response.data.phone || '');
                setEmail(response.data.email || '');
            } catch (error) {
                console.error('사용자 정보를 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleEditClick = async () => {
        try {
            const response = await api.put('/api/user/info', {
                name,
                phone,
                email
            });

            console.log(response.data.message); // 정보 업데이트 성공 메시지 출력
            setModalOpen(true); // 모달 열기

            // 3초 후 홈으로 이동
            setTimeout(() => {
                navigate('/home');
                closeModal();
            }, 3000);

        } catch (error) {
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
                    <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="tel" placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <EditButton onClick={handleEditClick}>수정하기</EditButton>
                </AppWrapper>

                {modalOpen && (
                    <ModalBackdrop>
                        <ModalContent>
                            <ModalText>회원 정보 수정이 완료되었습니다!</ModalText>
                        </ModalContent>
                    </ModalBackdrop>
                )}
            </Container>
        </>
    );
};

export default EditInfo;
