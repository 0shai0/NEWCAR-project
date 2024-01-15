import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function Login() {



  // 화면 움지이기 위한 코드


  const [isFormActive, setIsFormActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const signupBtn = document.querySelector('.signupBtn');
    const signinBtn = document.querySelector('.signinBtn');
    
    signupBtn.addEventListener('click', handleSignup);
    signinBtn.addEventListener('click', handleSignin);

    return () => {
      signupBtn.removeEventListener('click', handleSignup);
      signinBtn.removeEventListener('click', handleSignin);
    };
  }, []);

  const handleSignup = () => {
    setIsFormActive(true);
  };

  const handleSignin = () => {
    setIsFormActive(false);
  };


  // DB와 연결 후 로그인 시 나오는 Alert을 나오게 하기 위한 코드

  const [session, setSession] = useState([]);

  const handleShowConfirm = async () => {
    const userId = document.querySelector("#login_id").value;
    const userPw = document.querySelector("#login_pw").value;

    if (!userId || !userPw) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    } 

    const userIdPattern = /^[a-zA-Z0-9가-힣]+$/;
    const userPwPattern = /^[a-zA-Z0-9가-힣]+$/;

    if (!userIdPattern.test(userId)) {
      alert("아이디는 문자(단어)와 숫자만 입력해주세요.");
      return;
    }

    if (!userPwPattern.test(userPw)) {
      alert("비밀번호는 문자(단어)와 숫자만 입력해주세요.");
      return;
    }

    const url = `http://10.10.21.64:8080/api/login?userId=${userId}&userPw=${userPw}`;
    const response = await fetch(url, { method: "POST" });
    const userData = await response.json();

    if (userData.length > 0) {
      const user = userData[0];

      const { kind, ...userWithoutKind } = user;
      const kindValue = kind ? kind.kind : null;
      const kindPrice = kind ? kind.price : null;

      const userWithKindSeparated = {
        ...userWithoutKind,
        kind: kindValue,
        price: kindPrice,
      };

      Object.entries(userWithKindSeparated).forEach(([key, value]) => {
        window.sessionStorage.setItem(key, value);
      });

      setSession(user);
      alert("로그인이 완료되었습니다.");
      window.location.href = '/';
    } else {
      alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
    }
  };


    // 회원가입의 정보를 보내기 위한 코드

  const handleShowConfirm2 = async () => {

    let userId = document.querySelector("#sign_id").value
    let userPw = document.querySelector("#sign_pw").value
    let nickName = document.querySelector("#sign_nickname").value
    let phoneNumber = document.querySelector("#sign_phone").value

    if (!nickName || !userId || !userPw || !phoneNumber) {
      alert("개인 정보를 작성해주십시요.");
      return;
    } 

    const userIdPattern = /^[a-zA-Z0-9가-힣]+$/;
    const userPwPattern = /^[a-zA-Z0-9가-힣]+$/;
    const nickNamePattern = /^[a-zA-Z0-9가-힣]+$/;
    const phoneNumberPattern = /^[0-9]*$/;  

    if (!userIdPattern.test(userId)) {
      alert("아이디는 문자(단어)와 숫자만 입력해주세요.");
      return;
    }

    if (!userPwPattern.test(userPw)) {
      alert("비밀번호는 문자(단어)와 숫자만 입력해주세요.");
      return;
    }

    if (!nickNamePattern.test(nickName)) {
      alert("닉네임는 문자(단어)와 숫자만 입력해주세요.");
      return;
    }

    if (!phoneNumberPattern.test(phoneNumber)) {
      alert("전화번호는 숫자만 입력해주세요.");
      return;
    }

    const url = `http://10.10.21.64:8080/api/joinAccount?nickName=${nickName}&userId=${userId}`
                +`&userPw=${userPw}&phoneNumber=${phoneNumber}`; 

    const response = await fetch(url, { method: "POST" }); 

    if (response.ok) {
      window.location.href = "/Login";
      alert("회원가입이 완료되었습니다");
    }     
  }
    

  
  return (
    <div className='login'>
      <a href='/' className='login_logo'><div><img src='./images/Login_logo.png'/></div></a>
      <div className={`container ${isFormActive ? 'active' : ''}`}>
        <div className='blueBg'>
          <div className={`box signin ${isFormActive ? '' : 'active'}`}>
            <h2>계정이 있으신가요?</h2>
            <button type='button' className='signinBtn'>로그인</button>
          </div>
          <div className={`box signup ${isFormActive ? 'active' : ''}`}>
            <h2>계정이 없으신가요?</h2>
            <button type='button' className='signupBtn'>회원가입</button>
          </div>
        </div>

        <div className={`formBx ${isFormActive ? 'active' : ''}`}>
          <div className={`form signinform ${isFormActive ? '' : 'active'}`}>
            <form onSubmit={(e) => {e.preventDefault(); handleShowConfirm(true); }}>
              <h3>로그인</h3>
              <input id='login_id' type='text' placeholder='아이디' name='userId' />
              <input id='login_pw' type='password' placeholder='비밀번호' name='userPassword' />
              <input type='submit' value='로그인'/>
              <a href='/Findinfo' className='forgot'>아이디, 비밀번호를 잊으셨나요?</a>
            </form>
          </div>

          <div className={`form signupform ${isFormActive ? 'active' : ''}`}>
            <form onSubmit={(e) => {e.preventDefault(); handleShowConfirm2(true); }}>
              <h3>회원가입</h3>
              <input id='sign_id' type='text' placeholder='아이디' name='userId' />
              <input id='sign_pw' type='password' placeholder='비밀번호' name='userPw' />
              <input id='sign_nickname' type='text' placeholder='닉네임' name='nickName' />
              <input id='sign_phone' type='tel' placeholder='전화번호' name='phoneNumber' />
              <input type='submit' value='회원가입' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;