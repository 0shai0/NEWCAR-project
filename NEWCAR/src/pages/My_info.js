import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function My_info() {

  const navigate = useNavigate();

  const userIdPattern = /^[a-zA-Z0-9가-힣]+$/;
  const userPwPattern = /^[a-zA-Z0-9가-힣]+$/;
  const nickNamePattern = /^[a-zA-Z0-9가-힣]+$/;
  const phoneNumberPattern = /^[0-9]*$/;  

  const session = window.sessionStorage;

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [nickName, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kind, setKind] = useState('');
  const [subscribeStart, setSubscribeStart] = useState('');
  const [subscribeEnd, setSubscribeEnd] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {

    const storedUserId = session.getItem('userId');
    const storedUserPw = session.getItem('userPw');
    const storedNickName = session.getItem('nickName');
    const storedPhoneNumber = session.getItem('phoneNumber');
    const storedKind = session.getItem('kind');
    const storedSubscribeStart = session.getItem('subscribeStart');
    const storedDays = session.getItem('days');
    const storedPrice = session.getItem('price');


    setUserId(storedUserId || '');
    setUserPw(storedUserPw || '');
    setNickname(storedNickName || '');
    setPhoneNumber(storedPhoneNumber || '');
    setKind(storedKind || '');
    setSubscribeStart(storedSubscribeStart ? storedSubscribeStart.substring(0, 10) : '');
    setDays(storedDays || '');
    setPrice(storedPrice || '');


    // 아래는 구독 시작일에서 days를 더해 구독 종료일을 구하기 위한 코드입니다

    if (storedSubscribeStart && storedDays) {

      const startDate = new Date(storedSubscribeStart);

      if (!isNaN(startDate.getTime())) {

        const endDate = new Date(startDate.getTime() + (parseInt(storedDays, 10) * 24 * 60 * 60 * 1000));
        setSubscribeEnd(endDate.toISOString().substring(0, 10));

      } else {

        setKind(null);
        setSubscribeStart(null);
        setSubscribeEnd(null);
        setPrice(null);

      }
    }
  }, []);


  useEffect(() => {

    const userId = sessionStorage.getItem('userId');
    const userPw = sessionStorage.getItem('userPw');
    const nickName = sessionStorage.getItem('nickName');
    const phoneNumber = sessionStorage.getItem('phoneNumber');

    if (!userId || !userPw || !nickName || !phoneNumber) {   

      navigate('/Login');   
      alert("내 정보는 로그인 후에 접속하실 수 있습니다."); 

    }
  }, [navigate]);


  // 내 정보 수정 시 나오는 alert

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const result = window.confirm('내 정보를 수정하시겠습니까?');
  
    if (!result) {
      alert('수정을 취소했습니다.');
      return;
    }    

    if (!userIdPattern.test(userId) || !userPwPattern.test(userPw) 
    || !nickNamePattern.test(nickName) || !phoneNumberPattern.test(phoneNumber)) {

      alert("공백, /, ?등의 특수문자는 입력하실 수 없습니다.");
      return;    

    }

    const url = `http://10.10.21.64:8080/api/account/${userId}?userPw=${userPw}&nickName=${nickName}&phoneNumber=${phoneNumber}`;
    const response = await fetch(url, { method : 'PUT' });

    if (response.ok) {

      session.setItem('userId', userId);
      session.setItem('userPw', userPw);
      session.setItem('nickName', nickName);
      session.setItem('phoneNumber', phoneNumber);
      alert('수정이 완료되었습니다.');

    } else {
      window.location.href = "/Myinfo";
      alert('오류가 발생했습니다.');
    }
  };


  // 로그아웃 시 생성되는 Alert입니다

  const handleLogout = (e) => {

    e.preventDefault();
    window.location.href = "/";
    session.clear();
    alert('로그아웃 되었습니다.');

  };


  // 회원탈퇴 시 생성되는 Alert입니다

  const handleDelete = async (e) => {

    e.preventDefault();

    const confirmResult = window.confirm('정말로 탈퇴하시겠습니까?');

    if (!confirmResult) {
      alert('탈퇴가 취소되었습니다.');
      return;
    }

    const url = `http://10.10.21.64:8080/api/account/${userId}`;
    const response = await fetch(url, { method: "delete" });

    if (response.ok) {

      navigate("/");
      session.clear();
      alert('탈퇴가 완료되었습니다.');
      
    } else {
      alert('탈퇴를 취소했습니다.');
    }   
  };

  // 구독 변경 시 나오는 Alert

  const handleShowConfirm2 = () => {       
    alert('구독 변경은 아직 구현하지 못했습니다.');
  };


  // 구독 취소 시 나오는 Alert

  const handleShowConfirm3 = () => {       
    alert('구독 취소는 아직 구현하지 못했습니다.');
  };


  // 화면을 움직이게 하기 위한 코드

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
            <input
              type='text'
              placeholder='아이디'
              name='userId'
              value={userId}
              onClick={() => alert('아이디는 변경할 수 없습니다.')}
              readOnly
            />
            <input
              type='text'
              placeholder='비밀번호'
              name='userPw'
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
            />
            <input
              type='text'
              placeholder='닉네임'
              name='nickName'
              value={nickName}
              onChange={(e) => setNickname(e.target.value)}
            />
            <input
              type='text'
              placeholder='전화번호'
              name='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className='info_button'>
              <input type='submit' value='수정' onClick={handleUpdate} />            
              {session.length > 0 && <input type='submit' value='로그아웃' onClick={handleLogout} />}
              <input type='submit' value='회원탈퇴' onClick={handleDelete} />
            </div>
          </form>;
          </div>

          <div className={`form signupform ${isFormActive ? 'active' : ''}`}>
            <form>
              <h3>구독 내역</h3>
              
              <div className='sub_list'>
                <div className='sub_type'>
                  <p>구독 종류</p>
                  <p>{kind || '구독 X'}</p>
                </div>
                <div className='sub_period'>
                  <p>구독 기간</p>
                  <p>{subscribeStart || '시작 날짜'} ~ {subscribeEnd || '끝나는 날짜'}</p>
                </div>             
                <div className='sub_price'>
                  <p>가격</p>
                  <p>{price || '??'}만원</p>
                </div>
              </div>
              <div className='sub_btn_list'>
                <div className='subBtn'>
                  <button type='button' className='signinBtn' onClick={handleShowConfirm2}>
                    구독 변경
                  </button>
                  <button type='button' className='signinBtn' onClick={handleShowConfirm3}>
                    구독 취소
                  </button>              
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