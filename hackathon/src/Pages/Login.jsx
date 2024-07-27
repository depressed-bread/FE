import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import api from './Api';

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
`;

const Logo = styled.div`
    font-size: 50px;
    font-weight: bold;
    margin-top: 50%;
    margin-bottom: 20%;
`;

const Input = styled.input`
    width: 80%;
    padding: 15px;
    margin-bottom: 5%;
    border: 1px solid #00D065;
    border-radius: 5px;
    font-size: 20px;
    font-family: 'Ownglyph_meetme-Rg'
`;

const LoginButton = styled.button`
    background-color: #FFD8E1;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 35px;
    width: 90%;
    margin-bottom: 20px;
    font-family: 'Ownglyph_meetme-Rg'

    &:hover {
        color: #FF86FF;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Link = styled.a`
    margin: 0 10px;
    cursor: pointer;
    text-decoration: none;
    color: black;
    font-family: 'Ownglyph_meetme-Rg'

    &:hover {
        text-decoration: underline;
    }
`;

const Footer = styled.div`
    position: absolute;
    bottom: 5%;
    left: 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: 'Ownglyph_meetme-Rg'
`;

const FooterText = styled.span`
    margin-left: 5px;
    font-family: 'Ownglyph_meetme-Rg'
`;

const QuestionMark = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #00D065;
    color: #FEFEFE;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const SignupLink = styled.a`
    cursor: pointer;
    text-decoration: underline;
    color: #00D065;
    font-family: 'Ownglyph_meetme-Rg';

    &:hover {
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    font-family: 'Ownglyph_meetme-Rg';
`;

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLoginClick = async () => {
        try {
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', password);

            const response = await api.post('/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // 세션에 사용자 정보 저장
            sessionStorage.setItem('user', JSON.stringify(response.data.user));

            console.log('로그인 성공:', response.data.message); // 로그인 성공 메시지 출력
            console.log('로그인 성공한 이메일:', response.data.user); // 로그인 성공한 이메일 출력
            navigate('/home'); // 로그인 성공 시 홈 페이지로 이동
        } catch (error) {
            console.error('로그인 실패:', error.response.data); // 서버에서 반환된 에러 메시지 출력
            setErrorMessage(error.response.data.message || '로그인에 실패했습니다. 다시 시도해주세요.'); // 에러 메시지 설정
        }
    };

    const handleFindIdClick = () => {
        navigate('/find-id');
    };

    const handleSendTempPasswordClick = () => {
        navigate('/send-temp-password');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppWrapper>
                    <Logo>Logo</Logo>
                    <Input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <LoginButton onClick={handleLoginClick}>로그인하기</LoginButton>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <LinkContainer>
                        <Link onClick={handleFindIdClick}>아이디찾기</Link>
                        <span>|</span>
                        <Link onClick={handleSendTempPasswordClick}>임시 비번 전송</Link>
                    </LinkContainer>
                    <Footer>
                        <QuestionMark>?</QuestionMark>
                        <span>아직 계정이 없으신가요?</span>
                        <FooterText></FooterText>
                        <SignupLink onClick={handleSignupClick}>회원가입</SignupLink>
                    </Footer>
                </AppWrapper>
            </Container>
        </>
    );
};

export default Login;
