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

  const handleShowConfirm = async () => {

    let phoneNumber = document.querySelector("#idPhoneNumber").value

    const phoneNumberPattern = /^[0-9]*$/;

    if (!phoneNumberPattern.test(phoneNumber)) {
      alert("전화번호는 숫자만 입력해주세요.");
      return;
    }

    if (!phoneNumber) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    const url = `http://10.10.21.64:8080/api/findId?phoneNumber=${phoneNumber}`; 

    const ajax = await fetch(url, { method: "POST" }); 
    const responseText = await ajax.text();

    const idArray = JSON.parse(responseText);

    if (idArray.length > 0) {
      window.location.href = "/Login";
      const idList = idArray.map(id => `"${id}"`).join(', ');
      alert(`전화번호와 일치하는 아이디는 \n ${idList}가 존재합니다.`);
    } else {
      alert("해당 전화번호로 등록된 아이디가 없습니다.");
    }
  }

  // 비밀번호 찾기에서 아이디와 전화번호를 작성 시 사용되는 코드

  const handleShowConfirm2 = async () => {

    let userId = document.querySelector("#pwUserId").value
    let phoneNumber = document.querySelector("#pwPhoneNumber").value
    let userIdInput = document.querySelector("#pwUserId")
    let phoneNumberInput = document.querySelector("#pwPhoneNumber")
    let userPwInput = document.querySelector("#newPw")

    const userIdPattern = /^[a-zA-Z0-9가-힣]+$/;
    const phoneNumberPattern = /^[0-9]*$/;  

    if (!userIdPattern.test(userId)) {
      alert("아이디는 문자(단어)와 숫자만 입력해주세요.");
      return;
    }

    if (!phoneNumberPattern.test(phoneNumber)) {
      alert("전화번호는 숫자만 입력해주세요.");
      return;
    }

    if (!userId || !phoneNumber) {
      alert("아이디와 전화번호를 입력해주세요.");
      return;
    }

    const url = `http://10.10.21.64:8080/api/findPw?userId=${userId}&phoneNumber=${phoneNumber}`; 

    const response = await fetch(url, { method: "POST" }); 

    if (window.getComputedStyle(userIdInput).display === 'block' && window.getComputedStyle(phoneNumberInput).display === 'block' && window.getComputedStyle(userPwInput).display === 'none' && response.ok) {
  
      document.querySelector("#pwUserId").style.display = "none";
      document.querySelector("#pwPhoneNumber").style.display = "none";
      userPwInput.style.display = "block";
    }
  }


  // 비밀번호 찾기에서 아이디와 전화번호를 작성 후 사용되는 코드

  const handleShowConfirm3 = async () => {

    let userPw = document.querySelector("#newPw").value
    let userIdInput = document.querySelector("#pwUserId")
    let phoneNumberInput = document.querySelector("#pwPhoneNumber")
    let userPwInput = document.querySelector("#newPw")

    const userPwPattern = /^[a-zA-Z0-9가-힣]+$/;

    if (window.getComputedStyle(userIdInput).display === 'none' && window.getComputedStyle(phoneNumberInput).display === 'none' && window.getComputedStyle(userPwInput).display === 'block' && !userPwPattern.test(userPw)) {
      alert("비밀번호는 문자(단어)와 숫자만 입력해주세요.");
      return;
    } else if (!userPw) {
      alert("재설정할 비밀번호를 입력해주세요.");
      return;
    }

    const url = `http://10.10.21.64:8080/api/resetPw?userPw=${userPw}`;
    const response = await fetch(url, { method : 'PUT' });


    if (window.getComputedStyle(userIdInput).display === 'none' && window.getComputedStyle(phoneNumberInput).display === 'none' && window.getComputedStyle(userPwInput).display === 'block' && response.ok) {
      alert("비밀번호가 재설정 되었습니다.");
      window.location.href = "/Login";
    }
  }

  

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
            <form onSubmit={(e) => {e.preventDefault(); handleShowConfirm(true); }}>
              <h3>아이디 찾기</h3>
              <input id='idPhoneNumber' type='text' placeholder='전화번호 입력' name='phoneNumber' />
              <input type='submit' value='다음' />
            </form>
          </div>

          <div className={`form signupform ${isFormActive ? 'active' : ''}`}>
            <form onSubmit={(e) => {e.preventDefault(); handleShowConfirm2(true); handleShowConfirm3(true);}}>
              <h3>비밀번호 재설정</h3>
              <input id='pwUserId' type='text' placeholder='아이디' name='userId' />
              <input id='pwPhoneNumber' type='tel' placeholder='전화번호' name='phoneNumber' />
              <input id='newPw' type='password' placeholder='비밀번호 재입력' name='userPw' />
              <input type='submit' value='다음' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Find_info;