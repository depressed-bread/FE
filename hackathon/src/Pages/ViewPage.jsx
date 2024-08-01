import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import api from './Api';
import logoImage from './logo.png';
import { useLocation } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url('/fonts/온글잎\\ 밑미.ttf') format('woff2');
  }
  body {
    font-family: 'Ownglyph_meetme-Rg';
  }
`;

const emojis = {
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
    padding-bottom: 0;
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
    top: 0;
    padding: 0 20px;
    z-index: 1;
    background-color: #FEF69B;
`;

const Logo = styled.img`
  width: 30px;
  height: auto;
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;
`;

const Dropdown = styled.select`
    margin: 20px 0;
    padding: 10px;
    font-size: 16px;
    width: 35%;
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

const CalanderGroup = styled.div`
    margin-left : 20px;
`;

const Calander = styled.div`
    display: inline;
`;

const CalanderButton = styled.button`
    padding: 7px;
    font-size: 16px;
    background-color: #FFCCE7;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
        color: #FF86FF;
    }
    margin-left : 20px;
    margin-top : 2px;
`;

const Title = styled.h2`
    margin-top: 20px;
    font-size: 24px;
    font-family: 'Ownglyph_meetme-Rg';

    span {
        color: #00D065;
    }
`;

const Date = styled.span`
`;

const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding-top: 10px;
    padding-bottom: 80px;
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

const Totalprice = styled.div`
    color: #00D065;
    font-size: 30px;
    font-weight : bold;
    z-index: 1;
    margin-right: 10px;
`;

const Dayprice = styled.div`
    color: #00D065;
    font-size: 30px;
    font-weight : bold;
    text-align: right;
    z-index: 1;
    margin-right: 10px;
`;

const Unit = styled.span`
    color: black;
`;

const Menu = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    bottom: 0;
    background-color: #FEF69B;
    z-index: 1;
    margin-bottom: 3.5%;
`;

const LeftMenuItem = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== '$active',
})`
    cursor: pointer;
    font-size: 16px;
    color: ${props => (props.$active ? '#00D065' : '#B0B0B0')};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Ownglyph_meetme-Rg';
    padding-right: 40px;
`;

const MenuItem = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== '$active',
})`
    cursor: pointer;
    font-size: 16px;
    color: ${props => (props.$active ? '#00D065' : '#B0B0B0')};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Ownglyph_meetme-Rg';
`;

const RightMenuItem = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== '$active',
})`
    cursor: pointer;
    font-size: 16px;
    color: ${props => (props.$active ? '#00D065' : '#B0B0B0')};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Ownglyph_meetme-Rg';
    padding-left: 40px;
`;

const ViewPage = () => {
    const navigate = useNavigate();
    const [emotion, setEmotion] = useState('전체');
    const [period, setPeriod] = useState('day');
    const [consumptions, setConsumptions] = useState([]);
    const [topEmotion, setTopEmotion] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    //달력
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const toggleDatePicker = () => { setIsDatePickerOpen(!isDatePickerOpen); };
    const handleEndDateChange = (event) => {
        setSelectedEndDate(event.target.value);
    };
    const handleStartDateChange = (event) => {
        setSelectedStartDate(event.target.value);
    };
    //날짜변환함수
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        const rendermonth = month.startsWith('0') ? month.slice(1) : month;
        const renderday = day.startsWith('0') ? day.slice(1) : day;
        console.log(year)
        return (`${rendermonth}월 ${renderday}일`);
    };

    const location = useLocation();
    const convertEmotions = {
        전체: "전체",
        화남: "ANGRY",
        기쁨: "JOY",
        설렘: "THRILL",
        슬픔: "SAD",
        당황: "PANIC",
        불안: "ANXIETY",
        뿌듯: "PROUD",
        우울: "DEPRESSION"
      };
      
    // 첫번째 호출
    useEffect(() => {
        const fetchTopEmotion = async () => {
            try {
                const response = await api.get('/api/user/emotion');
                const emotion = response.data.emotion;
                setTopEmotion(emotion);
            } catch (error) {
                console.error('Error fetching top emotion:', error);
            }
        };
        // 첫번째 day 호출
        const fetchData = async () => {
            try {
                const response = await api.get('/api/report/day?&emotionType=ALL')
                setConsumptions(response.data)

                const res = await api.get('/api/stat/day')
                setTotalPrice(res.data)
            } catch (error) {
                console.error('Error fetching Data:', error);
            }
        };
         const date = location.state; 
         console.log(date)
        // 날짜별 지출 호출
        const fetchDate = async () => {
            try {
                const response = await api.get(`/api/report/calendar/day?Date=${date}`);
                setConsumptions(response.data)
                console.log(response)
                setPeriod('custom')
            } catch (error) {
                console.error('Error fetching top emotion:', error);
            }
        };
            if(date !== null){
                fetchDate();
            } else {
                fetchData();
            }
            fetchTopEmotion();
        }, [location.state]);

    const fetchedData = async (endpoint) => {
        try {
            const response = await api.get(`/api/report/${endpoint}?&emotionType=ALL`);
            const res = await api.get(`/api/stat/${endpoint}`);
            setPeriod(endpoint);
            setConsumptions(response.data);
            setTotalPrice(res.data);
        } catch (error) {
            console.error('Error fetching Data:', error);
        }
    };
    // custom 호출
    const CustomfetchedData = async (endpoint) => {
        try {
            const response = await api.get(`/api/report/custom?&startDate=${selectedStartDate}&endDate=${selectedEndDate}&emotionType=ALL`);
            setPeriod(endpoint);
            setConsumptions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Data:', error);
        }
    };
    // API 엔드포인트 전달
    const handleTodayClick = () => {
        fetchedData('day');
        setIsDatePickerOpen(false);
    };
    const handleWeekClick = () => {
        fetchedData('week');
        setIsDatePickerOpen(false);
    };
    const handleMonthClick = () => {
        fetchedData('month');
        setIsDatePickerOpen(false);
    };
    const handleCustomDateClick = () => {
        CustomfetchedData('custom');
    };
    const handleEmotionChange = (e) => {
        setEmotion(e.target.value);
        console.log(e.target.value)
    };
     const renderConsumptions = function () {
        if (emotion === '전체' && period === 'day' && typeof consumptions.date !== 'undefined') {
            return (
                <div>
                    <Totalprice>
                         {totalPrice.toLocaleString()} <Unit>원</Unit>
                    </Totalprice>
                    
                    {consumptions.expenses.length > 0 && (
                        <Title><Date>{formatDate(consumptions.date)}</Date> 소비내역</Title>
                    )}
                    
                    {consumptions.expenses.slice(0).reverse().map((items, index) => (
                        <ExpenseItem key={index} value={items.id}>
                            <EmojiIcon src={emojis[items.emotion]} alt='emotion' />
                            <ItemDetails>
                                <div>{items.keyword}</div>
                                <MoreButton onClick={() => navigate('/detail', { state: items.id })}>상세보기</MoreButton>
                            </ItemDetails>
                            <ExpenseSummary>
                                <Price>{items.price.toLocaleString()}</Price><Unit>원</Unit>
                            </ExpenseSummary>
                        </ExpenseItem>
                    ))}
                    <Dayprice>
                         {totalPrice.toLocaleString()} <Unit>원</Unit>
                    </Dayprice>
                </div>
            );
        } else if (emotion === '전체' && period === 'day' && typeof consumptions.date === 'undefined') {
            // 초기 오류값 잡기
        } else if (emotion !== '전체' && period !== 'day') {
            const emotionExpensesByDate = consumptions.filter(entry => entry.expenses.some(expense => expense.emotion === emotion))
                .map(entry => ({
                    date: entry.date,
                    expenses: entry.expenses.filter(expense => expense.emotion === emotion)
                }));

            let emotionTotalPrice = emotionExpensesByDate.reduce((acc, cur) => {
                return acc + cur.expenses.reduce((expenseAcc, expenseCur) => {
                    return expenseAcc + expenseCur.price;
                }, 0);
            }, 0);

            return (
                <div>
                    <Totalprice>
                        {emotionTotalPrice.toLocaleString()} <Unit>원</Unit>
                    </Totalprice>
                    {emotionExpensesByDate.slice(0).reverse().map((item, index) => (
                        <div key={index}>
                            <Title>
                                <Date>{formatDate(item.date)}</Date> 소비내역
                            </Title>
                            {item.expenses.slice(0).reverse().map((it, secindex) => (
                                <ExpenseItem key={secindex}>
                                    <EmojiIcon src={emojis[it.emotion]} alt='emotion' />
                                    <ItemDetails>
                                        <div>{it.keyword}</div>
                                        <MoreButton onClick={() => navigate('/detail', { state: it.id })}>상세보기</MoreButton>
                                    </ItemDetails>
                                    <ExpenseSummary>
                                        <Price>{it.price.toLocaleString()}</Price><Unit>원</Unit>
                                    </ExpenseSummary>
                                </ExpenseItem>
                            ))}
                            <Dayprice>
                            {item.expenses.map(expense => expense.price).reduce((acc, price) => acc + price, 0).toLocaleString()} <Unit>원</Unit>
                            </Dayprice>
                        </div>
                    ))}
                </div>
            );
        } else if (emotion !== '전체' && period === 'day') {
            const totalExpenses = consumptions.expenses.filter(entry => entry.emotion === emotion);
            const totalExpense = totalExpenses.reduce((acc, it) => acc + it.price, 0);

            return (
                <div>
                    <Totalprice>
                        {totalExpense.toLocaleString()} <Unit>원</Unit>
                    </Totalprice>
                    {totalExpenses.length > 0 && (
                        <Title><Date>{formatDate(consumptions.date)}</Date> 소비내역</Title>
                    )}
                    {totalExpenses.slice(0).reverse().map((items, index) => (
                        <ExpenseItem key={index}>
                            <EmojiIcon src={emojis[items.emotion]} alt='emotion' />
                            <ItemDetails>
                                <div>{items.keyword}</div>
                                <MoreButton onClick={() => navigate('/detail', { state: items.id })}>상세보기</MoreButton>
                            </ItemDetails>
                            <ExpenseSummary>
                                <Price>{items.price.toLocaleString()}</Price><Unit>원</Unit>
                            </ExpenseSummary>
                        </ExpenseItem>
                    ))}
                    <Dayprice>
                         {totalExpense.toLocaleString()} <Unit>원</Unit>
                    </Dayprice>
                </div>
            );
        } else if (emotion === '전체' && period === 'custom') {
            let totalExpenses = consumptions.reduce((acc, cur) => {
                return acc + cur.expenses.reduce((expenseAcc, expenseCur) => {
                    return expenseAcc + expenseCur.price;
                }, 0);
            }, 0);

            return (
                <div>
                     <Totalprice>
                        {totalExpenses.toLocaleString()} <Unit>원</Unit>
                    </Totalprice>
                    {consumptions.filter(it => it.expenses.length > 0).slice(0).reverse().map((items, index) => (
                        <div key={index}>
                            <Title>
                                <Date>{formatDate(items.date)}</Date> 소비내역
                            </Title>
                            {items.expenses.length > 0 ? items.expenses.slice(0).reverse().map((i, secindex) => (
                                <ExpenseItem key={secindex}>
                                    <EmojiIcon src={emojis[i.emotion]} alt='emotion' />
                                    <ItemDetails>
                                        <div>{i.keyword}</div>
                                        <MoreButton onClick={() => navigate('/detail', { state: i.id })}>상세보기</MoreButton>
                                    </ItemDetails>
                                    <ExpenseSummary>
                                        <Price>{i.price.toLocaleString()}</Price>
                                        <Unit>원</Unit>
                                    </ExpenseSummary>
                                </ExpenseItem>
                            )) : <div></div>}
                            <Dayprice>
                            {items.expenses.map(expense => expense.price).reduce((acc, price) => acc + price, 0).toLocaleString()} <Unit>원</Unit>
                            </Dayprice>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div>
                    <Totalprice>
                        {totalPrice.toLocaleString()} <Unit>원</Unit>
                    </Totalprice>
                    {consumptions.filter(it => it.expenses.length > 0).slice(0).reverse().map((items, index) => (
                        <div key={index}>
                            <Title>
                                <Date>{formatDate(items.date)}</Date> 소비내역
                            </Title>
                            {items.expenses.length > 0 ? items.expenses.slice(0).reverse().map((i, secindex) => (
                                <ExpenseItem key={secindex}>
                                    <EmojiIcon src={emojis[i.emotion]} alt='emotion' />
                                    <ItemDetails>
                                        <div>{i.keyword}</div>
                                        <MoreButton onClick={() => navigate('/detail', { state: i.id })}>상세보기</MoreButton>
                                    </ItemDetails>
                                    <ExpenseSummary>
                                        <Price>{i.price.toLocaleString()}</Price>
                                        <Unit>원</Unit>
                                    </ExpenseSummary>
                                </ExpenseItem>
                            )) : <div></div>}
                            <Dayprice>
                            {items.expenses.map(expense => expense.price).reduce((acc, price) => acc + price, 0).toLocaleString()} <Unit>원</Unit>
                            </Dayprice>
                        </div>
                    ))}
                </div>
            );
        }
    };
    return (
        <Container>
            <GlobalStyle />
            <AppWrapper>
                <Header>
                    <Logo src={logoImage} alt="Logo" />
                    {topEmotion && <Emoji src={emojis[topEmotion]} alt="Emotion" onClick={() => navigate('/setting')} />}
                </Header>
                <ContentWrapper>
                    <Dropdown value={convertEmotions[emotion]} onChange={handleEmotionChange}>
                        {Object.keys(convertEmotions).map(emotion => (
                            <option key={convertEmotions[emotion]} value={convertEmotions[emotion]}>{emotion}</option>
                        ))}
                    </Dropdown>
                    <ButtonGroup>
                        <Button style={{ color: period === 'custom' ? '#FF86FF' : 'black' }} onClick={toggleDatePicker} >날짜 지정 선택</Button>
                        <Button style={{ color: period === 'day' ? '#FF86FF' : 'black' }} onClick={handleTodayClick}>오늘</Button>
                        <Button style={{ color: period === 'week' ? '#FF86FF' : 'black' }} onClick={handleWeekClick}>이번주</Button>
                        <Button style={{ color: period === 'month' ? '#FF86FF' : 'black' }} onClick={handleMonthClick}>이번달</Button>
                    </ButtonGroup>
                    <CalanderGroup>
                        {isDatePickerOpen && (
                            <Calander>
                                <input
                                    type="date"
                                    value={selectedStartDate}
                                    onChange={handleStartDateChange} /> &nbsp;
                                                                    <input
                                    type="date"
                                    value={selectedEndDate}
                                    onChange={handleEndDateChange} />
                            </Calander>
                        )}
                        {isDatePickerOpen && (<CalanderButton onClick={() => { handleCustomDateClick('custom') }} >확인</CalanderButton>)}
                    </CalanderGroup>
                    {renderConsumptions()}
                </ContentWrapper>
                <Menu>
                    <LeftMenuItem onClick={() => navigate('/inputpage')}>
                        <FontAwesomeIcon icon={faPen} style={{ fontSize: '40px' }} />
                        내용입력
                    </LeftMenuItem>
                    <MenuItem onClick={() => navigate('/home')}>
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '40px' }} />
                        홈
                    </MenuItem>
                    <RightMenuItem $active>
                        <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '40px' }} />
                        조회
                    </RightMenuItem>
                </Menu>
            </AppWrapper>
        </Container>
    );
};

export default ViewPage;