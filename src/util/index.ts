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
/**
 * @returns {}
 * -
 */
//!------------
/**
 * @returns {}
 * -
 */
//!------------
/**
 * @returns {}
 * -
 */
//!------------
/**
 * @returns {}
 * -
 */
//!------------
/**
 * @returns {}
 * -
 */
//!------------
/**
 * @returns {}
 * -
 */
//!------------
/**
 * @returns {}
 * -
 */
//!------------
/**
 * @returns {}
 * -
 */
