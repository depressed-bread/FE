import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


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
    font-size: 50px;
    font-weight: bold;
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
    margin-bottom: 20px;

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
`;

const ModalText = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
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
    &:hover {
        color: #FF86FF;
    }
`;



const EditInfo = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    
        const handleEditClick = () => {
            setModalOpen(true);
        };
    
        const closeModal = () => {
            setModalOpen(false);
        };

        const handleHomeClick = () => {
            navigate('/home');
            closeModal();
        }


    return (
        <Container>
            <AppWrapper>
                <Logo>Logo</Logo>
                <Input type="text" placeholder="이름" />
                <Input type="tel" placeholder="전화번호" />
                <EditButton onClick={handleEditClick}>수정하기</EditButton>
            </AppWrapper>

            {modalOpen && (
                <ModalBackdrop>
                    <ModalContent>
                        <ModalText>회원 정보 수정이 완료되었습니다!</ModalText>
                        <ModalButton onClick={handleHomeClick}>홈으로 가기</ModalButton>
                    </ModalContent>
                </ModalBackdrop>
            )}
        </Container>
    )}


export default EditInfo;