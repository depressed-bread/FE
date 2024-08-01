import React, { useState, useEffect } from 'react';
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
    font-size: 17px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #00D065;
    font-family: 'Ownglyph_meetme-Rg';
`;

const Detail = styled.div`
    margin : auto 20px;
    flex-direction: column;
    font-size: 23px;

`;

const LabelWrapper = styled.div`
    background-color: white;
    border-radius: 10px;
    border: 2px solid #00D065;
    padding: 6px;
    margin: 2px 0;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LabelWrapper1 = styled.div`
    display: flex;
`;

const LabelWrapper2 = styled.div`
    width: 100%;
    overflow-y: auto;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const ContentLabelWrapper = styled.div`
    background-color: white;
    border-radius: 10px;
    border: 2px solid #B0B0B0;
    padding: 4px;
    margin: 2px 0;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentLabel = styled.div`
    font-size: 13px;
    font-weight: bold;
    color: #B0B0B0;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ContentDetail = styled.div`
font-size: 15px;
margin: 10px 0 10px  5px;
font-family: 'Ownglyph_meetme-Rg';
overflow-wrap: break-word;
max-width: 100%;
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
    width: 90px;
    height: 90px;
    margin: 20px 0;
`;

const EmojiWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const ExpenseItem = styled.div`
    background-color: white;
    border-radius: 10px;
    border: 2px solid #00D065;
    padding: 20px;
    margin: 10px 0;
    width: 85%;
    align-items: center;
    font-family: 'Ownglyph_meetme-Rg';
`;

const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    flex-grow: 1;
    font-size: 20px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const Logo = styled.img`
    width: 30px;
    height: auto;
`;

const Emoji = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;


const DetailPage = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [topEmotion, setTopEmotion] = useState('');
    const [details, setDetails] = useState('')
    
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

    // 글마다의 expenseId를 Viewㅖage에서 가져옴
    const location = useLocation();
    const expenseId = location.state; 


    useEffect(() => {
        const fetchTopEmotion = async () => {
            try {
                const response = await api.get('/api/user/emotion');
                setTopEmotion(response.data.emotion);
            } catch (error) {
                console.error('Error fetching top emotion:', error);
            }
        };

        // 조회 API
        const fetchDetail = async () => {
            try{
                const response = await api.get(`/api/expenses/${expenseId}`)
                // console.log(response)
                setDetails(response.data)
            } catch (error) {
                console.error('Error fetching Detail:', error);
            }    
    
        }

        fetchTopEmotion(); fetchDetail();
    }, [expenseId]);

    // 삭제 API
    const handleCompletionClick = async () => {
        
        try{
            const response = await api.delete(`/api/expenses/${expenseId}`);
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
        navigate('/viewpage');
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
                        <br></br>
                        <BackButton onClick={() => navigate(-1)}><img src={BackImage} alt="Back" style={{width:'30px',height:'40px'}}/></BackButton>
                        <EmojiWrapper>
                            <SelectedEmoji src={emotionImages[details.emotion]} />
                        </EmojiWrapper>
                        <InputSection>
                            <ExpenseItem>
                                <LabelWrapper2>
                                    
                                    <LabelWrapper1>
                                        <LabelWrapper><Label>키워드</Label></LabelWrapper><Detail>{details.keyword} </Detail>
                                    </LabelWrapper1>
                                    <br></br>
                                    <LabelWrapper1>
                                        <LabelWrapper><Label>가격</Label></LabelWrapper><Detail>{details.price} </Detail>
                                    </LabelWrapper1>
                                    <br></br>
                                    <LabelWrapper1>
                                    <LabelWrapper><Label>날짜</Label></LabelWrapper><Detail>{details.date} </Detail>
                                    </LabelWrapper1>

                                    <ItemDetails>
                                        <div>
                                        </div>
                                    </ItemDetails>
                                </LabelWrapper2>
                            </ExpenseItem>
                        </InputSection>
                        <InputSection>
                            <ExpenseItem>
                                <ContentLabelWrapper><ContentLabel>상세 내용</ContentLabel></ContentLabelWrapper><ContentDetail>{details.content} </ContentDetail>
                                <ItemDetails>
                                    <div>
                                    </div>
                                </ItemDetails>
                            </ExpenseItem>
                        </InputSection>
                        <Button onClick={() => navigate("/editdetail", {state: expenseId})}>수정하기</Button>
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
        </>
    );
};

export default DetailPage;