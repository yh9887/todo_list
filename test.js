const todoInput = document.getElementById('todoInput');
const todoList = document.getElementsByClassName('todo_list');

function addTodo(){
    console.log("@@@")
    // 화면에 요소 그려주기
    const todoListBox = document.createElement('div');
    todoListBox.setAttribute('class', 'list_box');
    
    const checkBox = document.createElement('input');
    checkBox.setAttribute('class', 'check_box');
    checkBox.setAttribute('type', 'checkbox');

    const ListName = document.createElement('input');
    ListName.setAttribute('class', 'list_name');
    ListName.setAttribute('type', 'text');

    const ListDel = document.createElement('button');
    ListDel.setAttribute('type', 'button')
    ListDel.innerText="❌";
    
    todoList.appendChild(todoListBox);
    todoListBox.appendChild(checkBox);
    todoListBox.appendChild(ListName);
    todoListBox.appendChild(ListDel);
}