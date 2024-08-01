import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHouse, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import api from './Api';
import { useLocation } from 'react-router-dom';
import logoImage from './logo.png';
import BackImage from './back.png';
import font from './온글잎밑미.ttf';

const GlobalStyle = createGlobalStyle`
   @font-face {
    font-family: 'Ownglyph_meetme-Rg';
    src: url(${font}) format('truetype');
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
    cursor: pointer;
`;

const Logo = styled.img`
    width: 30px;
    height: auto;
`;


const EditDetail = () => {
    const navigate = useNavigate();
    const [emotionType, setEmotionType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [topEmotion, setTopEmotion] = useState('');
    const [details, setDetails] = useState({
        keyword: '',
        price: '',
        date: '',
        content: '',
        emotionType: '',    // 백엔드 key값이 다름
    })



    // 가져온 expenseId 값
    const location = useLocation();
    const expenseId = location.state; 

    const emotionImages = {
        'ANGRY': '/angry.png',
        'JOY': '/joy.png',
        'ANXIETY': '/anxiety.png',
        'DEPRESSION': '/depression.png',
        'SAD': '/sad.png',
        'PROUD': '/proud.png',
        'PANIC': '/panic.png',
        'THRILL': '/thrill.png'
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

        //조회 API
        const fetchDetail = async () => {
            try{
                const response = await api.get(`/api/expenses/${expenseId}`)
                // console.log(response)
                setEmotionType(response.data.emotion)
                setDetails({
                    keyword: response.data.keyword,
                    price: response.data.price,
                    date: response.data.date,
                    content: response.data.content,
                    emotionType: response.data.emotion,
                });
            } catch (error) {
                console.error('Error fetching Detail:', error);
            }    
    
        };

        fetchTopEmotion(); fetchDetail();
    }, [expenseId]);

    //바뀔때마다 상태변화
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // console.log(details)

    const keywordInput = useRef();
    const priceInput = useRef();
    const dateInput = useRef();
    const contentInput = useRef();


    // 글자를 적지 않으면 수정불가
    const handleCompletionClick = async () => {
        if(details.keyword.length < 1){
            keywordInput.current.focus();
            return;
        }
        if(details.price.length < 1){
            priceInput.current.focus();
            return;
        }
        if(details.date.length < 1){
            dateInput.current.focus();
            return;
        }
        if(details.content.length < 1){
            contentInput.current.focus();
            return;
        }
        // 수정 API
        try{
            const response = await api.put(`/api/expenses/${expenseId}` , details);
                console.log(response.data.message)
                setModalOpen(true);
        } catch (error){
            console.log('Error updating data', error)
        }
    }
    const closeModal = () => {
        setModalOpen(false);
    };
    const handleViewClick = () => {
        navigate(-1);
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
                        <BackButton onClick={() => navigate(-1)}><img src={BackImage} alt="Back" style={{width:'30px',height:'40px'}}/></BackButton>
                        <InputSection>
                            <Label>키워드</Label>
                            <Input width="60%" ref={keywordInput} name="keyword" value={details.keyword} onChange={handleChange}/>
                        </InputSection>
                        <InputSection>
                            <Label>가격</Label>
                            <PriceWrapper>
                                <Input width="50%" ref={priceInput} name="price" value={details.price} onChange={handleChange}/>
                                <span style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>원</span>
                            </PriceWrapper>
                        </InputSection>
                        <InputSection>
                            <Label>날짜</Label>
                            <Input width="50%" ref={dateInput} type="date"  name="date" value={details.date} onChange={handleChange}/>
                        </InputSection>
                        <InputSection>
                            <Label>상세 내용</Label>
                            <TextArea rows="4" ref={contentInput}  name="content" value={details.content} onChange={handleChange}/>
                        </InputSection>
                        <InputSection>
                            <Label>감정 선택</Label>
                            <Select width="30%"   name="emotionType" value={emotionType} onChange={(e) => setEmotionType(e.target.value)} onClick={handleChange}>
                                <option value="ANGRY">화남</option>
                                <option value="JOY">기쁨</option>
                                <option value="PROUD">뿌듯</option>
                                <option value="DEPRESSION">우울</option>
                                <option value="SAD">슬픔</option>
                                <option value="ANXIETY">불안</option>
                                <option value="PANIC">당황</option>
                                <option value="THRILL">설렘</option>
                            </Select>
                            <SelectedEmoji src={emotionImages[emotionType]} alt={emotionType} />
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
                            <ModalButton onClick={handleViewClick}>이전 페이지로 이동하기</ModalButton>
                        </ModalContent>
                    </ModalBackdrop>
                )}
            </Container>
        </>
    );
};

export default EditDetail;