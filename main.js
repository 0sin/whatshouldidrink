'use strict';

// 변수선언
const qSlide = document.querySelector('.q_slide');
const qItems = document.querySelector('.q_items');
const qItem = document.querySelectorAll('.q_item');
const qList = document.querySelectorAll('.q_list');

const btn = document.querySelectorAll('.btn');
const resultObj = {};
let lastPage3secDisplay = undefined;


// q_slide 각 item 인덱스 번호 알아야함.
let qIdx = 0;

// idx 파악
function goToQIdx(x) {
  let itemWidth = qItem[qIdx].clientWidth;
  qIdx += x;

  if(qIdx < 0) {
    qIdx = 0;
  } else if (qIdx === qItem.length - 1) {
    qIdx = qItem.length - 1;
    console.log("last")
    // 애니메이션 실행
    
  }
  qItems.style.transform = `translateX(${-(itemWidth) * qIdx}px)`;
}

goToQIdx(0);

// btn 클릭시 q_slide next 이동
function nextQItems() {
  goToQIdx(1);
}


// 뒤로가기 클릭시 q_slide prev 이동
function prevQItems() {
  goToQIdx(-1);
}



// index = 0;
// 첫화면 로드시 text fade in
// 시작하가 클릭하면 next
qSlide.addEventListener('click',onClickQSlide);

function onClickQSlide(e) {
  // console.log(e.target.nodeName)
  // prev
  if (e.target.matches('.back_btn')) {
    prevQItems();
  }

  // btn 클릭시 next
  if (e.target.matches('.btn')) {
    nextQItems();
    findIdx();
    console.log('클릭')
  }

  // 로고 클릭시
  if(e.target.matches('.starbucks_logo')) {
    nextQItems();
    findIdx();
  }


  // 객체에 값 넣기
  if(e.target.matches('.q_btn')) {
    const key = e.target.dataset.key;
    const value = e.target.dataset.value;

    resultObj[key] = value;
    console.log(resultObj);
  }
}



// Question Page Event
function findIdx() {
  
  // if (qIdx === 2) {
  //   const nameInput = document.querySelector('.name_input');
  //   // const nameInput = document.querySelector('.name_input');
  //   // nameInput.focus();
  //   if(nameInput.value) {
  //     // console.log(qIdx + "찾음");
      
  //   }
  //   return;
  // }

  if (qIdx === qItem.length - 1) {
    // q_slide 끄고 결과창 보여주기
    lastPage3secDisplay = setTimeout(hideQSlidePage, 3000);
    
  }
}







// index = 1;
// 브랜드 로고 클릭하면 넥스트로 넘어가기
// 넘어가면서 브랜드에 따라 아래 카피 이름 변경

// index = 2;
// 인풋에 자동 포커스
// 값이 없는데 엔터 누르면 경고창 띄우기
// 엔터 눌러도 슬라이드 넘어가게 하기
// 값이 적히면 확인 버튼 뜨기



// 공통사항
// 1. 텍스트 fade in
// 2. 프로그레션 바 생성, 퍼센테이지 차기

// index = 3~10;
// 버튼 누르면 스타일 변경
// 버튼 세개중에 하나에만 스타일 적용될 수 있도록 하기




// 결과값 전달하기
let resultBeverage = '';
function choiceBeverage() {
  if(resultObj.caffein === 'caffein' || resultObj.caffein === 'nomatter') {
    if (resultObj.milk === 'yes' || resultObj.milk === 'nomatter') {
      if (resultObj.sugar === 'yes' || resultObj.sugar === 'nomatter') {
        if (resultObj.citrus === 'yes' || resultObj.citrus === 'nomatter') {
          return resultBeverage = '블론드 바닐라 더블샷';
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
          return resultBeverage = '바닐라크림 콜드브루';
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




// 결과창 띄우기


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
  console.log('결과 실행')
}

function hideQSlidePage() {
  qSlide.style.display = 'none';
  showResultPage();
}

