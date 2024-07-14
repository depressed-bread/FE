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

const MonthNavigation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px 0 20px;
    font-size: 35px;
`;

const Arrow = styled.div`
    cursor: pointer;
    font-size: 24px;
    margin: 0 20px;
    color: #00D065;
`;

const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding-top: 1vh;
    padding-bottom: 10vh;
`;

const CalendarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    width: 100%;
    text-align: center;
`;

const Day = styled.div`
    position: relative;
    padding: 10px;
    color: ${props => props.isSunday ? '#FF3B30' : props.isSaturday ? '#007AFF' : 'black'};
`;

const DateTitleWrapper = styled.div`
    width: 90%;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const DateTitle = styled.div`
    margin-top: 3%;
    font-size: 25px;
    color: #00D065;
`;

const ExpenseSummary = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
`;

const Price = styled.span`
    color: #00D065;
    margin-right: 5px;
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
`;

const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    flex-grow: 1;
    font-size: 20px;
`;

const EmojiIcon = styled.img`
    width: 60px;
    height: 60px;
`;

const MoreButton = styled.button`
    background-color: transparent;
    border: none;
    color: #B0B0B0;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 5px;
    text-align: left;
`;

const MoreLink = styled.button`
    background-color: transparent;
    border: none;
    color: #00D065;
    cursor: pointer;
    font-size: 18px;
    margin-top: 5px;
    text-align: center;
    width: 100%;
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

const Home = () => {
    const navigate = useNavigate();
    const [month, setMonth] = useState(7);
    const [year, setYear] = useState(2024);

    const handlePrevMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const stamps = {
        1: '/angry.png',
        7: '/happy.png',
        8: '/angry.png',
        11: '/gloomy.png',
        13: '/sad.png',
        14: '/excited.png',
        17: 'happy.png',
        20: '/stress.png',
        21: '/stress.png',
        23: '/angry.png',
        25: '/angry.png',
        29: '/embarrased.png'
    };

    const renderCalendar = () => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDayIndex = new Date(year, month - 1, 1).getDay();
        const calendarDays = [];
    
        for (let i = 0; i < firstDayIndex; i++) {
            calendarDays.push(<Day key={`empty-${i}`} />);
        }
    
        for (let i = 1; i <= daysInMonth; i++) {
            const isSunday = (firstDayIndex + i - 1) % 7 === 0;
            const isSaturday = (firstDayIndex + i - 1) % 7 === 6;
            const stamp = stamps[i];
    
            calendarDays.push(
                <Day key={i} isSunday={isSunday} isSaturday={isSaturday}>
                    {i}
                    {stamp && <img src={stamp} alt="Stamp" style={{ width: '30px', position: 'absolute', top: '5px', left: '5px' }} />}
                </Day>
            );
        }
    
        return calendarDays;
    };

    return (
        <Container>
            <AppWrapper>
                <Header>
                    <Logo>Logo</Logo>
                    <Emoji src='./angry.png' alt="Emotion" />
                </Header>
                <ContentWrapper>
                    <MonthNavigation>
                        <Arrow onClick={handlePrevMonth}>&lt;</Arrow>
                        <div>{year}.{month < 10 ? `0${month}` : month}</div>
                        <Arrow onClick={handleNextMonth}>&gt;</Arrow>
                    </MonthNavigation>
                    <CalendarWrapper>
                        <CalendarGrid>
                            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                                <Day key={index} isSunday={index === 0} isSaturday={index === 6} style={{ fontWeight: 'bold' }}>{day}</Day>
                            ))}
                            {renderCalendar()}
                        </CalendarGrid>
                    </CalendarWrapper>
                    <DateTitleWrapper>
                        <DateTitle>7월 13일 소비내역</DateTitle>
                        <ExpenseSummary>
                            <Price>41200</Price>원
                        </ExpenseSummary>
                    </DateTitleWrapper>
                    <ExpenseItem>
                        <EmojiIcon src='./angry.png' alt="Emotion" />
                        <ItemDetails>
                            <div>떡볶이</div>
                            <MoreButton onClick={() => navigate('/detail')}>상세보기</MoreButton>
                        </ItemDetails>
                        <ExpenseSummary>
                            <Price>21200</Price>원
                        </ExpenseSummary>
                    </ExpenseItem>
                    <ExpenseItem>
                        <EmojiIcon src='./sad.png' alt="Emotion" />
                        <ItemDetails>
                            <div>노래방</div>
                            <MoreButton onClick={() => navigate('/detail')}>상세보기</MoreButton>
                        </ItemDetails>
                        <ExpenseSummary>
                            <Price>6000</Price>원
                        </ExpenseSummary>
                    </ExpenseItem>
                    <MoreLink onClick={() => navigate('/loadingpage')}>소비내역 더보기</MoreLink>
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
    );
};

export default Home;
