import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function My_info() {

  const navigate = useNavigate();
  const session = window.sessionStorage;

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [nickName, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const storedUserId = session.getItem('userId');
    const storedUserPw = session.getItem('userPw');
    const storedNickName = session.getItem('nickName');
    const storedPhoneNumber = session.getItem('phoneNumber');

    setUserId(storedUserId || '');
    setUserPw(storedUserPw || '');
    setNickname(storedNickName || '');
    setPhoneNumber(storedPhoneNumber || '');
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const result = window.confirm('내 정보를 수정하시겠습니까?');
  
    if (!result) {
      alert('수정이 취소되었습니다');
      return;
    }
  
    try {

      const url = `http://10.10.21.64:8080/api/account/${userId}?userId=${userId}&userPw=${userPw}&nickName=${nickName}&phoneNumber=${phoneNumber}`;
      const response = await fetch(url, { method : 'PUT' });
  
      if (response.ok) {
        session.setItem('userId', userId);
        session.setItem('userPw', userPw);
        session.setItem('nickName', nickName);
        session.setItem('phoneNumber', phoneNumber);
        alert('수정이 완료되었습니다');
      } else {
        window.location.href = "/Myinfo";
        alert('수정을 취소했습니다');
      }
    } catch (error) {
      console.error('Error during account update:', error);
      alert('오류가 발생했습니다');
    }
  };


  // 로그아웃 시 나오는 Alert

  const handleLogout = (e) => {
    e.preventDefault();
    window.location.href = "/";
    session.clear();
    alert('로그아웃 되었습니다');
  };


  // 회원탈퇴 시 나오는 Alert

  const handleDelete = async (e) => {

    e.preventDefault();

    const userId = session.getItem('userId');

    if (!userId) {
      alert('로그인을 해주시길 바랍니다');
      return;
    }

    const confirmResult = window.confirm('정말로 탈퇴하시겠습니까?');

    if (!confirmResult) {
      alert('탈퇴가 취소되었습니다');
      return;
    }

    try {
      const url = `http://10.10.21.64:8080/api/account/${userId}`;
      const response = await fetch(url, { method: "delete" });

      if (response.ok) {
        navigate("/");
        session.clear();
        alert('탈퇴가 완료되었습니다');
      } else {
        alert('탈퇴를 취소했습니다');
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
      alert('오류가 발생했습니다');
    }
  };
  

  // DB에서 구독 내역을 가져오는 코드



  // 구독 변경 시 나오는 Alert

  const handleShowConfirm2 = () => {
       
    const result = window.confirm('구독 종류를 변경하시겠습니까?');

    if (result) {
      alert('구독 종류가 변경되었습니다');
    } else {
      alert('구독 변경이 취소되었습니다');
    }
  };


  // 구독 취소 시 나오는 Alert

  const handleShowConfirm3 = () => {
       
    const result = window.confirm('구독을 취소하시겠습니까?');

    if (result) {
      alert('구독이 취소되었습니다');
    } else {
      alert('구독 변경이 취소되었습니다');
    }
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
              onChange={(e) => setUserId(e.target.value)}
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

            <input type='submit' value='수정' onClick={handleUpdate} />
            {session.length > 0 && <input type='submit' value='로그아웃' onClick={handleLogout} />}
            <input type='submit' value='회원탈퇴' onClick={handleDelete} />
          </form>;
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
                  <button type='button' className='signinBtn' onClick={handleShowConfirm2}>구독 변경</button>
                  <button type='button' className='signinBtn' onClick={handleShowConfirm3}>구독 취소</button>              
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