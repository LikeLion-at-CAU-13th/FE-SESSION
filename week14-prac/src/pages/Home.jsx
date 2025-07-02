import React from 'react'
import { useForm } from '../hooks/useForm'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/user';

const Home = () => {
    const [id, onChangeId] = useForm();
    const [pw, onChangePw] = useForm();
    const navigate = useNavigate();

  const onClick = async () => {
    try {
      const result = await login(id, pw);
      localStorage.setItem("access", result.accessToken);
      localStorage.setItem("refresh", result.refreshToken);
      navigate("/mypage");
    } catch (error) {
      alert("id나 pw를 확인하세요");
    }
  };

  return (
    <Wrapper>
        <Title>로그인</Title>
        <Form>
            <Inputs>
            <div>아이디</div>
            <input value={id} onChange={onChangeId}></input>
            <div>비밀번호</div>
            <input type="password" value={pw} onChange={onChangePw}></input>
            </Inputs>
            <TextWrap>
                <div>아이디 찾기</div>
                <div>|</div>
                <div>비밀번호 찾기</div>
            </TextWrap>
        </Form>
        <BtnWrapper>
            <SignupLink to="/signup">회원가입</SignupLink>
            <button onClick={onClick}>로그인</button>
        </BtnWrapper>
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  width: 350px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 30px;
  border: 3px solid #89cdf6;
  background: #fafffa;
  padding: 30px;
  margin-bottom: 5%;
  z-index: 1;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
`;

const BtnWrapper = styled.div`
  height: 100%;
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  button {
    font-weight: 800;
    background-color: #89cdf6;
    color: white;
    padding: 19px;
    border-radius: 10px;
    border: none;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 84px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 3px 3px skyblue;
      color: black;
      background-color: white;
    }
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 30px;
  color: #585858;
  font-family: SUITE;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  div {
    font-size: 14px;
    color: grey;
  }
`;

const Inputs = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 8px;
  input {
    font-size: 20px;
    height: 20px;
    width: 290px;
    border-radius: 10px;
    border: 1px solid #888;
    padding: 10px;
    margin-bottom: 1rem;
    &::placeholder {
      color: darkgray;
      font-size: 20px;
      font-weight: 500;
      font-family: "OTWelcomeRA";
    }
  }
`;

const SignupLink = styled(Link)`
  color: #89cdf6;
  font-family: SUITE;
  font-size: 16px;
  font-style: normal;
  padding: 10px;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  font-weight: bold;
  &:hover {
    text-shadow: 0px 0px 5px skyblue;
    color: white;
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: #b8e3f5;
  }
`;
