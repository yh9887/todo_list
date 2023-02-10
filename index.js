const todoForm = document.querySelector('.wrap')
const todoInput = document.querySelector('#todoInput')
const todoBox = document.querySelector('.todo_box')
const TODOS_KEY ="todos"
const list_count = document.querySelector(".list_count")

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function todoAdd(event){
    event.preventDefault();
    const addTodo = todoInput.value;
    todoInput.value = "";

    const newTodoObj ={
        text:addTodo,
        id: Date.now()
    }
    toDos.push(newTodoObj);
    make_list(newTodoObj);
    saveToDos();
}

function make_list(whatTodo) {
    const list_box = document.createElement('div');
    list_box.setAttribute('class', 'list_box');
    list_box.id = whatTodo.id;

    const check_box = document.createElement('button');
    check_box.setAttribute('class', 'check_box');
    check_box.setAttribute('type', 'button');

    const list_name = document.createElement('div');
    list_name.setAttribute('class', 'list_name');
    list_name.innerText=whatTodo.text;
    
    const list_delete = document.createElement('button');
    list_delete.setAttribute('class', 'list_delete');
    list_delete.innerText="❌";
    
    
    todoBox.appendChild(list_box)
    list_box.appendChild(check_box)
    list_box.appendChild(list_name)
    list_box.appendChild(list_delete)

    check_box.addEventListener('click', btnChk(check_box, list_name))
    list_delete.addEventListener('click', btnDel)


}


function btnChk(check_box, list_name){
    check_box.addEventListener('click',function(){
        if(check_box.innerText == "✔️"){
            check_box.innerText=""
            list_name.classList.remove("name_active")
        }else if(check_box.innerText == ""){
            check_box.innerText="✔️"
            list_name.classList.add("name_active")
        }  
    })
}

function btnDel(event){
    const todoDelete = event.target.parentElement;
    todoDelete.remove();

    toDos = toDos.filter((toDo) => toDo.id !== parseInt(todoDelete.id));
    saveToDos();
}

todoForm.addEventListener('submit', todoAdd);

const saveTodoList = localStorage.getItem(TODOS_KEY)

if( saveTodoList !== null){
    const parsedToDos = JSON.parse(saveTodoList);
    toDos = parsedToDos;
    parsedToDos.forEach(make_list);
}