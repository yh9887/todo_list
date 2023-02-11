
const todoInputBox = document.querySelector('.input_box button')

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];


function addTodo() {

    let inputValue = document.getElementById('todoInput').value;
    if (inputValue) {
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

        const listCount = document.querySelector('.list_count')
        listCount.innerText = `${toDos.length} items left`;
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

    const listCount = document.querySelector('.list_count')
    listCount.innerText = `${toDos.length} items left`;
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

    const listCount = document.querySelector('.list_count')
    listCount.innerText = `${toDos.length} items left`;
}

function countHandler(type) {
    const listCount = document.querySelector('.list_count')
    let todoArr = [];
    if (type == "All") {
        todoArr = toDos;
    } else if (type == "Active") {
        todoArr = toDos.filter((toDo) =>
            toDo.status == false)

    } else if (type == "Completed") {
        todoArr = toDos.filter((toDo) =>
            toDo.status == true)
    }
    listCount.innerText = `${todoArr.length} items left`;
}

function clearHandler() {
    // 체크되지 않은 것만 newTodos에 담김
    const newTodos = toDos.filter((toDo) => 
        toDo.status == false
    )
    // 모든 투두들을 반복문을 돌림
    // 화면에서 지우기
    toDos.forEach((toDo) => {
        // 체크된 투두이면 조건에 부합
        if (toDo.status) {
            // 체크된 투두 Element 가져와서 지움
            const todoElement = document.getElementById(toDo.id);
            todoElement.remove();
        }
    })
    // 체크되지 않은 투두들만 toDos에 담음
    // 배열 업데이트
    toDos = newTodos;
    // 로컬스토리지에 toDos key를 가지고 있는 값을 체크되지 않은 투두들로 변경
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
}

function allCheckHandler(){
    const allCheckBoxValue = document.getElementById("allCheckBox").checked;
    const newTodos = toDos.map((toDo)=>{
        console.log(toDo)
        toDo.status = allCheckBoxValue;
            document.getElementById(toDo.id).checked = allCheckBoxValue;
    })
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
    
}

todoInputBox.addEventListener('click', addTodo);
getTodo()