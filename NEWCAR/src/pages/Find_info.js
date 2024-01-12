import React, { useEffect, useState } from 'react';


function Find_info() {

  



  // 화면 움직이는 코드

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


  // 아이디 찾기 시 나오는 Alert



  return (
    <div className='login'>
      <a href='/' className='login_logo'><div><img src='./images/Login_logo.png'/></div></a>
      <div className={`container ${isFormActive ? 'active' : ''}`}>
        <div className='blueBg'>
          <div className={`box signin ${isFormActive ? '' : 'active'}`}>
            <h2>아이디를 잊으셨나요?</h2>
            <button type='button' className='signinBtn'>아이디 찾기</button>
          </div>
          <div className={`box signup ${isFormActive ? 'active' : ''}`}>
            <h2>비밀번호를 잊으셨나요?</h2>
            <button type='button' className='signupBtn'>비밀번호 재설정</button>
          </div>
        </div>

        <div className={`formBx ${isFormActive ? 'active' : ''}`}>
          <div className={`form signinform ${isFormActive ? '' : 'active'}`}>
            <form>
              <h3>아이디 찾기</h3>
              <input type='text' placeholder='전화번호 입력' name='userId' />
              <input type='submit' value='다음' />
            </form>
          </div>

          <div className={`form signupform ${isFormActive ? 'active' : ''}`}>
            <form>
              <h3>비밀번호 재설정</h3>
              <input type='text' placeholder='아이디' name='userId' />
              <input type='tel' placeholder='전화번호' name='phone' />
              <input type='submit' value='다음' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Find_info;