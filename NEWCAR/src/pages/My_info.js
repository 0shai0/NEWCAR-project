import React, { useEffect, useState } from 'react';

function My_info() {

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

  return(
    <div className='login'>
      <a href='/' className='login_logo'><div><img src='./images/Login_logo.png'/></div></a>
      <div className={`container ${isFormActive ? 'active' : ''}`}>
        <div className='blueBg'>
          <div className={`box signin ${isFormActive ? '' : 'active'}`}>
            <h2>내 정보를 수정하시겠어요?</h2>
            <button type='button' className='signinBtn'>내 정보</button>
          </div>
          <div className={`box signup ${isFormActive ? 'active' : ''}`}>
            <h2>구독 내역이 궁금하신가요?</h2>
            <button type='button' className='signupBtn'>구독 내역</button>
          </div>
        </div>

        <div className={`formBx ${isFormActive ? 'active' : ''}`}>
          <div className={`form signinform ${isFormActive ? '' : 'active'}`}>
            <form>
              <h3>내 정보 수정</h3>
              <input type='text' placeholder='닉네임' name='userNickname' />
              <input type='text' placeholder='아이디' name='userId' />
              <input type='password' placeholder='비밀번호' name='userPassword' />
              <input type='tel' placeholder='전화번호' name='phone' />
              <input type='submit' value='수정' />
            </form>
          </div>

          <div className={`form signupform ${isFormActive ? 'active' : ''}`}>
            <form>
              <h3>구독 내역</h3>
              
              <div className='sub_list'>
                <div className='sub_type'>
                  <p>구독 종류</p>
                  <p>Basic</p>
                </div>
                <div className='sub_period'>
                  <p>구독 기간</p>
                  <p>2023-01-09 ~ 2023-02-09</p>
                </div>             
                <div className='sub_price'>
                  <p>가격</p>
                  <p>10만원</p>
                </div>
              </div>
              <div className='sub_btn_list'>
                <div className='subBtn'>
                  <button type='button' className='signinBtn'>구독 변경</button>
                  <button type='button' className='signinBtn'>구독 취소</button>              
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default My_info;