import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';

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
    max-width: 375px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    padding: 10px 20px;
    z-index: 1;
    background-color: #FEF69B;
`;


const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding-top: 5vh;
    padding-bottom: 10vh;
`;

const InputSection = styled.div`
    width: 100%;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Label = styled.div`
    font-size: 17px;
    margin-bottom: 5px;
    font-weight: bold;
    color:#00D065;
`;

const LabelWrapper=styled.div`
    background-color: white;
    border-radius: 10px;
    border: 2px solid #00D065;
    padding: 6px;
    margin: 2px 0;
    width: 25%;
    display: flex;
    justify-content:center;
    align-items:center;
`;
const LabelWrapper2=styled.div`
    width: 100%;
    overflow-y: auto;
    padding-top: 5px;
    padding-bottom: 5px;

`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #FFD8E1;
    border: none;
    border-radius: 50px;
    font-size: 18px;
    color: black;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        color: #FF86FF;
    }
`;

const SelectedEmoji = styled.img`
    width: 90px;
    height: 90px;
    margin: 20px 0;

`;

const EmojiWrapper=styled.div`

    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
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
    max-width: 300px;
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
    font-size: 20px;
    margin-top: 20px;

    &:hover {
        color: #FF86FF;
    }
`;

const BackButton = styled.button`
    border: none;
    cursor: pointer;
    font-size: 15px;
    background-color: #FEF69B;

`;

const ExpenseItem = styled.div`
    background-color: white;
    border-radius: 10px;
    border: 2px solid #00D065;
    padding: 20px;
    margin: 10px 0;
    width: 85%;
    display: flex;
    align-items: center;
`;

const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    flex-grow: 1;
    font-size: 20px;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;

`;
  const arrowStyle = {
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid black',
    margin: '10px'
  };


const DetailPage = () => {
    const navigate = useNavigate();
    const [emotion] = useState('화남');
    const [modalOpen, setModalOpen] = useState(false);

    const emotionImages = {
        '화남': '/angry.png',
        '기쁨': '/happy.png',
        '무표정': '/emotionless.png',
        '우울': '/gloomy.png',
        '슬픔': '/sad.png',
        '스트레스': '/stress.png',
        '당황': '/embarrased.png',
        '설렘': '/excited.png'
    };

    const handleCompletionClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleViewClick = () => {
        navigate('/viewpage');
        closeModal();
    };

    return (
        <Container>
            <AppWrapper>
                <Header>
                    <Logo>Logo</Logo>
                    <Emoji src='./angry.png' alt="Emotion" />

                </Header>
                <ContentWrapper>
                    <br></br>
                    <BackButton onClick={()=> navigate(-1)}><div style={arrowStyle}></div></BackButton>

                    <EmojiWrapper><SelectedEmoji src={emotionImages[emotion]} alt={emotion} /></EmojiWrapper>          

                    <InputSection>

                        <ExpenseItem>
                            <LabelWrapper2>
                            <div><LabelWrapper><Label>키워드</Label></LabelWrapper></div>
                            
                            <br></br> 
                            <div><LabelWrapper><Label>가격</Label></LabelWrapper></div>
                            <br></br>
                            <LabelWrapper><Label>날짜</Label></LabelWrapper>                                                      
                            <ItemDetails>
                                <div>
                   
                                </div>
                            </ItemDetails>
                            </LabelWrapper2>
                        </ExpenseItem>
                    </InputSection>
                    <InputSection>

                        <ExpenseItem>
                            <LabelWrapper><Label>상세 내용</Label></LabelWrapper>
                            
                            <ItemDetails>
                                <div>
                   
                                </div>
                            </ItemDetails>
                        </ExpenseItem>                

                    </InputSection>


                    <Button onClick={()=>navigate("/editdetail")}>수정하기</Button>
                    <Button onClick={handleCompletionClick}>삭제하기</Button>
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
                    <MenuItem active>
                        <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '40px' }} />
                        조회
                    </MenuItem>
                </Menu>
            </AppWrapper>

            {modalOpen && (
                <ModalBackdrop>
                    <ModalContent>
                        <ModalText>내역이 삭제되었습니다!</ModalText>
                        <ModalButton onClick={handleViewClick}>조회 화면으로 돌아가기</ModalButton>
                    </ModalContent>
                </ModalBackdrop>
            )}
        </Container>
    );
};

export default DetailPage;