import React, { useEffect, useState } from 'react';


function Main() {

  const [my_id,set_my_id] = useState(window.sessionStorage.userId)
  const [my_pw,set_my_pw] = useState(window.sessionStorage.userPw)


  // 헤더, h1, .circle을 클릭 시 관련 화면으로 이동하는 코드입니다


  useEffect(() => {
    const buttonMappings = [
      { id: 'move1', target: 'car_video' },
      { id: 'move2', target: 3 },
      { id: 'move3', target: 5 },
      { id: 'move4', target: 7 },
      { id: 'down', target: 3 },
      { id: 'plus1', target: 4 },
      { id: 'plus2', target: 6 },
      { id: 'plus3', target: 8 },
      { id: 'minus1', target: 3 },
      { id: 'minus2', target: 5 },
      { id: 'minus3', target: 7 },
    ];
  
    const handleMoveClick = (targetSection) => {
      const section = targetSection === 'car_video' ?
        document.querySelector('.car_video') :
        document.querySelector(`.sec:nth-child(${targetSection})`);
  
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    const addEventListeners = () => {
      buttonMappings.forEach(({ id, target }) => {
        document.getElementById(id)?.addEventListener('click', () => handleMoveClick(target));
      });
    };
  
    const removeEventListeners = () => {
      buttonMappings.forEach(({ id }) => {
        document.getElementById(id)?.removeEventListener('click', handleMoveClick);
      });
    };
  
    addEventListeners();
  
    return removeEventListeners;
  }, []);

  // 아래 코드는 .sec.hidden${index}의 요소를
  // 클릭하면 display가 none이었던 걸 block으로 바꾸고
  // 다시 한 번 클릭 시 none이 만드는 코드입니다


  const handlePlusClick = (index) => {

    const element = document.querySelector(`.sec.hidden${index}`);
  
    if (element) {
      element.style.display = 'block';
      element.style.display = 'flex';
      element.style.alignitems = 'center';
      element.style.justifycontent = 'center';
      element.style.height = '120vh';
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMinusClick = (index) => {

    const element = document.querySelector(`.sec.hidden${index}`);

    if (element) {
      setTimeout(() => {
        element.style.display = 'none';
      }, 500);
    }
  }; 


  // 아래 코드는 스크롤한 화면과 헤더 카테고리가 일치한다면
  // scrolled라는 클래스 이름이 붙여지는 조건을 적은 코드입니다.
  // 참고로 CSS에 scrolled라고 붙여진 요소는 배경은 흰색, 글자색은 검정색으로 설정했습니다


  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hidden1Element = document.querySelector('.sec.hidden1');
  const hidden2Element = document.querySelector('.sec.hidden2');
  const hidden3Element = document.querySelector('.sec.hidden3');
    
  const isHidden1Visible = hidden1Element ? getComputedStyle(hidden1Element).display !== 'none' : false;
  const isHidden2Visible = hidden2Element ? getComputedStyle(hidden2Element).display !== 'none' : false;
  const isHidden3Visible = hidden3Element ? getComputedStyle(hidden3Element).display !== 'none' : false;

  let isFirstOrSecondSection;
  let isThirdOrFourthSection;
  let isFifthOrSixthSection;

  if (!isHidden1Visible) {
    
    isFirstOrSecondSection = scrollPosition >= window.innerHeight * 1 && scrollPosition < window.innerHeight * 2;

    if (!isHidden2Visible) {
      isThirdOrFourthSection = scrollPosition >= window.innerHeight * 2 && scrollPosition < window.innerHeight * 3;
      if (!isHidden3Visible) {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 3 && scrollPosition < window.innerHeight * 4;
      } else {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 3 && scrollPosition < window.innerHeight * 5;
      }
    } else {
      isThirdOrFourthSection = scrollPosition >= window.innerHeight * 2 && scrollPosition < window.innerHeight * 4;
      if (!isHidden3Visible) {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 4 && scrollPosition < window.innerHeight * 5;
      } else {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 4 && scrollPosition < window.innerHeight * 6;
      }
    }
  
  } else {

    isFirstOrSecondSection = scrollPosition >= window.innerHeight * 1 && scrollPosition < window.innerHeight * 3;
  
    if (!isHidden2Visible) {
      isThirdOrFourthSection = scrollPosition >= window.innerHeight * 3 && scrollPosition < window.innerHeight * 4;
      if (!isHidden3Visible) {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 4 && scrollPosition < window.innerHeight * 5;
      } else {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 4 && scrollPosition < window.innerHeight * 6;
      }
    } else {
      isThirdOrFourthSection = scrollPosition >= window.innerHeight * 3 && scrollPosition < window.innerHeight * 5;
      if (!isHidden3Visible) {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 5 && scrollPosition < window.innerHeight * 6;
      } else {
        isFifthOrSixthSection = scrollPosition >= window.innerHeight * 5 && scrollPosition < window.innerHeight * 7;
      }
    }

  }

  // Basic 구독하기 클릭 시 생성되는 Alert입니다.

  const handleShowConfirm = () => {
  
    const result = window.confirm('Basic으로 구독하시겠습니까?');

    if (result) {
      alert('구독이 완료되었습니다');
    } else {
      alert('구독이 취소되었습니다');
    }
  };

    // Premium 구독하기 클릭 시 생성되는 Alert입니다.

    const handleShowConfirm2 = () => {
  
      const result = window.confirm('Premium으로 구독하시겠습니까?');
  
      if (result) {
        alert('구독이 완료되었습니다');
      } else {
        alert('구독이 취소되었습니다');
      }
    };

  return (
    <div className='container-main'>

      <div>
        <header id='navbar'>
          <img id='move1' src='./images/Main_logo.png' />
          <ul>
            <li>
              <a
                id='move2'
                className={isFirstOrSecondSection ? 'scrolled' : ''}
              >
                소개
              </a>
            </li>
            <li>
              <a
                id='move3'
                className={isThirdOrFourthSection ? 'scrolled' : ''}
              >
                서비스
              </a>
            </li>
            <li>
              <a
                id='move4'
                className={isFifthOrSixthSection ? 'scrolled' : ''}
              >
                구독
              </a>
            </li>
            <li>


              {/* 로그인하면 로그인을 내 정보로 바꿔주고 href를 /Myinfo라 해줘 */}
            
              <a href='/Login'>로그인</a>
              {/* <a href='/Myinfo'>내 정보</a> */}

            </li>
          </ul>
        </header>
      </div>


      <div className='car_video'>
        <video src='./video/Main_video.mp4' muted autoPlay loop type='video/mp4'/>
        <div className='circle1' id='down'>
            <div className='arrow'></div>
        </div>
      </div>


      <div className='sec film'>
        <h1 id='plus1' onClick={() => handlePlusClick(1)}>
          Introduce
        </h1>
        <div className='circle2' id='plus1' onClick={() => handlePlusClick(1)}>
          <div className="plus">
          </div>
        </div>
      </div>

      <div className='sec hidden1'>

        <div className='circle3' id='minus1' onClick={() => handleMinusClick(1)}>
          <div className="minus"></div>
        </div>

        <div className='introduce'>
          <p>
            저희 뉴카는 꿈꿔왔습니다.<br/><br/>
            편하고, 피로하지 않은 이동<br/><br/>
            이제 운전하여 이동하는 시대는 끝났습니다.<br/>
            차안에서 휴식을 취하거나, 취미를 즐기며 이동하는 시대가 도래했습니다.<br/>
            하지만, 그런 높은 수준의 차는 이용하는데 비용이 많이 발생합니다.<br/><br/>
            우리는 고민했습니다.<br/><br/>
            
            누구나 경제적으로 이 서비스를 누릴수는 없을까?<br/>
            돈의 부유함을 떠나서, 누구나 최신기술의 무인자동차를<br/>
            쉽게 이용하게 할 수는 없을까?<br/><br/>
            그래서.. 시작했습니다.
          </p>
        </div>
      </div>


      <div className='sec film'>
        <h1 id='plus2' onClick={() => handlePlusClick(2)}>
          Service
        </h1>
        <div className='circle2' id='plus2' onClick={() => handlePlusClick(2)}>
          <div className="plus">
          </div>
        </div>
      </div>

      <div className='sec hidden2'>

        <div className='circle3' id='minus2' onClick={() => handleMinusClick(2)}>
          <div className="minus"></div>
        </div>

        <div className="services" id="services">    
          <div className="content">

            <div className="servicesBox">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
            </svg>
              <h2>편안함</h2>
              <p>
                친구들과 함께 하는 여행, 즐거움에만<br/>
                집중하시고, 운전은 저희 서비스에 맡겨보세요.<br />
                집에 있는 것처럼 책을 읽거나, 영화를 보며<br/>
                여유로운 시간을 보내실 수 있습니다.
              </p>
            </div>

            <div className="servicesBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
              </svg>
              <h2>접근성</h2>
              <p>
                저희 서비스는 누구나 이용할 수 있는<br/>
                탄력적인 가격을 제공합니다.<br/>
                차량 소유가 부담이신 분들도 <br/>
                뉴카의 서비스를 이용해 보세요.
              </p>
            </div>

            <div className="servicesBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <h2>경제성</h2>
              <p>
                차량 유지비용, 유류비, 보험료 등 고려하면<br />
                월 50만원이 넘는 비용이 발생합니다.<br />
                하지만 우리 서비스는 월 10만원으로도<br />
                충분히 이용하실 수 있습니다.
              </p>
            </div>

            <div className="servicesBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
              </svg>
              <h2>안전</h2>
              <p>
                저희 서비스를 이용하시면 음주운전으로 인한<br/> 
                사고 위험을 완전히 제거할 수 있습니다.<br/>
                친구들과의 즐거운 술자리 후,<br/>
                안전하게 귀가하실 수 있습니다.
              </p>
            </div>

            <div className="servicesBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
              </svg>
              <h2>시간 절약</h2>
              <p>
                출근길 교통체증, 주말의 장거리 운전으로<br />
                소중한 시간을 낭비하지 마세요.<br/>
                저희 서비스를 이용하시면, 이동 시간을<br/>
                효율적으로 활용하실 수 있습니다.
              </p>
            </div>

            <div className="servicesBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
              </svg>
              <h2>편의성</h2>
              <p>
                저희의 서비스는 24시간 운영됩니다.<br/>
                늦은 밤 귀가길이나 이른 아침 출근길,<br/>
                언제든 편리하게 이용하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className='sec film'>
        <h1 id='plus3' onClick={() => handlePlusClick(3)}>
          Subscribe
        </h1>
        <div className='circle2' id='plus3' onClick={() => handlePlusClick(3)}>
          <div className="plus">
          </div>
        </div>
      </div>


      {/* 여기부터 구독 페이지 */}

      <div className='sec hidden3'>

        <div className='circle3' id='minus3' onClick={() => handleMinusClick(3)}>
          <div className="minus"></div>
        </div>


        {/* 구독하기 버튼 클릭 시 구독 상황에 맞는 alert 띄우면 됨 */}

        <div className="subscribe">
          
          <div className="card">
            <div className="box">
              <div className="content">
                <h3>Basic</h3>
                <h4>10만원</h4>
                <p className="line_height1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  무제한 호출<br/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  1주 무료 체험<br/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                  </svg>
                  스마트 호출<br/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg x2" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                  </svg>
                  사고 시 100% 자사 책임
                </p>
                <a href="#" className="reg-btn" onClick={() => handleShowConfirm()}>구독하기</a>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="box">
              <div className="content">
                <h3>Premium</h3>
                <h4>13만원</h4>
                <p className="line_height2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  무제한 호출<br/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  1주 무료 체험<br/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  스마트 호출<br/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path className='path' d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  사고 시 100% 자사 책임
                </p>
                <a href="#" className="reg-btn" onClick={() => handleShowConfirm2()}>구독하기</a>
                
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* 여기까지 구독 페이지 */}

      <div className='sec film'></div>
      
    </div>
  );
}

export default Main;