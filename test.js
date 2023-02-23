const todoInput = document.getElementById('todoInput');
const todoList = document.querySelector('.todo_list');


// localStorage에 "TODOS" 키 값이 있으면 todos에 넣어주고 없으면 빈 배열로 todos 생성
// || [] ; 가 없으면 처음에 빈 배열일 경우 오류 발생함
let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];

function listAllCheck(todoId,todoChecked,todoListBox, checkBox){
    const checkboxes = document.getElementsByName('check');
    // 로컬스토리지에 체크 저장하기
    toDos.map((toDo)=> {
        toDo.status = todoChecked;
        if (toDo.id == todoId) {
            toDo.status = todoChecked;
        }
    });
    // 화면에서 체크해주기
    checkboxes.forEach((checkbox) => {
    checkbox.checked = todoChecked;
    if (checkbox.checked) {
        // todo의 체크 상태가 true이면 input checkbox를 체크된 상태로 설정
        checkBox.setAttribute("checked", true);
        todoListBox.classList.add('active_check');
        todoListBox.classList.remove('none_check');
    }
    else{
        todoListBox.classList.add('none_check');
        todoListBox.classList.remove('active_check');
    }
    });

    localStorage.setItem("TODOS", JSON.stringify(toDos))
}
function listChange(todoId, todoInputValue){
    console.log("ggg")
    toDos.map((toDo) => {
        if(toDo.id == todoId)
        toDo.value = todoInputValue
    })
    localStorage.setItem("TODOS", JSON.stringify(toDos))
}
function listClearBtn(){ 
        // 체크가 되지 않은 것만 새로운 배열에 담음
        // 여기서 왜 map안되는지?
        // let newTodo = [];
        // toDos.map((toDo)=>{
        //     if(toDo.status === false){
        //         newTodo.push(toDo);
        //     }
        // });

        const newTodo = toDos.filter((toDo) => toDo.status === false );
        // 헷갈리지 말 것! forEach는 기존 배열을 순회하며 반복 실행
        toDos.forEach((toDo)=>{
            // 체크 된 상태인 list 화면에서 지워주기
            if(toDo.status){
                const todoListElement = document.getElementById(toDo.id);
                todoListElement.remove();
            }
        });

        // 배열 업데이트
        toDos = newTodo;
        localStorage.setItem("TODOS", JSON.stringify(newTodo));

        const listCount = document.querySelector('.list_count');
        listCount.innerText = `${toDos.length} items left`;
}
function listCheckBtn(type) {
    const allBtn = document.getElementById('All')
    const activeBtn = document.getElementById('Active')
    const comBtn = document.getElementById('Completed')
    const listCount = document.querySelector('.list_count');
    const BUTTON_ACTIVE = 'button_active'
    const nameNone = document.querySelectorAll('.none_check'); // 체크되지 않은것
    const nameActive = document.querySelectorAll('.active_check'); // 체크된것

    let todoArr = [];

    allBtn.classList.remove(BUTTON_ACTIVE);
    activeBtn.classList.remove(BUTTON_ACTIVE);
    comBtn.classList.remove(BUTTON_ACTIVE);
    if (type == "All") {
        allBtn.classList.add(BUTTON_ACTIVE);
    } else if (type == "Active") {
        activeBtn.classList.add(BUTTON_ACTIVE);
        document.getElementById('allCheckBox').checked = false;
    } else if (type == "Completed") {
        comBtn.classList.add(BUTTON_ACTIVE);
        document.getElementById('allCheckBox').checked = true;
    }
    todoArr = type == "All" ? toDos : toDos.filter((toDo) => { 
        if(type == "Completed") { 
            return toDo.status === true 
        } else if(type == "Active"){
            return toDo.status === false
        }});
        
    for ( let i = 0; i < nameNone.length; i++ ) {
        if(type == "All" || type == "Active") nameNone[i].style.display = 'flex';
        if (type == "Completed") nameNone[i].style.display = 'none';
    }
    for ( let i = 0; i < nameActive.length; i++ ) {
        if(type == "Active")  nameActive[i].style.display = 'none';
        if (type == "All" || type == "Completed") nameActive[i].style.display = 'flex';
    }
    listCount.innerText = `${todoArr.length} items left`;

}
function delTodo(e) {
    console.log('ggg')
    // 화면에서 지워주는 작업
    const todoDel = e.target.parentNode;
    todoDel.remove();
    // 헷갈리지 말 것!! todoDel 는 list_box를 의미함!

    // 로컬스토리지에서 지워주는 작업
    /* 
    filter 쓸 때 주의사항 !!!!! 
    중괄호 > return 써줘야함 , 안쓰면 자동 return! 
    */
    const newTodos = toDos.filter((toDo) =>
        // 현재 내가 클릭한 부모(list_box)의 id와 toDo.id(list_box)가 다른 것만 산출
        parseInt(todoDel.id) !== toDo.id
    )
    toDos = newTodos;

    const listCount = document.querySelector('.list_count');
    listCount.innerText = `${toDos.length} items left`;
    localStorage.setItem('TODOS', JSON.stringify(newTodos));

};
function addTodo() {
    if (todoInput.value.length > 0) {
        const todoId = Math.floor(Math.random() * 999999);
        let todoChecked = false;
        // toDos 배열에 값 넣어주기
        toDos.push({
            value: todoInput.value,
            id: todoId,
            status: todoChecked
        })
        // 로컬스토리지에 toDos 배열 문자열로 넣어주기
        localStorage.setItem('TODOS', JSON.stringify(toDos));
        paintTodo(todoInput.value, todoId, todoChecked);
    }
    todoInput.value = "";
}
function getTodo() {
    // 리스트가 하나라도 있으면 isChecked를 true로 바꿔준다.
    //  처음부터 true이면 allcheckBox가 처음부터 true이기 때문!
    let isChecked = toDos.length >0 ? true : false;
    toDos.forEach((toDo) => {
        if (toDo.value !== null) {
            paintTodo(toDo.value, toDo.id, toDo.status);
        }
        // 반복했을 때 하나라도 false가 있으면 isChecked를 false 로 바꿔주기
        if(toDo.status === false){
            isChecked = false;
        }
    })
    if(isChecked){
        document.getElementById('allCheckBox').checked = isChecked;
    }
}
function paintTodo(todoInputValue, todoId, todoChecked) {
    // 화면에 요소 그려주기
    const todoListBox = document.createElement('div');
    todoListBox.setAttribute('class', 'list_box');
    todoListBox.setAttribute('id', todoId);

    todoListBox.addEventListener('dblclick', function(e){
        e.target.disabled=false;
    });

    const checkBox = document.createElement('input');
    checkBox.setAttribute('class', 'check_box');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('name', 'check');
    checkBox.setAttribute('id', todoId);

    const allCheckBtn = document.getElementById('allCheckBox');
    allCheckBtn.addEventListener('click',function(e){
        listAllCheck(todoId, e.target.checked, todoListBox, checkBox);
        if (e.target.checked) {
            ListName.classList.add('name_active');
        } else {
            ListName.classList.remove('name_active');
        } 
    })


    if (todoChecked) {
        // todo의 체크 상태가 true이면 input checkbox를 체크된 상태로 설정
        checkBox.setAttribute("checked", true);
        todoListBox.classList.add('active_check');
        todoListBox.classList.remove('none_check');
    }
    else{
        todoListBox.classList.add('none_check');
        todoListBox.classList.remove('active_check');
    }
    // 체크박스 클릭 시 함수 실행
    checkBox.addEventListener('click', function (e) {
        // toDos 배열 돌면서 체크된 것만 고르기
        toDos.map((toDo) => {
            // todo의 id가 체크 박스를 클릭한 todo의 id랑 같은걸 찾음
            if (toDo.id == todoId) {
                toDo.status = e.target.checked;
            }
        });
        localStorage.setItem("TODOS", JSON.stringify(toDos));
        console.log("🚀 ~ file: test.js:212 ~ e.target.checked", e.target.checked);
        if (e.target.checked) {
            ListName.classList.add('name_active');
            todoListBox.classList.add('active_check');
            todoListBox.classList.remove('none_check');
        } else {
            ListName.classList.remove('name_active');
            todoListBox.classList.add('none_check');
            todoListBox.classList.remove('active_check');
        } 
    });


    const ListName = document.createElement('input');
    ListName.setAttribute('type', 'text')
    ListName.setAttribute('class', `list_name ${todoId}`);
    ListName.setAttribute('id', todoId);
    ListName.value = todoInputValue;
    ListName.disabled = true;   
    // 만약 체크박스가 체크되어 있다면, ListName에 밑줄 그어주기
    if (todoChecked) {
        ListName.setAttribute("class", `list_name name_active ${todoId}`);
    } else {
        // todo 상태가 false이면 밑줄을 지우기 위해 name_active class를 지워줌
        ListName.setAttribute("class", `list_name ${todoId}`);
    }
    ListName.addEventListener('blur', (e)=>{
        listChange(todoId, e.target.value)
    })

    const ListDel = document.createElement('button');
    ListDel.setAttribute('type', 'button')
    ListDel.innerText = "❌";
    ListDel.addEventListener('click', delTodo)

    const listCount = document.querySelector('.list_count');
    listCount.innerText = `${toDos.length} items left`;

    todoList.appendChild(todoListBox);
    todoListBox.appendChild(checkBox);
    todoListBox.appendChild(ListName);
    todoListBox.appendChild(ListDel);
}

getTodo();