import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import api from './Api'; // Import the api instance

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
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: bold;
    font-family: 'Ownglyph_meetme-Rg';
`;

const Input = styled.input`
    width: ${props => props.width || '100%'};
    padding: 10px;
    border: 1px solid #B0B0B0;
    border-radius: 5px;
    border: 1px solid #00D065;
    font-size: 16px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const PriceWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const TextArea = styled.textarea`
    width: 90%;
    padding: 10px;
    border: 1px solid #00D065;
    border-radius: 5px;
    font-size: 12px;
    resize: vertical;
    font-family: 'Ownglyph_meetme-Rg';
`;

const Select = styled.select`
    width: ${props => props.width || '100%'};
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    border: 1px solid #00D065;
    font-family: 'Ownglyph_meetme-Rg';
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
    font-family: 'Ownglyph_meetme-Rg';

    &:hover {
        color: #FF86FF;
    }
`;

const SelectedEmoji = styled.img`
    width: 60px;
    height: 60px;
    margin: 20px 0;
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
    font-family: 'Ownglyph_meetme-Rg';
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
    font-size: 20px;
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
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const arrowStyle = {
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid black',
    margin: '10px'
};

const EditDetail = () => {
    const navigate = useNavigate();
    const [emotion, setEmotion] = useState('화남');
    const [modalOpen, setModalOpen] = useState(false);
    const [topEmotion, setTopEmotion] = useState('');

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

    useEffect(() => {
        const fetchTopEmotion = async () => {
            try {
                const response = await api.get('/api/user/emotion');
                setTopEmotion(response.data.emotion);
            } catch (error) {
                console.error('Error fetching top emotion:', error);
            }
        };

        fetchTopEmotion();
    }, []);

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
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Header>
                        <Logo>Logo</Logo>
                        {topEmotion && <Emoji src={emotionImages[topEmotion]} alt="Emotion" />}
                    </Header>
                    <ContentWrapper>
                        <BackButton onClick={() => navigate(-1)}><div style={arrowStyle}></div></BackButton>
                        <InputSection>
                            <Label>키워드</Label>
                            <Input width="60%" placeholder="떡볶이" />
                        </InputSection>
                        <InputSection>
                            <Label>가격</Label>
                            <PriceWrapper>
                                <Input width="50%" placeholder="21200" />
                                <span style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>원</span>
                            </PriceWrapper>
                        </InputSection>
                        <InputSection>
                            <Label>날짜</Label>
                            <Input width="50%" type="date" placeholder="날짜 선택" />
                        </InputSection>
                        <InputSection>
                            <Label>상세 내용</Label>
                            <TextArea rows="4" placeholder="레포트 작성하는데 저장 버튼 아직 안눌렀는데&#13;&#10;갑자기 정전이 나서 꺼진거야...&#13;&#10;화나서 떡볶이 시켜먹었어" />
                        </InputSection>
                        <InputSection>
                            <Label>감정 선택</Label>
                            <Select width="30%" value={emotion} onChange={(e) => setEmotion(e.target.value)}>
                                <option value="화남">화남</option>
                                <option value="기쁨">기쁨</option>
                                <option value="무표정">무표정</option>
                                <option value="우울">우울</option>
                                <option value="슬픔">슬픔</option>
                                <option value="스트레스">스트레스</option>
                                <option value="당황">당황</option>
                                <option value="설렘">설렘</option>
                            </Select>
                            <SelectedEmoji src={emotionImages[emotion]} alt={emotion} />
                        </InputSection>
                        <Button onClick={handleCompletionClick}>수정완료</Button>
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
                            <ModalText>수정이 완료되었습니다!</ModalText>
                            <ModalButton onClick={handleViewClick}>조회 화면으로 이동하기</ModalButton>
                        </ModalContent>
                    </ModalBackdrop>
                )}
            </Container>
        </>
    );
};

export default EditDetail;
