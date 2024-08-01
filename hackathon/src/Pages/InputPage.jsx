import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import api from './Api';
import logoImage from './logo.png';

const GlobalStyle = createGlobalStyle`
    // @font-face {
    //     font-family: 'Ownglyph_meetme-Rg';
    //     src: url('fonts/온글잎\\ 밑미.ttf') format('woff2');
    // }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 20px;
    padding: 0 20px;
    z-index: 1;
    background-color: #FEF69B;
`;

const Logo = styled.img`
    width: 30px;
    height: auto;
    margin-top: 10px;
    margin-left: 10px;
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding-top: 5vh;
    padding-bottom: 12vh;
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
`;

const Heading = styled.h2`
    color: #00D065;
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
    font-size: 25px;
    margin-top: 20px;

    &:hover {
        color: #FF86FF;
    }
`;

const InputPage = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [emotionType, setEmotionType] = useState('ANGRY');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [topEmotion, setTopEmotion] = useState('');

    const details = {
        keyword,
        price,
        date,
        content,
        emotionType
    };

    const emotionImages = {
    'ANGRY': '/angry.png',
    'JOY': '/joy.png',
    'DEPRESSION': '/depression.png',
    'SAD': '/sad.png',
    'PANIC': '/panic.png',
    'ANXIETY': '/anxiety.png',
    'PROUD': '/proud.png',
    'THRILL': '/thrill.png'
    };

    const keywordInput = useRef();
    const priceInput = useRef();
    const dateInput = useRef();
    const contentInput = useRef();

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

    const handleCompletionClick = async () => {
        console.log(details);

        if (details.keyword.length < 1) {
            keywordInput.current.focus();
            return;
        }

        if (details.price.length < 1) {
            priceInput.current.focus();
            return;
        }

        if (details.date.length < 1) {
            dateInput.current.focus();
            return;
        }

        if (details.content.length < 1) {
            contentInput.current.focus();
            return;
        }

        // 수정 API
        try {
            const response = await api.post(`/api/expenses`, details);
            console.log(response.data.message);
            setModalOpen(true);
        } catch (error) {
            console.log('Error updating data', error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleViewClick = () => {
        navigate('/loadingpage');
        closeModal();
    };

    return (
        <>
        <GlobalStyle />
        <Container>
            <AppWrapper>
            <Header>
                <Logo src={logoImage} alt="Logo" />
                {topEmotion && <Emoji src={emotionImages[topEmotion]} alt="Emotion" onClick={() => navigate('/setting')} />}
            </Header>

            <ContentWrapper>
                <Heading>소비 내역을 작성해주세요.</Heading>
                <InputSection>
                <Label>키워드</Label>
                <Input width="60%" placeholder="ex) 떡볶이" value={keyword} onChange={(e) => setKeyword(e.target.value)} ref={keywordInput} />
                </InputSection>

                <InputSection>
                <Label>가격</Label>
                <PriceWrapper>
                    <Input width="50%" placeholder="ex) 21200" value={price} onChange={(e) => setPrice(e.target.value)} ref={priceInput} />
                    <span style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>원</span>
                    </PriceWrapper>
                </InputSection>

                <InputSection>
                <Label>날짜</Label>
                <Input width="50%" type="date" placeholder="날짜 선택" value={date} onChange={(e) => setDate(e.target.value)} ref={dateInput} />
                </InputSection>

                <InputSection>
                <Label>상세 내용</Label>
                <TextArea rows="4" placeholder="ex) 레포트 작성하는데 저장 버튼 아직 안눌렀는데&#13;&#10;갑자기 정전이 나서 꺼진거야...&#13;&#10;화나서 떡볶이 시켜먹었어" value={content} onChange={(e) => setContent(e.target.value)} ref={contentInput} />
                </InputSection>

                <InputSection>
                <Label>감정 선택</Label>
                <Select width="30%" value={emotionType} onChange={(e) => setEmotionType(e.target.value)}>
                    <option value="ANGRY">화남</option>
                    <option value="JOY">기쁨</option>
                    <option value="DEPRESSION">우울</option>
                    <option value="SAD">슬픔</option>
                    <option value="PANIC">당황</option>
                    <option value="ANXIETY">불안</option>
                    <option value="PROUD">뿌듯</option>
                    <option value="THRILL">설렘</option>
                </Select>
                <SelectedEmoji src={emotionImages[emotionType]} alt={emotionType} />
                </InputSection>

                <Button onClick={handleCompletionClick}>작성 완료</Button>
            </ContentWrapper>
            
            <Menu>
                <MenuItem active>
                    <FontAwesomeIcon icon={faPen} style={{ fontSize: '40px' }} />
                    내용입력
                </MenuItem>
                <MenuItem onClick={() => navigate('/home')}>
                    <FontAwesomeIcon icon={faHouse} style={{ fontSize: '40px' }} />
                    홈
                </MenuItem>
                <MenuItem onClick={() => navigate('/viewpage')}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '40px' }} />
                    조회
                </MenuItem>
            </Menu>
        </AppWrapper>
        {modalOpen && (
            <ModalBackdrop>
                <ModalContent>
                <ModalText>작성이 완료되었습니다!</ModalText>
                <ModalButton onClick={handleViewClick}>작성 내용 확인하기</ModalButton>
                </ModalContent>
            </ModalBackdrop>
            )}
        </Container>
    </>
    );
};

export default InputPage;

