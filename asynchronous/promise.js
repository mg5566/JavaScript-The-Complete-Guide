// GET 요청을 위한 비동기 함수
const get = (url, successCallback, failureCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();  // asynchronous

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버 응답을 콘솔에 출력합니다.
      successCallback(JSON.parse(xhr.response));
    } else {
      failureCallback(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

// callback 를 사용
// get('http://jsonplaceholder.typicode.com/posts/1', console.log, console.error);
/**
 * Uncaught SyntaxError: Unexpected end of JSON input
 *
 * 위 error 가 발생하는데, JSON 에 대한 깊은 이해가 없어서 어떤 문제인지 모르겟음.
 * deSerialization 을 해야하는데, JSON 이 아닌가봄...
 */
const url = 'http://jsonplaceholder.typicode.com';
get(`${url}/posts/1`, ({ userId }) => {
  console.log(`user id: ${userId}`);
  get(`${url}/users/${userId}`, (userInfo) => console.log(userInfo))
}, console.error);