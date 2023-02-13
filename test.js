const todoInput = document.getElementById('todoInput');
const todoList = document.querySelector('.todo_list');
// localStorage에 "TODOS" 키 값이 있으면 todos에 넣어주고 없으면 빈 배열로 todos 생성
// || [] ; 가 없으면 처음에 빈 배열일 경우 오류 발생함
let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];
function delTodo(e){
    const todoDel = e.target.parentNode;
    todoDel.remove();
    localStorage.setItem("TODOS", )
}
function addTodo() {
    if (todoInput.value.length > 0) {
        // toDos 배열에 값 넣어주기
        toDos.push({
            value:todoInput.value,
        })
        // 로컬스토리지에 toDos 배열 문자열로 넣어주기
        localStorage.setItem('TODOS', JSON.stringify(toDos));
        paintTodo(todoInput.value)
    
    }
    localStorage.setItem('TODOS', JSON.stringify(toDos));
    todoInput.value="";
}
function getTodo(){
    toDos.forEach((toDo)=>{
        if(toDo.value !==null){
            paintTodo(toDo.value)
        }
    })
}
function paintTodo(todoInputValue){
        // 화면에 요소 그려주기
        const todoListBox = document.createElement('div');
        todoListBox.setAttribute('class', 'list_box');

        const checkBox = document.createElement('input');
        checkBox.setAttribute('class', 'check_box');
        checkBox.setAttribute('type', 'checkbox');

        const ListName = document.createElement('div');
        ListName.setAttribute('class', 'list_name');
        ListName.innerHTML = todoInputValue;

        
        const ListDel = document.createElement('button');
        ListDel.setAttribute('type', 'button')
        ListDel.innerText = "❌";

        todoList.appendChild(todoListBox);
        todoListBox.appendChild(checkBox);
        todoListBox.appendChild(ListName);
        todoListBox.appendChild(ListDel);
}
getTodo();