import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 10px;
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 10px;
    margin-right: 10px;
`;

const ContentWrapper = styled.div`
    margin-top: 50%;
    width: 80%;
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
    &:hover {font-weight: bold;}
`;

const ResetPassword = styled.button`
    width: 100%;
    padding: 15px;
    border: 1px solid #00D065;
    font-size: 20px;
    cursor: pointer;
    background-color: white;
    &:hover {font-weight: bold;}
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
    &:hover {font-weight: bold;}
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
    color: ${props => (props.active ? '#00D065' : '#B0B0B0')};
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const Setting = () => {

    const navigate = useNavigate();



    return(
        <Container>
            <AppWrapper>
                <Header>
                    <Logo>Logo</Logo>
                    <Emoji src='./angry.png' alt="Emotion" />
                </Header>
                <ContentWrapper>
                    <EditInfo onClick={() => navigate('/edit-info')}>회원 정보 수정</EditInfo>
                    <ResetPassword onClick={() => navigate('/reset-password')}>비밀번호 재설정</ResetPassword>
                    <Logout onClick={() => navigate('/login')}>로그아웃</Logout>
                </ContentWrapper>




                <Menu>
                    <MenuItem onClick={() => navigate('/inputpage')}>
                        <FontAwesomeIcon icon={faPen} style={{ fontSize: '40px' }} />
                        내용입력
                    </MenuItem>
                    <MenuItem active>
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
    )
};

export default Setting;
