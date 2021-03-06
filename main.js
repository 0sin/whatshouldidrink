'use strict';

// 변수선언
const qSlide = document.querySelector('.q_slide');
const qItems = document.querySelector('.q_items');
const qItem = document.querySelectorAll('.q_item');
const qList = document.querySelectorAll('.q_list');

const qHeader = document.querySelector('.q_header');
const nameInput = document.querySelector('.name_input');

const btn = document.querySelectorAll('.btn');
const resultObj = {};

let qIdx = 0;
let nameText = '';
let lastPage3secDisplay = undefined;
let brandName = undefined;


// qIdx 이동
function goToQIdx(x) {
  let itemWidth = qItem[qIdx].clientWidth;
  qIdx += x;

  if(qIdx < 0) {
    qIdx = 0;
  } else if (qIdx >= qItem.length - 1) {
    qIdx = qItem.length - 1;
  }

  qItems.style.transform = `translateX(${-(itemWidth) * qIdx}px)`;
  fadeInElements();
}

// next 이동
function nextQItems() {
  goToQIdx(1);
}

// prev 이동
function prevQItems() {
  goToQIdx(-1);
}


// QSlide element fade in
function fadeInElements() {
  let len = qItem[qIdx].children.length;
  for(let i = 0; i < len; i++) {
    qItem[qIdx].children[i].style.opacity = "1";
    qItem[qIdx].children[i].style.transition = `opacity 1s ease ${i}s`;
  }
}

// Header(BACK Btn) On/Off
function showQHeader() {
  qHeader.classList.add('on');
}
function hideQHeader() {
  qHeader.classList.remove('on');
}

// Add brand's name to footer
function addBrandNameToFooter(brandName) {
  const brandNameSpan = document.querySelector('.copy_brand_name');
  brandNameSpan.innerText = `in ${brandName}`;
  brandNameSpan.style.color = `var(--${brandName}-color)`;
  brandNameSpan.style.opacity = 1;
}

function choiceBrand(choosenbrand) {
  brandName = choosenbrand;
  addBrandNameToFooter(brandName);
}

// Progressbar
function gaugingBar() {
  const qProgressBar = document.querySelector('.q_progress_bar')
  const qBar = document.querySelector('.q_bar_gauge')
  let qListIdx = qIdx - 3;
  if (qListIdx < 0) {
    qProgressBar.style.opacity = 0;
    qBar.style.width = 0;
  } else if(qListIdx === 0) {
    qProgressBar.style.opacity = 1;
  } else if (qListIdx >= qList.length) {
    qProgressBar.style.opacity = 0;
  } else {
    qProgressBar.style.opacity = 1;
    qBar.style.width = `${(100 / qList.length) * qListIdx}%`;
  }
  console.log(qListIdx)
}



// Waiting page Animation
function waitingAnimation() {
  const waitingBar = document.querySelector('.w_bar_width');
  waitingBar.style = 'animation: waitingBar 3s ease-in-out;'
}


// Question Page 인덱스 별 Event
function findIdx() {
  
  // index = 2;
  // 인풋에 자동 포커스
  // 값이 없는데 엔터 누르면 경고창 띄우기
  // 엔터 눌러도 슬라이드 넘어가게 하기
  // if (qIdx === 2) {
  //   nameInput.focus();
  //   return;
  // }
  
  if (qIdx === 3) {
    showQHeader();
    gaugingBar();
  }

  if (qIdx === qItem.length - 1) {
    // q_slide 끄고 결과창 보여주기
    hideQHeader();
    waitingAnimation();
    lastPage3secDisplay = setTimeout(hideQSlidePage, 4000);
  }
}




// RESULT -------------------------------------------
// 객체 생성후 값 기록
function recordResult(e) {
  const key = e.target.dataset.key;
  const value = e.target.dataset.value;

  resultObj[key] = value;
  console.log(resultObj);
}


// 객체 결과값으로 음료 고르기
let resultBeverage = '';
function choiceBeverage() {
  if(resultObj.caffein === 'caffein' || resultObj.caffein === 'nomatter') {
    if (resultObj.milk === 'yes' || resultObj.milk === 'nomatter') {
      if (resultObj.sugar === 'yes' || resultObj.sugar === 'nomatter') {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '블론드 바닐라 더블샷 마끼야또';
        } 
        else {
          return resultBeverage = '돌체 라떼';
        }
      } 
      else {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '스타벅스 더블샷';
        } 
        else {
          return resultBeverage = '바닐라 크림 콜드 브루';
        }
      }
    } 
    else {
      if (resultObj.sugar === 'yes' || resultObj.sugar === 'nomatter') {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '콜드 브루 플로트'; // 온도 예외사항
        } 
        else {
          return resultBeverage = '더블 에스프레소칩 프라프치노'; // 예외사항 필
        }
      } 
      else {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '콜드 브루';
        } 
        else {
          return resultBeverage = '오늘의 커피';
        }
      }
    }
  }

  else {
    if (resultObj.milk === 'yes' || resultObj.milk === 'nomatter') {
      if (resultObj.sugar === 'yes' || resultObj.sugar === 'nomatter') {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '화이트 딸기 크림 프라푸치노';
        } 
        else {
          return resultBeverage = '허니 얼 그레이 밀크티';
        }
      } 
      else {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '딸기 요거트';
        } 
        else {
          return resultBeverage = '제주 유기농 말차로 만든 라떼';
        }
      }
    } 
    else {
      if (resultObj.sugar === 'yes' || resultObj.sugar === 'nomatter') {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '자몽 허니 블랙티'; 
        } 
        else {
          return resultBeverage = '자바 칩 프라푸치노'; 
        }
      } 
      else {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '망고 바나나 블렌디드';
        } 
        else {
          return resultBeverage = '제주 유기 녹차';
        }
      }
    }
  }
}

// 결과값 표시
function showName() {
  const resultUserName = document.querySelector('.result_user_name')
  nameText += nameInput.value;

  if(nameText === '') {
    resultUserName.innerHTML = '익명';
  } else {
    resultUserName.innerHTML = nameText;
  }
}

function showResultImgAndDesc() {
  const resultImg = document.querySelector('.result_img')
  const resultDesc = document.querySelector('.result_desc')
  let imgSrc = '';
  let imgAlt = '';
  let description = '';

  switch (resultBeverage) {
    case '블론드 바닐라 더블샷 마끼야또':
      imgSrc = './img/starbucks/blond_ice.jpg';
      imgAlt = '블론드 바닐라 더블샷 마끼야또';
      description = '블론드 에스프레소 2샷에 흑당 시럽과 바닐라 크림이 부드럽고 달콤하게 어우러진 마키아또 타입의 음료.'
      break;

    case '돌체 라떼':
      imgSrc = './img/starbucks/dolce_ice.jpg';
      imgAlt = '돌체 라떼'
      description = '깊은 에스프레소와 깔끔한 무지방 우유가 어우러진 달콤한 음료.';
      break;
      
    case '스타벅스 더블샷':
      imgSrc = './img/starbucks/double_shot.jpg';
      imgAlt = '스타벅스 더블샷'
      description = '신선하게 제조된 더블 샷 믹스에 클래식 시럽을 넣고 에스프레소 샷, 얼음이 어우러져 핸드 쉐이킹한 음료.';
      break;

    case '바닐라 크림 콜드 브루':
      imgSrc = './img/starbucks/vanilla_coldbrew.jpg';
      imgAlt = '바닐라 크림 콜드 브루'
      description = '콜드 브루에 더해진 바닐라 크림으로 깔끔하면서 달콤한 콜드 브루를 새롭게 즐길 수 있는 음료.';
      break;

    case '콜드 브루 플로트':
      imgSrc = './img/starbucks/float.jpg';
      imgAlt = '콜드 브루 플로트'
      description = '[리저브 전용음료] 리저브 콜드 브루 위에 녹아 내리는 한 스쿱의 바닐라 아이스크림.';
      break;

    case '더블 에스프레소칩 프라프치노':
      imgSrc = './img/starbucks/double_espresso.jpg';
      imgAlt = '더블 에스프레소칩 프라프치노'
      description = '리스트레토 에스프레소 2샷과 에스프레소 칩, 하프앤하프가 달고 진하게 어우러진 커피의 기본에 충실한 더블 에스프레소 칩 프라푸치노.';
      break;

    case '콜드 브루':
      imgSrc = './img/starbucks/cold_brew.jpg';
      imgAlt = '콜드 브루'
      description = '콜드 브루 전용 원두를 차가운 물로 14시간 동안 추출하여 한정된 양만 제공됩니다. 깊은 풍미의 새로운 커피 경험을 즐겨보세요.';
      break;

    case '오늘의 커피':
      imgSrc = './img/starbucks/todays_coffee_ice.jpg';
      imgAlt = '오늘의 커피'
      description = '신선하게 브루드(Brewed)되어 원두의 다양함이 살아있는 커피.';
      break;

    case '화이트 딸기 크림 프라푸치노':
      imgSrc = './img/starbucks/white_strawberry_cream.jpg';
      imgAlt = '화이트 딸기 크림 프라푸치노'
      description = '딸기에 눈이 소복이 쌓인 것 같은 비주얼에 풍부한 딸기 맛을 가볍게 즐길 수 있는 누구나 좋아하는 딸기 음료. 바닐라 크림 베이스로 더욱 깊은 딸기의 맛과 풍미를 즐겨보세요.';
      break;

    case '허니 얼 그레이 밀크티':
      imgSrc = './img/starbucks/honey_earl_grey_hot.jpg';
      imgAlt = '허니 얼 그레이 밀크티'
      description = '베로가못 향 가득한 진한 티바나 얼 그레이 티에 꿀이 더해져 달콤하고 부드러운 밀크 티.';
      break;

    case '딸기 요거트':
      imgSrc = './img/starbucks/yogurt.jpg';
      imgAlt = '딸기 요거트'
      description = '딸기와 요거트의 상큼함이 가득 느껴지는 가벼운 컨셉의 블렌디드 음료.';
      break;

    case '제주 유기농 말차로 만든 라떼':
      imgSrc = './img/starbucks/jeju_ice.jpg';
      imgAlt = '제주 유기농 말차로 만든 라떼'
      description = '차광재배한 어린 녹찻잎을 곱게 간 제주 유기농 말차를 사용하였습니다. 깊고 진한 말차 본연의 맛과 향을 시원하고 부드럽게 즐길 수 있는 제주 유기농 말차로 만든 라떼를 만나보세요.';
      break;

    case '자몽 허니 블랙티':
      imgSrc = './img/starbucks/honey_black_ice.jpg';
      imgAlt = '자몽 허니 블랙티'
      description = '새콤달콤한 자몽과 꿀이 깊고 그윽한 풍미의 스타벅스 티바나의 블랙 티와 만났습니다. 화려한 색감과 톡 쏘는 상큼함이 더해진 스타벅스의 새로운 티 음료.';
      break;

    case '자바 칩 프라푸치노':
      imgSrc = './img/starbucks/javachip.jpg';
      imgAlt = '자바 칩 프라푸치노'
      description = '커피 프라푸치노에 초콜릿, 초콜릿 칩이 첨가된 아이스 블렌드로 달콤 아삭한 음료.';
      break;

    case '망고 바나나 블렌디드':
      imgSrc = './img/starbucks/mango.jpg';
      imgAlt = '망고 바나나 블렌디드'
      description = '[Grande Only] 인기 음료인 망고 패션후르츠 블렌디드에 신선한 바나나 1개가 통째로 들어간 달콤한 프라푸치노.';
      break;

    case '제주 유기 녹차':
      imgSrc = './img/starbucks/green_tea_hot.jpg';
      imgAlt = '제주 유기 녹차'
      description = '우수한 품질의 제주도 산 유기 녹차로만 이루어져 맑은 수색과 신선한 향, 맛이 뛰어난 녹차.';
      break;

    default:
      console.log('no-img');
  }

  resultImg.setAttribute('src', imgSrc);
  resultImg.setAttribute('alt', imgAlt);
  resultDesc.innerText = description;
}


function showResultBeverage() {
  const resultP = document.querySelector('.beverage_result');
  resultP.innerHTML = resultBeverage;
}

function showResultPage() {
  const resultPage = document.querySelector('.result_page');
  resultPage.style.display = 'block';

  // 결과값 보여주기 
  choiceBeverage();
  showResultBeverage();
  showName();
  showResultImgAndDesc();
}

// Hide QSlide
function hideQSlidePage() {
  qSlide.style.display = 'none';
  showResultPage();
}





// Click Event Delegation
qSlide.addEventListener('click',onClickQSlide);

function onClickQSlide(e) {
  // prev
  if (e.target.matches('.back_btn')) {
    prevQItems();
    gaugingBar();
  }

  // btn 클릭시 next
  if (e.target.matches('.btn')) {
    nextQItems();
    findIdx();
  }

  // 로고 클릭시
  if(e.target.matches('.starbucks_logo')) {
    nextQItems();
    findIdx();
    choiceBrand('Starbucks');
  }

  // 객체에 key:value 값 입력하기
  if(e.target.matches('.q_btn')) {
    recordResult(e);
    gaugingBar();
  }
}


// 첫화면 로딩
function firstPageLoad() {
  goToQIdx(0);
}
window.onload = firstPageLoad;



// Test URL share btn
const urlShareBtn = document.querySelector('.share_btn');
urlShareBtn.addEventListener('click', () => {
  let textArea = document.createElement('textarea');
  document.body.appendChild(textArea);
  textArea.value = document.location.href; // 현재 URL을 세팅

  textArea.select();  // 해당 값이 선택되도록 select() 합니다
  document.execCommand('copy'); // 클립보드에 복사합니다.
  document.body.removeChild(textArea);

  alert("URL이 클립보드에 복사되었습니다"); 
})

