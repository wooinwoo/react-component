// import moment from "moment"

import { json } from 'react-router-dom';

//!------------
/**
 * @param {string[]} keys
 * @returns {string | null}
 * - 특정 키값의 파라메터를 가져오는 함수
 */
function getParams(keys: string[]): (string | null)[] {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const returnParamData = [];

  for (let i = 0; i < keys.length; i++) {
    returnParamData?.push(params.get(keys[i]));
  }

  return returnParamData;
}

//!------------
/**
 * @param {string[]} keys
 * @returns {string}
 * - 특정 키값의 파라메터를 제외한 쿼리스트링을 가져오는 함수
 */
function deleteParamsQueryString(keys: string[]): string | undefined {
  if (keys.length < 1) return;

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  for (let i = 0; i < keys.length; i++) {
    params?.delete(keys[i]);
  }
}

//!------------
/**
 *  @returns {boolean} true: mobile, false: pc
 * - 모바일 여부 확인
 */
function isMobile(): boolean {
  return Boolean(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
}

//!------------
/**
 * @return {boolean} true: ios, false: not ios
 * - ios 여부 확인
 */
function isIos(): boolean {
  return Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));
}

//!------------
/**
 * @returns {boolean}
 * - 현재 브라우저의 온/오프라인 상태 여부 확인
 */
function inOnline(): boolean {
  return navigator.onLine;
}

//!------------
/**
 * @returns {number}
 * - 현재 thread 수 확인
 */
function howManyThread(): number {
  return navigator.hardwareConcurrency;
}

//!------------
/**
 * @returns {string} 'ko-KR' 등등
 * - 언어 종류 확인
 */
function whatLanguage(): string {
  return navigator.language;
}

//!------------
/**
 * @returns {string} desktop(pc), portrait(세로), landscape(가로)
 * - 기기 가로세로 확인
 */
function whatOrientation(): string {
  return !navigator.maxTouchPoints ? 'desktop' : !window.orientation ? 'portrait' : 'landscape';
}

//!------------
/**
 * @param {string} key
 * @param {any} value
 * - 로컬스토리지에 데이터 저장
 */
function saveToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

//!------------
/**
 * @param {string} key
 * @returns {any}
 * - 로컬스토리지 데이터 가져오기
 */
function getFromLocalStorage(key: string): any {
  const value = localStorage.getItem(key);
  return JSON.parse(value ?? '');
}

//!------------
/**
 * @param {string} key
 * @param {any} newValue
 * - 로컬스토리지 업데이트하기
 */
function updateLocalStorage(key: string, newValue: any): void {
  const currentValue = getFromLocalStorage(key);
  if (currentValue !== null) {
    saveToLocalStorage(key, newValue);
  }
}

//!------------
/**
 * @param {string} key
 * - 로컬스토리지 삭제하기
 */
function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

//!------------
/**
 * @param {string} key
 * @param {any} value
 * - 세션스토리지에 데이터 저장
 */
function saveToSessionStorage(key: string, value: any): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

//!------------
/**
 * @param {string} key
 * @returns {any}
 * - 세션스토리지 데이터 가져오기
 */
function getFromSessionStorage(key: string): any {
  const value = sessionStorage.getItem(key);
  return JSON.parse(value ?? '');
}

//!------------
/**
 * @param {string} key
 * @param {any} newValue
 * - 세션스토리지 업데이트하기
 */
function updateSessionStorage(key: string, newValue: any): void {
  const currentValue = getFromSessionStorage(key);
  if (currentValue !== null) {
    saveToSessionStorage(key, newValue);
  }
}

//!------------
/**
 * @param {string} key
 * - 세션스토리지 삭제하기
 */
function removeFromSessionStorage(key: string): void {
  sessionStorage.removeItem(key);
}

//!------------
/**
 * @param {string} name
 * @param {string | number | boolean} value
 * @param {number} days
 * - 쿠키 저장하기
 */
function setCookie(name: string, value: string | number | boolean, days: number): void {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

//!------------
/**
 * @param {string} name
 * @returns {string | null}
 * - 쿠키 가져오기
 */
function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

//!------------
/**
 * @param {string} id
 * @returns {} clientHeight: number, offsetHeight: number, scrollHeight: number
 * 요소의 높이 가져오기
 * - clientHeight 는 요소의 내부 높이입니다. 패딩 값은 포함되며, 스크롤바, 테두리, 마진은 제외됩니다.
 * - offsetHeight 는 요소의 높이입니다. 패딩, 스크롤 바, 테두리(Border)가 포함됩니다. 마진은 제외됩니다.
 * - scrollHeight  는 요소에 들어있는 컨텐츠의 전체 높이입니다. 패딩과 테두리가 포함됩니다. 마진은 제외됩니다.
 */
function getElementSizeById(id: string): {
  clientHeight: number | undefined;
  offsetHeight: number | undefined;
  scrollHeight: number | undefined;
} {
  const element = document.getElementById(id);
  const clientHeight = element?.clientHeight;
  const offsetHeight = element?.offsetHeight;
  const scrollHeight = element?.scrollHeight;

  return { clientHeight, offsetHeight, scrollHeight };
}

//!------------
/**
 * @param {string} key
 * @returns {Promise<string>}
 * - 헤더 반환
 * - alt-svc
 * - cache-control
 * - cf-cache-status
 * - cf-ray
 * - content-encoding
 * - content-type
 * - cross-origin-opener-policy
 * - date
 * - referrer-policy
 * - server
 * - strict-transport-security
 * - x-client-source
 * - x-powered-by
 * - x-robots-tag
 */
async function getHeaderData(key: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.href);
    xhr.onload = function () {
      const headers = xhr.getAllResponseHeaders();
      const headerLines = headers.split('\r\n');
      for (let i = 0; i < headerLines.length; i++) {
        const line = headerLines[i];
        if (line.startsWith(key)) {
          const value = line.substring(key.length + 2);
          resolve(value);
          return;
        }
      }
      resolve(null);
    };
    xhr.send();
  });
}

//!------------
/**
 * @param {string} url
 * @returns void
 * - 원하는 url으로 페이지 이동
 */
function movePage(url: string): void {
  if (!url || url.length < 1) return;
  window.location.href = url;
}

//!------------
/**
 * @param {string} length
 * @returns {string}
 * - 랜덤문자열 생성
 */
function generateRandomString(length: number) {
  const charecters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charecters.length);
    randomString += charecters.charAt(randomIndex);
  }
  return randomString;
}

//!------------
/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * - 랜덤 숫자 반환
 */
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//!------------
/**
 * @param {any} callback
 * @param {number} delay
 * - 함수 지연 실행
 */
async function delayExecution(callback: any, delay: number) {
  const timerId = setTimeout(() => {
    try {
      callback();
    } catch (error) {
      console.log('#(delayExecution: ', error);
    }
    clearTimeout(timerId);
  }, delay);
}

//!------------
/**
 * @param {any} callback
 * @param {number} interval
 * - 함수 주기 실행
 */
async function periodicExcution(callback: any, interval: number) {
  const timerId = setInterval(() => {
    try {
      callback();
    } catch (error) {
      console.log('#(periodicExcution: ', error);
    }
  });

  return function stopExcution() {
    clearInterval(timerId);
  };
}

//!------------
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
/**
 * @returns {}
 * - 캘린더
 */
function generateCalendar() {
  // 이번달 첫날과 마지막날 요일 구하기
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0:일, 1:월, 2:화, 3:수...
  const lastDayOfWeek = new Date(currentYear, currentMonth + 1, 0).getDay(); // 0:일, 1:월, 2:화, 3:수...

  const calendarWeeks =
    (firstDayOfWeek === 6 && (lastDayOfWeek === 1 || lastDayOfWeek === 0)) ||
    (firstDayOfWeek === 5 && lastDayOfWeek === 0)
      ? 6
      : 5;

  const calendar = [];
  let date = 1;
  // 달력 객체 생성
  for (let i = 0; i < calendarWeeks; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfWeek) {
        // 이번달 시작일 이전의 셀은 비어있음
        week.push('');
      } else if (i === calendarWeeks - 1 && lastDayOfWeek < j) {
        //이번달 마지막일 이후의 셀은 비어있음
      } else {
        // 이번달 날짜의 셀을 생성
        week.push(date);
        date++;
      }
    }
    calendar.push(week);
  }
  return calendar;
}
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
}
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
}

//!------------
/**
 * @param value
 * @returns
 * - empty 확인
 */
const isEmpty = (value: any) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true;
  } else {
    return false;
  }
};

//!------------
/**
 * @returns {}
 * -재귀 스크립트
 */
//!------------
/**
 * @param {string} date
 * @returns {string}
 * - 년/월/일 포맷
 */
function formatDateToSlash(date: string) {
  if (!date) return;
  if (date.length === 8) {
    const regexPattern = /(\d{4})(\d{2})(\d{2})/;
    return date.replace(regexPattern, '$1/$2/$3');
  }
  if (date.length === 16) {
    const regexPattern = /(\d{4})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/;
    return date.replace(regexPattern, '$1/$2/$3 ~ $4/$5/$6');
  } else if (date.length === 24) {
    const regexPattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/;
    return date.replace(regexPattern, '$1/$2/$3 $4:$5 ~ $6/$7/$8 $9:$10');
  } else {
    return '';
  }
}
//!------------
/**
 * @param {number} number
 * @returns {string}
 * - 숫자를 한글로 변환
 */
function geKoreanNumber(number: number) {
  const koreanNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const tenUnit = ['', '십', '백', '천'];
  const tenThousandUnit = ['조', '억', '만', ''];
  const unit = 10000;

  let answer = '';

  while (number > 0) {
    const mod = number % unit;
    const modToArray = mod.toString().split('');
    const length = modToArray.length - 1;

    const modToKorean = modToArray.reduce((acc, value, index) => {
      const valueToNumber = +value;
      if (!valueToNumber) return acc;
      // 단위가 십 이상인 '일'글자는 출력하지 않는다. ex) 일십 -> 십
      const numberToKorean = index < length && valueToNumber === 1 ? '' : koreanNumber[valueToNumber];
      return `${acc}${numberToKorean}${tenUnit[length - index]}`;
    }, '');

    answer = `${modToKorean}${tenThousandUnit.pop()} ${answer}`;
    number = Math.floor(number / unit);
  }

  return answer.replace();
}
//!------------
/**
 * @param {string} text
 * @returns {}
 * - 휴대폰 번호 포맷
 */
function formatPhoneNumber(text?: string) {
  const phone = text ?? '';
  const formatedPhoneNumber = phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  return formatedPhoneNumber;
}
//!------------
/**
 * @param {string} text
 * @returns {}
 * - 회사 번호 포맷
 */
function formatBusinessNumber(text?: string | null) {
  if (!text) return;
  const isOnlyNumberCheck = text.replace(/[^0-9]/g, '');
  if (isOnlyNumberCheck.length < 1) return;
  return isOnlyNumberCheck.replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
}
//!------------
/**
 * @param {string} str
 * @param {boolean} newL
 * @returns {}
 * - 특수문자 치환 (string To HTML)
 */
function decodeHTMLEntities(str: string, newL: boolean = true) {
  if (str !== undefined && str !== null && str !== '') {
    const parser = new DOMParser();
    const dom = parser.parseFromString('<!doctype html><body>' + str, 'text/html');

    if (newL) {
      return dom.body.textContent?.replace(/\n/g, '<br>');
    } else {
      return dom.body.textContent?.replace('<br>', '');
    }
  }
}
//!------------
/**
 * @param {string} str
 * @param {number} rowLimit
 * @param {number} highLimit
 * @param {string} reType //"bool" | ""
 * @returns {string | boolean}
 * - 글자 수 제한
 * - string 출력 | 초과여부 출력 - retype="bool"
 */
function characterLimit(str: string, rowLimit: number, highLimit: number, reType: string) {
  if (rowLimit <= str.length && str.length <= highLimit) {
    return reType !== 'bool' ? str : true;
  }
  if (rowLimit <= str.length && srcery.length > highLimit) {
    return reType !== 'bool' ? str.substring(0, highLimit) : false;
  }
}
//!------------
/**
 * @param {string} str
 * @returns {string}
 * - 특수문자 제거 후 텍스트와 줄바꿈만 출력
 */
function extractCleanedText(str: string) {
  const cleanedText = str.replace(/&[^;]+;|<[^>]+>/g, '');
  const lines = cleanedText.split('\n');
  const nonEmptyLines = lines.filter((line) => line.trim());
  return nonEmptyLines;
}

export {
  getParams,
  deleteParamsQueryString,
  isMobile,
  isIos,
  inOnline,
  howManyThread,
  whatLanguage,
  whatOrientation,
  saveToLocalStorage,
  getFromLocalStorage,
  updateLocalStorage,
  removeFromLocalStorage,
  saveToSessionStorage,
  getFromSessionStorage,
  updateSessionStorage,
  removeFromSessionStorage,
  setCookie,
  getCookie,
  getElementSizeById,
  getHeaderData,
  movePage,
  generateRandomString,
  getRandomNumber,
  delayExecution,
  periodicExcution,
  generateCalendar,
  prevMonth,
  nextMonth,
  isEmpty,
  formatDateToSlash,
  geKoreanNumber,
  formatPhoneNumber,
  formatBusinessNumber,
  decodeHTMLEntities,
  characterLimit,
  extractCleanedText,
};
