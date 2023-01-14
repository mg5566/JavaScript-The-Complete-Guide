// GET 요청을 위한 비동기 함수
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();  // asynchronous

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 서버 응답을 콘솔에 출력합니다.
        resolve(JSON.parse(xhr.response));
      } else {
        reject(`${xhr.status} ${xhr.statusText}`);
      }
    };
  });
};

// callback 를 사용
const res = promiseGet('http://jsonplaceholder.typicode.com/posts/1');

console.dir(res);