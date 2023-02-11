//1. 입력 후 엔터, 버튼 클릭 시 로컬스토리지 저장

const todoInputBox = document.querySelector('.input_box button')

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];


function addTodo() {
    let inputValue = document.getElementById('todoInput').value;
    if(inputValue){
    const rand = Math.floor(Math.random() * 999999);
    toDos.push({
        id: rand,
        value: inputValue,
        status: false
    });
    localStorage.setItem("TODOS", JSON.stringify(toDos));



    const todoBox = document.querySelector('.todo_box');

    const todoList = document.createElement('div');
    todoList.setAttribute('class', 'list_box');
    todoList.setAttribute('id', rand);

    const checkBox = document.createElement('button');
    checkBox.setAttribute('class', 'check_box');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.addEventListener('click', function (e) {
        toDos.map((toDo) => {
            if (toDo.id == rand) {
                toDo.status = e.target.checked;
            }
        })
        localStorage.setItem('TODOS', JSON.stringify(toDos))
        if (e.target.checked) {
            document.getElementsByClassName(rand)[0].className = `${rand} list_name name_active`;
        } else {
            document.getElementsByClassName(rand)[0].className = `${rand} list_name`;
        }

    })

    const ListName = document.createElement('div');
    ListName.setAttribute('class', `list_name ${rand}`);
    ListName.innerText = inputValue;

    const ListDel = document.createElement('button');
    ListDel.setAttribute('class', 'list_delete');
    ListDel.setAttribute('type', 'button');
    ListDel.innerText = "❌"
    ListDel.addEventListener('click', () => delTodo(rand));

    todoBox.appendChild(todoList);
    todoList.appendChild(checkBox);
    todoList.appendChild(ListName);
    todoList.appendChild(ListDel);
}
}

function delTodo(rand) {
    const newTodos = toDos.filter((toDo) => {
        return toDo.id !== rand
    })
    toDos = newTodos;
    const todoElement = document.getElementById(rand);
    todoElement.remove();
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
}

function getTodo() {

    toDos.forEach((toDo) => {

        const todoBox = document.querySelector('.todo_box');

        const todoList = document.createElement('div');
        todoList.setAttribute('class', 'list_box');
        todoList.setAttribute('id', toDo.id);

        const checkBox = document.createElement('input');
        checkBox.setAttribute('class', 'check_box');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id', toDo.id);

        if (toDo.status) {
            checkBox.setAttribute('checked', true);
        }


        checkBox.addEventListener('click', function (e) {
            toDos.map((toDo) => {
                if (toDo.id == e.target.id) {
                    toDo.status = e.target.checked;
                }
            })
            console.log("🚀 ~ file: test.js:93 ~ toDos.map ~ e.target.id", e.target.id)
            if (e.target.checked) {
                document.getElementsByClassName(e.target.id)[0].className = `${e.target.id} list_name name_active`;
            } else {
                document.getElementsByClassName(e.target.id)[0].className = `${e.target.id} list_name`;
            }
            localStorage.setItem('TODOS', JSON.stringify(toDos))

        })

        const ListName = document.createElement('div');
        ListName.innerText = toDo.value;
        if (toDo.status) {
            ListName.setAttribute('class', `list_name name_active ${toDo.id}`);
        } else {
            ListName.setAttribute('class', `list_name ${toDo.id}`);
        }
        const ListDel = document.createElement('button');
        ListDel.setAttribute('class', 'list_delete');
        ListDel.setAttribute('type', 'button');
        ListDel.innerText = "❌"
        ListDel.addEventListener('click', () => delTodo(toDo.id));

        todoBox.appendChild(todoList);
        todoList.appendChild(checkBox);
        todoList.appendChild(ListName);
        todoList.appendChild(ListDel);
        
    })
}

todoInputBox.addEventListener('click', addTodo);
getTodo()