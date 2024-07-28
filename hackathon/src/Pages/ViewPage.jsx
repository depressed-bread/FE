import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import api from './Api';

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
    padding-top: 60px;
    padding-bottom: auto;
        min-height: 500px; // 최소 높이 설정
  max-height: 750px; // 최대 높이 설정
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
    float: right;
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
    position: absolute;
    bottom: 0;
    background-color: #FEF69B;
    z-index: 1;
    margin-bottom: 3%;
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
     const toggleDatePicker = () => {setIsDatePickerOpen(!isDatePickerOpen);};
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
        const renderday= day.startsWith('0') ? day.slice(1) : day;
        console.log(year)
        return (`${rendermonth}월 ${renderday}일`);
    };


    // 첫번째 호출
    useEffect(() => {

        const fetchTopEmotion = async () => {
            try {
                const response = await api.get('/api/user/emotion');
                setTopEmotion(response.data.emotion);
            } catch (error) {
                console.error('Error fetching top emotion:', error);
            }
        };

        // 첫번째 day 호출
        const fetchData = async () => {
            try{
                const response = await api.get('/api/report/day?&emotionType=ALL')
                setConsumptions(response.data)
                // console.log(consumptions)

                const res = await api.get('/api/stat/day')
                // console.log(res.data)
                setTotalPrice(res.data)
            } catch(error) {
                console.error('Error fetching Data:', error);
            }
           
        };

        fetchData();
        fetchTopEmotion();
    }, []);

    // 첫번째 아닌 day, week, month 선택시 호출
    const fetchedData = async (endpoint) => {
        try {
            const response = await api.get(`/api/report/${endpoint}?&emotionType=ALL`);
            const res = await api.get(`/api/stat/${endpoint}`);
            setPeriod(endpoint)
            setConsumptions(response.data)
            // console.log(response.data)
            setTotalPrice(res.data)
            // console.log(res.data)
        } catch(error) {
            console.error('Error fetching Data:', error);
        }
    };

    // custom 호출
    const CustomfetchedData = async (endpoint) => {
        try {
            const response = await api.get(`/api/report/custom?&startDate=${selectedStartDate}&endDate=${selectedEndDate}&emotionType=ALL`);

            setPeriod(endpoint)
            setConsumptions(response.data)
            console.log(response.data)
            
        } catch{
            
        }
    };


    // API 엔드포인트 전달
    const handleTodayClick = () => {
        fetchedData('day'); 
        setIsDatePickerOpen(false)
    };

    const handleWeekClick = () => {
        fetchedData('week'); 
        setIsDatePickerOpen(false)
    };

    const handleMonthClick = () => {
        fetchedData('month'); 
        setIsDatePickerOpen(false)
    };

    const handleCustomDateClick = () => {
        CustomfetchedData('custom'); 
    };

    const handleEmotionChange = (e) => {
        // console.log(e.target.value)
        setEmotion(e.target.value);
    };



    // 렌더링 5가지 경우
    const renderConsumptions = function () {
    
        // 전체, day 일때 렌더링
        if (emotion === '전체' && period === 'day' && typeof consumptions.date !== 'undefined'){ 
            // console.log('성공')
            // console.log(consumptions)
            // console.log(consumptions.expenses)
            
            return  ( 
                <div>
                    {consumptions.expenses.length > 0  && (<Title><Date>{formatDate(consumptions.date)}</Date> 소비내역</Title>)}
                    {consumptions.expenses.slice(0).reverse().map((items, index)=>(    
                        <ExpenseItem key={index} value={items.id}>
                            <EmojiIcon  src={`/${items.emotion}.png`} alt='emotion'/>
                                <ItemDetails>
                                    <div>{items.keyword}</div>
                                    <MoreButton onClick={() => navigate('/detail', {state: items.id})}> 상세보기 </MoreButton>
                                </ItemDetails>
                            <ExpenseSummary>
                                <Price>{items.price}</Price><Unit>원</Unit>
                            </ExpenseSummary>
                        </ExpenseItem> 
                    ))} 
                        <Totalprice>
                        {/* {console.log(totalPrice)} */}
                        {totalPrice} <Unit>원</Unit>
                        </Totalprice>
                </div>
            )



        // 초기 오류값 잡기
        } else if(emotion === '전체' && period === 'day' && typeof consumptions.date === 'undefined'){
            // {console.log(period + '성공')}
                




        //감정을 선택한 경우, 현재 선택되어 있는 기간으로 렌더링 (week, month, custom 가능)  // week, month, custom 전체에서 감정으로 변화 렌더링
        }else if(emotion !== '전체' && period !== 'day'){ 

            // console.log(period + 'good');
            // 감정을 바꾸고 이미 period는 변화없이 API호출이 되어져 있는 상태

            const emotionExpensesByDate = consumptions.filter(entry => entry.expenses.some(expense => expense.emotion === emotion)) // emotion 감정이 있는 날짜 필터링
            .map(entry => ({
                date: entry.date,
                expenses: entry.expenses.filter(expense => expense.emotion === emotion) // 해당 날짜의 emotion 감정 지출만 추출
            }));
            // console.log(emotionExpensesByDate); 
            
            // 감정에 따른 기간별 금액합계
            let emotionTotalPrice = emotionExpensesByDate.reduce((acc, cur) => {
                return acc + cur.expenses.reduce((expenseAcc, expenseCur) => {
                    return expenseAcc + expenseCur.price;
                }, 0);
                }, 0);
                
            // console.log(emotionTotalPrice);
            return(
                <div>
                    {emotionExpensesByDate.slice(0).reverse().map((item, index)=>(
                        <div>
                            <Title>
                                <Date>{formatDate(item.date)}</Date>  소비내역
                            </Title>
                                {item.expenses.slice(0).reverse().map((it,secindex) => (
                                <ExpenseItem key={secindex}>
                                    <EmojiIcon src={`/${it.emotion}.png`} alt='emotion'/>
                                        <ItemDetails>
                                            <div>{it.keyword}</div>
                                            <MoreButton onClick={() => navigate('/detail', {state: it.id})}>상세보기</MoreButton>
                                        </ItemDetails>
                                    <ExpenseSummary>
                                        <Price>{it.price}</Price><Unit>원</Unit>
                                    </ExpenseSummary>
                                </ExpenseItem>  
                            ))}
                        </div>
                    ))}
                    <Totalprice>
                        {console.log(emotionTotalPrice)}
                        {emotionTotalPrice} <Unit>원</Unit>
                    </Totalprice>
                </div>
            )
            
            // 전체 day에서 감정으로의 변화 api호출없이   // 감정 !day에서 day로의 변화 api호출
            }else if(emotion !== '전체' && period === 'day'){ 
                // console.log('마지막')
                // console.log(consumptions)
                // console.log(consumptions.expenses.filter(entry => entry.emotion === emotion))
                const totalExpenses = consumptions.expenses.filter(entry => entry.emotion === emotion)
                const totalExpense = totalExpenses.reduce((acc, it) => acc + it.price, 0);
                console.log(totalExpense)


                return  ( 
                    <div>
                        {totalExpenses.length > 0 && (<Title><Date>{formatDate(consumptions.date)}</Date> 소비내역</Title>)} 
                        {consumptions.expenses.filter(entry =>entry.emotion === emotion).slice(0).reverse().map((items, index)=>(
                            <ExpenseItem key={index}>
                                <EmojiIcon  src={`/${items.emotion}.png`} alt='emotion'/>
                                    <ItemDetails>
                                        <div>{items.keyword}</div>
                                        <MoreButton onClick={() => navigate('/detail', {state: items.id})}>상세보기</MoreButton>
                                    </ItemDetails>
                                <ExpenseSummary>
                                    <Price>{items.price}</Price><Unit>원</Unit>
                                </ExpenseSummary>
                            </ExpenseItem>
                        ))}
                        <Totalprice>
                        {totalExpense} <Unit>원</Unit>
                        </Totalprice>
                    </div>
                )
    
            // 처음 전체/day에서 바로 custom으로의 변화시
            }else if(emotion === '전체' && period === 'custom'){
                // console.log(period + 'good');
                // console.log(consumptions)
                let totalExpenses = consumptions.reduce((acc, cur) => {
                    return acc + cur.expenses.reduce((expenseAcc, expenseCur) => {
                    return expenseAcc + expenseCur.price;
                    }, 0);
                }, 0);
                 // console.log(totalExpenses);

            return (
                <div>
                    {consumptions.filter(it => it.expenses.length > 0).slice(0).reverse().map((items, index)=>(
                            <div key={index}>
                                <Title>
                                    <Date>{formatDate(items.date)}</Date>  소비내역
                                </Title>
                                {items.expenses.length > 0 ? items.expenses.slice(0).reverse().map((i, secindex) => (
                                    <ExpenseItem key={secindex}>
                                        <EmojiIcon src={`/${i.emotion}.png`} alt='emotion'/>
                                            <ItemDetails>
                                                <div>{i.keyword}</div>
                                                <MoreButton onClick={() => navigate('/detail', {state: i.id})}>상세보기</MoreButton>
                                            </ItemDetails>
                                        <ExpenseSummary>
                                            <Price>{i.price}</Price>
                                            <Unit>원</Unit>
                                        </ExpenseSummary>
                                    </ExpenseItem>  
                                )): <div></div>}     
                            </div>  
                    ))}
                    <Totalprice>
                    {console.log(totalExpenses)}
                    {totalExpenses} <Unit>원</Unit>
                    </Totalprice>
                </div>
            )

            // 나머지
            }else{
            return (
                    <div>
                        {consumptions.filter(it => it.expenses.length > 0).slice(0).reverse().map((items, index)=>(
                                <div key={index}>
                                    <Title>
                                        <Date>{formatDate(items.date)}</Date>  소비내역
                                    </Title>
                                    {items.expenses.length > 0 ? items.expenses.slice(0).reverse().map((i, secindex) => (
                                        <ExpenseItem key={secindex}>
                                            <EmojiIcon src={`/${i.emotion}.png`} alt='emotion'/>
                                                <ItemDetails>
                                                    <div>{i.keyword}</div>
                                                    <MoreButton onClick={() => navigate('/detail', {state: i.id})}>상세보기</MoreButton>
                                                </ItemDetails>
                                            <ExpenseSummary>
                                                <Price>{i.price}</Price>
                                                <Unit>원</Unit>
                                            </ExpenseSummary>
                                        </ExpenseItem>  
                                    )): <div></div>}     
                                </div>
                        ))}
                        <Totalprice>
                        {/* {console.log(totalPrice)} */}
                        {totalPrice} <Unit>원</Unit>
                        </Totalprice>
                    </div>
            )}
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
                    <Dropdown value={emotion} onChange={handleEmotionChange}>
                        {['전체', 'ANGRY', 'JOY', 'THRILL', 'SAD', 'PANIC', 'ANXIETY', 'PROUD', 'DEPRESSION'].map(emotion => (
                            <option key={emotion} value={emotion}>{emotion}</option>
                        ))}
                    </Dropdown>
                    <ButtonGroup>
                        <Button style={{ color : period === 'custom' ? '#FF86FF' : 'black'}} onClick={toggleDatePicker} >날짜 지정 선택</Button>
                        <Button style={{ color : period === 'day' ? '#FF86FF' : 'black'}} onClick={() => handleTodayClick('day')}>오늘</Button>
                        <Button style={{ color : period === 'week' ? '#FF86FF' : 'black'}} onClick={() => handleWeekClick('week')}>7일</Button>
                        <Button style={{ color : period === 'month' ? '#FF86FF' : 'black'}} onClick={() => handleMonthClick('month')}>30일</Button>
                    </ButtonGroup>
                    <CalanderGroup>
                    {isDatePickerOpen && (
                    <Calander>
                        <input 
                        type="date" 
                        value={selectedStartDate} 
                        onChange={handleStartDateChange} /> &nbsp;
                        ~&nbsp;
                        <input 
                        type="date" 
                        value={selectedEndDate} 
                        onChange={handleEndDateChange} />
                    </Calander> 
                    )}
                    {isDatePickerOpen && (<CalanderButton onClick={()=> {handleCustomDateClick('custom')}} >확인</CalanderButton>)}  
                    </CalanderGroup>
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
                    <MenuItem $active>
                        <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '40px' }} />
                        조회
                    </MenuItem>
                </Menu>
            </AppWrapper>
        </Container>
    );
};

export default ViewPage;