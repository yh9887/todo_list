
const todoInputBox = document.querySelector('.input_box button')

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];


function addTodo() {

    // 리스트에 추가할 할일을 변수에 담아주기
    let inputValue = document.getElementById('todoInput').value;
    // 할일을 적었을 때 아래 코드 실행
    if (inputValue) {
        // 난수 생성
        const rand = Math.floor(Math.random() * 999999);
        // toDos 배열에 난수인 id, 할 일의 내용 value, 체크 여부를 확인할 수 있는 status를 배열에 넣어줌.
        toDos.push({
            id: rand,
            value: inputValue,
            status: false
        });
        // 로컬스토리지에 TODOS인 key에 toDos 배열을 문자열로 넣어줌
        localStorage.setItem("TODOS", JSON.stringify(toDos));
        // 아이템 생성
        const todoBox = document.querySelector('.todo_box');

        const todoList = document.createElement('div');
        todoList.setAttribute('class', 'list_box');
        todoList.setAttribute('id', rand);

        const checkBox = document.createElement('button');
        checkBox.setAttribute('class', 'check_box');
        checkBox.setAttribute('type', 'checkbox');
        // checkbox를 클릭하면 아래 함수 실행
        checkBox.addEventListener('click', function (e) {
            // toDos 배열을 순회하며 아래 코드 실행
            toDos.map((toDo) => {
                // toDo의 id가 rand이면 클릭한 toDo의 status 값을 checked 해준다.
                if (toDo.id == rand) {
                    toDo.status = e.target.checked;
                }
            })
            // 위 작업 후 다시 로컬스토리지에 넣어줌
            localStorage.setItem('TODOS', JSON.stringify(toDos))
            // 체크됐을 때 할일에 줄을 그어줌
            if (e.target.checked) {
                // classname이 rand인 클래스를 ${rand} list_name name_active로 변경해준다.
                document.getElementsByClassName(rand)[0].className = `${rand} list_name name_active`;
            } else {
                 // classname이 rand인 클래스를 ${rand} list_name으로 변경해준다.
                document.getElementsByClassName(rand)[0].className = `${rand} list_name`;
            }

        })

        const ListName = document.createElement('div');
        // div에 ist_name ${rand} 클래스를 추가해준다.
        ListName.setAttribute('class', `list_name ${rand}`);
        ListName.innerText = inputValue;

        const ListDel = document.createElement('button');
        ListDel.setAttribute('class', 'list_delete');
        ListDel.setAttribute('type', 'button');
        ListDel.innerText = "❌"
        // x버튼을 누르면 rand 매개변수를 넘겨받는 delTodo 함수 실행
        ListDel.addEventListener('click', () => delTodo(rand));

        todoBox.appendChild(todoList);
        todoList.appendChild(checkBox);
        todoList.appendChild(ListName);
        todoList.appendChild(ListDel);

        // toDos의 갯수만큼 listCount의 innerText에 넣어준다.
        const listCount = document.querySelector('.list_count')
        listCount.innerText = `${toDos.length} items left`;
    }

}

function delTodo(rand) {
    // toDos 배열을 순회하면서 아래 조건에 부합하는 요소를 모아 새로운 배열을 반환하고 그 배열을 newTodos라는 새로운 변수에 넣어준다.
    const newTodos = toDos.filter((toDo) => {
        // toDo id가 rand가 아닌 것. ????????????????
        return toDo.id !== rand
    })
    // toDos 배열에 새로운 배열이 담긴 newTodos를 넣어준다.
    toDos = newTodos;
    // id가 rand인 요소 잡기
    const todoElement = document.getElementById(rand);
    // id가 rand인 요소를 화면에서 지워줌
    todoElement.remove();
    // 로컬스토리지에 새로운 배열을 넣어줌
    localStorage.setItem("TODOS", JSON.stringify(newTodos));

    const listCount = document.querySelector('.list_count')
    listCount.innerText = `${toDos.length} items left`;
}

function getTodo() {

    // ex) arr.forEach(func(value, index, array))
    // 즉, toDos의 value를 순회함
    toDos.forEach((toDo) => {

        // 아이템 생성
        const todoBox = document.querySelector('.todo_box');

        const todoList = document.createElement('div');
        todoList.setAttribute('class', 'list_box');
        todoList.setAttribute('id', toDo.id);

        const checkBox = document.createElement('input');
        checkBox.setAttribute('class', 'check_box');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id', toDo.id);

        // 만약 toDos status가 true이면 체크박스 속성의 checked를 true로 바꿔라
        if (toDo.status) {
            checkBox.setAttribute('checked', true);
        }

        
        checkBox.addEventListener('click', function (e) {
            // 
            toDos.map((toDo) => {
                if (toDo.id == e.target.id) {
                    toDo.status = e.target.checked;
                }
            })
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
            // 체크된 투두 Element 가져와서 화면에서 지움
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