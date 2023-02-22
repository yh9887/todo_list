const todoInputBox = document.querySelector(".header_box button");

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];

function valueChangeHandler(toDoId, toDoValue){
    const todoValueElement = document.getElementsByClassName(toDoId)[0];
    todoValueElement.disabled = true;
    
    console.log("🚀 ~ file: index.js:11 ~ newTodos ~ toDoId", toDoId)
    console.log("🚀 ~ file: index.js:11 ~ newTodos ~ toDo.id", toDo.id)
    const newTodos = toDos.map((toDo)=> {
        if(toDo.id == toDoId){
            toDo.value = toDoValue;
        }
    })
    
    toDos = newTodos;
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
}

function updeteHandler(toDoId){
    console.log("클릭됨",toDoId)
    const todoValueElement = document.getElementsByClassName(toDoId)[0];
    console.log("🚀 ~ file: test.js:8 ~ updeteHandler ~ todoValueElement", todoValueElement)
    todoValueElement.disabled = false;
}

function addTodo() {
    let inputValue = document.getElementById("todoInput").value;

    if (inputValue) {
        const rand = Math.floor(Math.random() * 999999);
        toDos.push({
            id: rand,
            value: inputValue,
            status: false,
        });
        localStorage.setItem("TODOS", JSON.stringify(toDos));

        const todoBox = document.querySelector(".todo_list");

        const todoList = document.createElement("div");
        todoList.setAttribute("class", "list_box");
        todoList.setAttribute("id", "todoBox" + rand);

        const checkBox = document.createElement("input");
        checkBox.setAttribute("class", "check_box");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", rand);

        checkBox.addEventListener("click", function (e) {
            toDos.map((toDo) => {
                if (toDo.id == rand) {
                    toDo.status = e.target.checked;
                }
            });
            localStorage.setItem("TODOS", JSON.stringify(toDos));
            if (e.target.checked) {
                document.getElementsByClassName(
                    rand
                )[0].className = `${rand} list_name name_active`;
            } else {
                document.getElementsByClassName(
                    rand
                )[0].className = `${rand} list_name`;
            }
        });

        const ListName = document.createElement("div");
        ListName.setAttribute("class", `list_name ${rand}`);
        ListName.innerText = inputValue;

        const ListDel = document.createElement("button");
        ListDel.setAttribute("class", "list_delete");
        ListDel.setAttribute("type", "button");
        ListDel.innerText = ":x:";
        ListDel.addEventListener("click", () => delTodo(rand));

        todoBox.prepend(todoList);
        todoList.appendChild(checkBox);
        todoList.appendChild(ListName);
        todoList.appendChild(ListDel);

        const listCount = document.querySelector(".list_count");
        listCount.innerText = `${toDos.length} items left`;
    }
    const elInput = document.querySelector("#todoInput");
    elInput.value = null;
}

function delTodo(toDoId) {
    const newTodos = toDos.filter((toDo) => {
        // 지금 클릭한 id가 아닌 것만 남겨주기
        return toDo.id !== toDoId;
    });
    toDos = newTodos;
    const todoElement = document.getElementById("todoBox" + toDoId);
    todoElement.remove();
    localStorage.setItem("TODOS", JSON.stringify(newTodos));

    const listCount = document.querySelector(".list_count");
    listCount.innerText = `${toDos.length} items left`;
}

function getTodo() {
    toDos.forEach((toDo) => {
        const todoBox = document.querySelector(".todo_list");

        const todoList = document.createElement("div");
        todoList.setAttribute("class", "list_box");
        todoList.setAttribute("id", "todoBox" + toDo.id);

        const checkBox = document.createElement("input");
        checkBox.setAttribute("class", "check_box");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", toDo.id);

        if (toDo.status) {
            checkBox.setAttribute("checked", true);
        }

        checkBox.addEventListener("click", function (e) {
            toDos.map((toDo) => {
                if (toDo.id == e.target.id) {
                    toDo.status = e.target.checked;
                }
            });
            if (e.target.checked) {
                document.getElementsByClassName(
                    e.target.id
                )[0].className = `${e.target.id} list_name name_active`;
            } else {
                document.getElementsByClassName(
                    e.target.id
                )[0].className = `${e.target.id} list_name`;
            }
            localStorage.setItem("TODOS", JSON.stringify(toDos));
        });

        const ListName = document.createElement("input");
        ListName.setAttribute("type", "text");
        ListName.disabled = true;
        ListName.value = toDo.value;
        console.log("@@@")
        todoList.addEventListener('dblclick', () => updeteHandler(toDo.id))
        ListName.addEventListener('blur', () => valueChangeHandler(toDo.id, toDo.value))
        if (toDo.status) {
            ListName.setAttribute("class", `list_name name_active ${toDo.id}`);
        } else {
            ListName.setAttribute("class", `list_name ${toDo.id}`);
        }
        const ListDel = document.createElement("button");
        ListDel.setAttribute("class", "list_delete");
        ListDel.setAttribute("type", "button");
        ListDel.innerText = ":x:";
        ListDel.addEventListener("click", () => delTodo(toDo.id));

        todoBox.appendChild(todoList);
        todoList.appendChild(checkBox);
        todoList.appendChild(ListName);
        todoList.appendChild(ListDel);
    });

    const listCount = document.querySelector(".list_count");
    listCount.innerText = `${toDos.length} items left`;
}

function countHandler(type) {
    const listCount = document.querySelector(".list_count");
    let todoArr = [];
    if (type == "All") {
        todoArr = toDos;
    } else if (type == "Active") {
        todoArr = toDos.filter((toDo) => toDo.status == false);
    } else if (type == "Completed") {
        todoArr = toDos.filter((toDo) => toDo.status == true);
    }
    listCount.innerText = `${todoArr.length} items left`;
}

function clearHandler() {
    // 체크되지 않은 것만 newTodos에 담김
    const newTodos = toDos.filter((toDo) => toDo.status == false);
    // 모든 투두들을 반복문을 돌림
    // 화면에서 지우기
    toDos.forEach((toDo) => {
        // 체크된 투두이면 조건에 부합
        if (toDo.status) {
            // 체크된 투두 Element 가져와서 지움
            const todoElement = document.getElementById("todoBox" + toDo.id);
            todoElement.remove();
        }
    });
    // 체크되지 않은 투두들만 toDos에 담음
    // 배열 업데이트
    toDos = newTodos;
    // 로컬스토리지에 toDos key를 가지고 있는 값을 체크되지 않은 투두들로 변경
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
}

function allCheckHandler() {
    const allCheckBoxValue = document.getElementById("allCheckBox").checked;
    toDos.map((toDo) => {
        toDo.status = allCheckBoxValue;
        document.getElementById(toDo.id).checked = allCheckBoxValue;
        if (toDo.status) {
            document.getElementsByClassName(
                toDo.id
            )[0].className = `${toDo.id} list_name name_active`;
        } else {
            document.getElementsByClassName(
                toDo.id
            )[0].className = `${toDo.id} list_name`;
        }
    });
    localStorage.setItem("TODOS", JSON.stringify(toDos));
}

todoInputBox.addEventListener("click", addTodo);
if (toDos.length > 0) getTodo();