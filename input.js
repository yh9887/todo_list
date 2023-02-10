const loginForm= document.querySelector('#login-form')
const loginInput = document.querySelector("#login-form input")
const greeting = document.querySelector('#greeting');

// 입력창을 display:none 시켜주는 클래스명을 변수에 저장
const HIDDEN_CLASSNAME = "hidden";

// username 이 아니라 tomato 여도 됨. 단순 key 이름일 뿐 값인 username 과 같다고 헷갈리지 말것!
const USERNAME_KEY = "username";


function onLoginSubmit(event){
    // 1. 브라우저의 기본 이벤트 막기 (submit)
    event.preventDefault();
    // 2. 입력창 display:none 해주기
    loginForm.classList.add(HIDDEN_CLASSNAME);
    
    // 3. 입력받은 값을 username 이라는 변수에 저장
    /*
        ?? 함수 안에 변수 지정해 놓은 이유 ??
        이벤트 리스너 처리때문. 
        최종으로 목표하는 것은 인풋에 텍스트를 입력하고 submit 버튼을 클릭했을 때
        그에 대한 값이 local storage에 저장되어 그것을 보는 것,
        만약 loginInput.value를 onLoginSubmit 함수 외부에서 선언하면 local storage에 저장을 못함.
    */
    const username = loginInput.value;

    localStorage.setItem(USERNAME_KEY, username);

    // paintGeetings(username);
    paintGeetings(username);
}

// 여기에서 username은 위 함수에서 정의된 변수가 아님. abc로 해도 됨.
function paintGeetings(username){
    greeting.innerText = `Hello ${username}!`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}


const saveUsername = localStorage.getItem(USERNAME_KEY)
// 이 구문 제일 먼저 실행됨.
if(saveUsername === null){
    // 폼을 보여주기 , hidden 클래스 지워주기
    loginForm.classList.remove(HIDDEN_CLASSNAME)
    // 입력 받은 후, onLoginSubmit 함수 실행
    loginForm.addEventListener('submit',onLoginSubmit)
}else{
    // (saveUsername)은 로컬스토리지에 있는 값 가져오기 위함
    paintGeetings(saveUsername)
}