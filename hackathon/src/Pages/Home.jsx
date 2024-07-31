import React, { useEffect, useState, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import api from './Api';
import logoImage from './logo.png';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('fonts/온글잎 밑미.ttf') format('woff2');
  }
  body {
    font-family: 'Ownglyph_meetme-Rg';
  }
`;

const emotionIcons = {
    'ANGRY': '/angry.png',
    'JOY': '/joy.png',
    'DEPRESSION': '/depression.png',
    'SAD': '/sad.png',
    'PANIC': '/panic.png',
    'ANXIETY': '/anxiety.png',
    'PROUD': '/proud.png',
    'THRILL': '/thrill.png'
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
  color: ${props => (props.isSunday ? '#FF3B30' : props.isSaturday ? '#007AFF' : 'black')};
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
  font-family: 'Ownglyph_meetme-Rg';
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
  font-family: 'Ownglyph_meetme-Rg';
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
  const [emotions, setEmotions] = useState([]);
  const [topEmotion, setTopEmotion] = useState('');
  const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with current date

  //날짜 형식 변환
  const date = new Date(selectedDate);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    // Fetch today's date expenses on component mount
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setSelectedDate(today);
    fetchDateExpenses(todayStr);
    
    const fetchTopEmotion = async () => {
      try {
        const response = await api.get('/api/user/emotion');
        const emotion = response.data.emotion;

        if (emotionIcons[emotion]) {
          setTopEmotion(emotion);
        } else {
          console.error('Invalid emotion received:', emotion);
        }
      } catch (error) {
        console.error('Error fetching top emotion:', error);
      }
    };

    const fetchExpenseData = async () => {
      try {
        const response = await api.get('/api/report/day?emotionType=ALL');
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setConsumptions(data);
      } catch (error) {
        console.error('There was an error fetching expense data', error);
      }
    };

    const fetchMonthlyEmotions = async () => {
      try {
        const response = await api.get(`/api/report/emotion?year=${year}&month=${month}`);
        setEmotions(response.data);
      } catch (error) {
        console.error('There was an error fetching monthly emotions', error);
      }
    };

    fetchTopEmotion();
    fetchExpenseData();
    fetchMonthlyEmotions();
  }, [month, year]);

  const fetchDateExpenses = async (dateStr) => {
    try {
      const response = await api.get(`/api/report/calendar/day?Date=${dateStr}`);
      const data = response.data;
      const expensesForDay = data.find(expense => expense.date === dateStr);
      setSelectedDateExpenses(expensesForDay ? expensesForDay.expenses.slice().sort((a, b) => b.id - a.id).slice(0, 2) : []);
    } catch (error) {
      console.error('There was an error fetching expenses for the selected date', error);
    }
  };

  const handlePrevMonth = () => {
    setMonth(prevMonth => prevMonth === 1 ? 12 : prevMonth - 1);
    setYear(prevYear => month === 1 ? prevYear - 1 : prevYear);
  };

  const handleNextMonth = () => {
    setMonth(prevMonth => prevMonth === 12 ? 1 : prevMonth + 1);
    setYear(prevYear => month === 12 ? prevYear + 1 : prevYear);
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, month - 1, day, 12);
    setSelectedDate(clickedDate);
    const dateStr = clickedDate.toISOString().split('T')[0];
    fetchDateExpenses(dateStr);
  };

  const getEmotion = useMemo(() => {
    const emotionMap = {};
    emotions.forEach(({ date, emotion }) => {
      if (emotion) {
        emotionMap[date] = emotion;
      }
    });
    return (day) => {
      const dateStr = new Date(year, month - 1, day, 12).toISOString().split('T')[0];
      return emotionMap[dateStr] || null;
    };
  }, [emotions, month, year]);

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
      const emotion = getEmotion(i);

      calendarDays.push(
        <Day key={i} isSunday={isSunday} isSaturday={isSaturday} onClick={() => handleDayClick(i)}>
          {i}
          {emotion && <img src={emotionIcons[emotion]} alt={emotion} style={{ width: '30px', position: 'absolute', top: '5px', left: '5px' }} />}
        </Day>
      );
    }

    return calendarDays;
  };

  const renderExpenses = () => {
    return selectedDateExpenses.length > 0 ? (
      selectedDateExpenses.map((expense, index) => (
        <ExpenseItem key={index}>
          <EmojiIcon src={emotionIcons[expense.emotion]} alt="Emotion" />
          <ItemDetails>
            <div>{expense.keyword}</div>
            <MoreButton onClick={() => navigate('/detail', { state: expense.id })}>상세보기</MoreButton>
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
          <Logo src={logoImage} alt="Logo" />
          {topEmotion && emotionIcons[topEmotion] && <Emoji src={emotionIcons[topEmotion]} alt="Emotion" onClick={() => navigate('/setting')} />}
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
            <DateTitle>{month}월 {selectedDate.getDate()}일 소비내역</DateTitle>
          </DateTitleWrapper>
          {renderExpenses()}
          <MoreLink onClick={() => navigate('/Viewpage', {state : formattedDate})}>소비내역 더보기</MoreLink>
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