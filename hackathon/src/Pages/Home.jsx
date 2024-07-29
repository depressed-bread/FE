import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import api from './Api';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('fonts/온글잎\\ 밑미.ttf') format('woff2');
  }
  body {
    font-family: 'Ownglyph_meetme-Rg';
  }
`;

const emojis = {
    '화남': '/angry.png',
    '기쁨': '/joy.png',
    '우울': '/depression.png',
    '슬픔': '/sad.png',
    '당황': '/panic.png',
    '불안': '/anxiety.png',
    '뿌듯': '/proud.png',
    '설렘': '/thrill.png'
};

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
    cursor: pointer;
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
    cursor: pointer;
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
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [consumptions, setConsumptions] = useState([]);
    const[topEmotion,setTopEmotion]=useState('');
    const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());

    useEffect(() => {

        const fetchTopEmotion=async()=>{
            try{
                const response=await api.get('/api/user/emotion');
                setTopEmotion(response.data.emotion);
            }catch(error){
                console.error('Error fetching top emotion:',error);
            }
        }

        const today = new Date();

        const fetchExpenseData = async () => {
            try {
                const response = await api.get('/api/report/day?emotionType=ALL');
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setConsumptions(data);

                // Set today's expenses
                const todayExpenses = data.filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return (
                        expenseDate.getDate() === today.getDate() &&
                        expenseDate.getMonth() + 1 === today.getMonth() + 1 &&
                        expenseDate.getFullYear() === today.getFullYear()
                    );
                }).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);

                setSelectedDateExpenses(todayExpenses);
            } catch (error) {
                console.error('There was an error', error);
            }
        };
        fetchTopEmotion();
        fetchExpenseData();
    }, []);

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

    const handleDayClick = (day) => {
        setSelectedDate(day);
        const expensesForDay = consumptions.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (
                expenseDate.getDate() === day &&
                expenseDate.getMonth() + 1 === month &&
                expenseDate.getFullYear() === year
            );
        });

        const sortedExpenses = expensesForDay.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSelectedDateExpenses(sortedExpenses.slice(0, 2));
    };

    const getEmotionForDay = (day) => {
        const expensesForDay = consumptions.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (
                expenseDate.getDate() === day &&
                expenseDate.getMonth() + 1 === month &&
                expenseDate.getFullYear() === year
            );
        });

        if (expensesForDay.length === 0) return null;

        const emotionTotals = expensesForDay.reduce((acc, expense) => {
            if (acc[expense.emotion]) {
                acc[expense.emotion] += expense.price;
            } else {
                acc[expense.emotion] = expense.price;
            }
            return acc;
        }, {});

        const maxEmotion = Object.keys(emotionTotals).reduce((a, b) => emotionTotals[a] > emotionTotals[b] ? a : b);
        return maxEmotion;
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
            const emotion = getEmotionForDay(i);

            calendarDays.push(
                <Day key={i} isSunday={isSunday} isSaturday={isSaturday} onClick={() => handleDayClick(i)}>
                    {i}
                    {emotion && <img src={`/${emotion}.png`} alt="Emotion" style={{ width: '30px', position: 'absolute', top: '5px', left: '5px' }} />}
                </Day>
            );
        }

        return calendarDays;
    };

    const renderExpenses = () => {
        return selectedDateExpenses.length > 0 ? (
            selectedDateExpenses.map((expense, index) => (
                <ExpenseItem key={index}>
                    <EmojiIcon src={`/${expense.emotion}.png`} alt="Emotion" />
                    <ItemDetails>
                        <div>{expense.keyword}</div>
                        <MoreButton onClick={() => navigate('/detail')}>상세보기</MoreButton>
                    </ItemDetails>
                    <ExpenseSummary>
                        <Price>{expense.price}</Price>원
                    </ExpenseSummary>
                </ExpenseItem>
            ))
        ) : (
            <div>해당 날짜의 소비내역이 없습니다.</div>
        );
    };

    return (
        <Container>
            <GlobalStyle />
            <AppWrapper>
                <Header>
                    <Logo>Logo</Logo>
                    {topEmotion && <Emoji src={emojis[topEmotion]} alt="Emotion" onClick={() => navigate('/setting')} /> }
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
                        <DateTitle>{month}월 {selectedDate}일 소비내역</DateTitle>
                    </DateTitleWrapper>
                    {renderExpenses()}
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