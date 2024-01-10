import React, { useEffect, useState } from 'react';


function Login() {
  const [isFormActive, setIsFormActive] = useState(false);

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
            <form>
              <h3>로그인</h3>
              <input type='text' placeholder='아이디' name='userId' />
              <input type='password' placeholder='비밀번호' name='userPassword' />
              <input type='submit' value='로그인' />
              <a href='/Findinfo' className='forgot'>아이디, 비밀번호를 잊으셨나요?</a>
            </form>
          </div>

          <div className={`form signupform ${isFormActive ? 'active' : ''}`}>
            <form>
              <h3>회원가입</h3>
              <input type='text' placeholder='닉네임' name='userNickname' />
              <input type='text' placeholder='아이디' name='userId' />
              <input type='password' placeholder='비밀번호' name='userPassword' />
              <input type='tel' placeholder='전화번호' name='phone' />
              <input type='submit' value='회원가입' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;