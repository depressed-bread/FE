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
    border: 1px solid #00D065;
    border-radius: 5px;
`;

const ModalText = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
`;


const ResetPassword = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleEditClick = async () => {
        try {
            // api 호출
            // 예시 콘솔
            console.log('수정완료');
            
            // API 호출 성공시, 모달 열기
            setModalOpen(true);

            // 3초 후 홈으로 이동
            setTimeout(() => {
                navigate('/home');
                closeModal();
            }, 3000);

        } catch (error) {
            // API 호출 실패
            console.error('수정에러', error);
        }
    };
    

        const closeModal = () => {
            setModalOpen(false);
        };


    return (
        <Container>
            <AppWrapper>
                <Logo>Logo</Logo>
                <Input type="password" placeholder="비밀번호" />
                <Input type="password" placeholder="비밀번호 재입력" />
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
    )}


export default ResetPassword;