import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('fonts/온글잎\ 밑미.ttf') format('woff2');
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

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;
`;

const Dropdown = styled.select`
    margin: 20px 0;
    padding: 10px;
    font-size: 16px;
    width: 60%;
    border: 2px solid #00D065;
    border-radius: 5px;
    background-color: white;
    appearance: none;
    box-sizing: border-box;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #FFCCE7;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-family: 'Ownglyph_meetme-Rg';

    &:hover {
        color: #FF86FF;
    }
`;

const Title = styled.h2`
    margin-top: 20px;
    font-size: 24px;
    font-family: 'Ownglyph_meetme-Rg';

    span {
        color: #00D065;
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding-top: 60px;
    padding-bottom: auto;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ExpenseItem = styled.div`
    background-color: white;
    border-radius: 10px;
    border: 2px solid #00D065;
    padding: 10px;
    margin: 10px 0;
    width: 90%;
    display: flex;
    align-items: center;
    position: relative;
    font-family: 'Ownglyph_meetme-Rg';
`;

const EmojiIcon = styled.img`
    width: 60px;
    height: 60px;
`;

const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    flex-grow: 1;
    font-size: 20px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const MoreButton = styled.button`
    background-color: transparent;
    border: none;
    color: #B0B0B0;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 5px;
    text-align: left;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ExpenseSummary = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    font-family: 'Ownglyph_meetme-Rg';
`;

const Price = styled.span`
    color: #00D065;
    margin-right: 5px;
`;

const Unit = styled.span`
    color: black;
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

const ViewPage = () => {
    const navigate = useNavigate();
    const [emotion, setEmotion] = useState('전체');
    const [period, setPeriod] = useState('오늘');
    const [consumptions, setConsumptions] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            // 예시 데이터
            const data = {
                '7월 14일': {
                    '전체': [
                        { item: '떡볶이', price: '21200원', emoji: './angry.png' },
                        { item: '노래방', price: '6000원', emoji: './happy.png' }
                    ],
                    '화남': [
                        { item: '떡볶이', price: '21200원', emoji: './angry.png' }
                    ],
                    '기쁨': [
                        { item: '노래방', price: '6000원', emoji: './happy.png' }
                    ]
                },
                '7월 13일': {
                    '전체': [
                        { item: '커피', price: '4000원', emoji: './angry.png' },
                        { item: '불닭볶음면', price: '1700원', emoji: './embarrased.png' }
                    ],
                    '화남': [
                        { item: '커피', price: '4000원', emoji: './angry.png' }
                    ],
                    '당황': [
                        { item: '불닭볶음면', price: '1700원', emoji: './embarrased.png' }
                    ]
                },
                '7월 12일': {
                    '전체': [
                        { item: '커피', price: '4000원', emoji: './angry.png' },
                        { item: '휴지', price: '1000원', emoji: './anxiety.png' },
                        { item: '인형', price: '10000원', emoji: './excited.png' }
                    ],
                    '화남': [
                        { item: '커피', price: '4000원', emoji: './angry.png' }
                    ],
                    '불안': [
                        { item: '휴지', price: '1000원', emoji: './anxiety.png' }
                    ],
                    '설렘': [
                        { item: '인형', price: '10000원', emoji: './excited.png' }
                    ]
                },
            };
            setConsumptions(data);
        };

        fetchData();
    }, [emotion, period]);

    const handleEmotionChange = (e) => {
        setEmotion(e.target.value);
    };

    const handlePeriodChange = (period) => {
        setPeriod(period);
    };

    const renderConsumptions = () => {
        const today = '7월 14일';
        const days = [today, '7월 13일', '7월 12일', '7월 11일', '7월 10일', '7월 9일', '7월 8일'];
        const displayDays = period === '오늘' ? [today] : (period === '7일' ? days.slice(0, 7) : []);
        return displayDays.map(day => (
            <div key={day} style={{ width: '100%' }}>
                <Title><span>{day}</span> 소비 내역</Title>
                {consumptions[day] && consumptions[day][emotion] && consumptions[day][emotion].length > 0 ? (
                    consumptions[day][emotion].map((consumption, index) => (
                        <ExpenseItem key={index}>
                            <EmojiIcon src={consumption.emoji} alt="Emotion" />
                            <ItemDetails>
                                <div>{consumption.item}</div>
                                <MoreButton onClick={() => navigate('/detail')}>상세보기</MoreButton>
                            </ItemDetails>
                            <ExpenseSummary>
                                <Price>{consumption.price.replace(/[^\d]/g, '')}</Price>
                                <Unit>원</Unit>
                            </ExpenseSummary>
                        </ExpenseItem>
                    ))
                ) : (
                    <div>소비 내역이 없습니다.</div>
                )}
            </div>
        ));
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Header>
                        <Logo>Logo</Logo>
                        <Emoji src='./angry.png' alt="Emotion" />
                    </Header>
                    <ContentWrapper>
                        <Dropdown value={emotion} onChange={handleEmotionChange}>
                            {['전체', '화남', '기쁨', '우울', '슬픔', '당황', '불안', '뿌듯', '설렘'].map(emotion => (
                                <option key={emotion} value={emotion}>{emotion}</option>
                            ))}
                        </Dropdown>
                        <ButtonGroup>
                            <Button onClick={() => handlePeriodChange('날짜 지정 선택')}>날짜 지정 선택</Button>
                            <Button onClick={() => handlePeriodChange('오늘')}>오늘</Button>
                            <Button onClick={() => handlePeriodChange('7일')}>7일</Button>
                            <Button onClick={() => handlePeriodChange('30일')}>30일</Button>
                        </ButtonGroup>
                        {renderConsumptions()}
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
            </Container>
        </>
    );
};

export default ViewPage;
