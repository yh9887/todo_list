const addButton = document.querySelector(".header_box button");

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

function todoUpdateHandler(todoId, todoValue) {
    const todoValueElement = document.getElementsByClassName(todoId)[0];
    let newTodos = todos.map((todo) => {
        return todo.id === todoId ? { ...todo, value: todoValue } : { ...todo };
    });
    todos = newTodos;
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
    todoValueElement.disabled = true;
}
function todoUnDisabledHandler(toDoId) {
    const todoValueElement = document.getElementsByClassName(toDoId)[0];
    todoValueElement.disabled = false;
    console.log("ddd")
}

function addTodo() {
    let newTodoValue = document.getElementById("todo_input").value;
    if (newTodoValue) {
        const id = Math.floor(Math.random() * 999999);
        todos.push({
            id: id,
            value: newTodoValue,
            status: false,
        });
        localStorage.setItem("TODOS", JSON.stringify(todos));
        const todoContainer = document.querySelector(".todo_container");
        const todoBox = document.createElement("div");
        todoBox.setAttribute("id", "todo_box" + id);
        todoBox.setAttribute("class", "list_box");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("class", "check_box");
        checkBox.setAttribute("id", id);
        checkBox.addEventListener("click", function (e) {
            todos.map((todo) => {
                if (todo.id == id) {
                    todo.status = e.target.checked;
                }
            });
            localStorage.setItem("TODOS", JSON.stringify(todos));
            if (e.target.checked) {
                document.getElementsByClassName(
                    id
                )[0].className = `${id} list_name name_active`;
            } else {
                document.getElementsByClassName(id)[0].className = `${id} list_name`;
            }
        });
        const ListName = document.createElement("div");
        ListName.setAttribute("class", `list_name ${id}`);
        ListName.innerText = newTodoValue;
        const ListDel = document.createElement("button");
        ListDel.setAttribute("type", "button");
        ListDel.setAttribute("class", "list_delete");
        ListDel.innerText = "❌";
        ListDel.addEventListener("click", () => delTodo(id));
        todoContainer.prepend(todoBox);
        todoBox.appendChild(checkBox);
        todoBox.appendChild(ListName);
        todoBox.appendChild(ListDel);
        const listCount = document.querySelector(".count");
        listCount.innerText = `${todos.length} items left`;
    }
    const elInput = document.querySelector("#todo_input");
    elInput.value = null;
}

function listCheckBtn(type) {
    const allBtn = document.getElementById('All')
    const activeBtn = document.getElementById('Active')
    const comBtn = document.getElementById('Completed')
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
        // document.getElementById('allCheckBox').checked = false;
    } else if (type == "Completed") {
        comBtn.classList.add(BUTTON_ACTIVE);
        // document.getElementById('allCheckBox').checked = true;
    }
    todoArr = type == "All" ? todos : todos.filter((todo) => { 
        if(type == "Completed") { return todo.status === true } 
        else if(type == "Active"){ return todo.status === false}});
        
    for ( let i = 0; i < nameNone.length; i++ ) {
        if(type == "All" || type == "Active") nameNone[i].style.display = 'flex';
        if (type == "Completed") nameNone[i].style.display = 'none';
    }
    for ( let i = 0; i < nameActive.length; i++ ) {
        if(type == "Active")  nameActive[i].style.display = 'none';
        if (type == "All" || type == "Completed") nameActive[i].style.display = 'flex';
    }
    // listCount.innerText = `${todoArr.length} items left`;

}

function delTodo(todoId) {
    const newTodos = todos.filter((todo) => {
        return todo.id !== todoId;
    });
    todos = newTodos;
    const todoBoxElement = document.getElementById("todo_box" + todoId);
    todoBoxElement.remove();
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
    const listCount = document.querySelector(".count");
    listCount.innerText = `${todos.length} items left`;
}

function getTodo() {
    todos.forEach((todo) => {
        const todoContainer = document.querySelector(".todo_container");
        const todoBox = document.createElement("div");
        todoBox.setAttribute("id", "todo_box" + todo.id);
        todoBox.setAttribute("class", "list_box");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("id", todo.id);
        checkBox.setAttribute("class", "check_box");
        checkBox.setAttribute("type", "checkbox");
        if (todo.status) {
            checkBox.setAttribute("checked", true);
        }
        checkBox.addEventListener("click", function (e) {
            todos.map((todo) => {
                if (todo.id == e.target.id) {
                    todo.status = e.target.checked;
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
            localStorage.setItem("TODOS", JSON.stringify(todos));
        });
        const ListName = document.createElement("input");
        ListName.setAttribute("type", "text");
        ListName.disabled = true;
        ListName.value = todo.value;
        todoBox.addEventListener("dblclick", () => todoUnDisabledHandler(todo.id));
        ListName.addEventListener("blur", (e) => {
            todoUpdateHandler(todo.id, e.target.value);
        });
        if (todo.status) {
            ListName.setAttribute("class", `list_name name_active ${todo.id}`);
        } else {
            ListName.setAttribute("class", `list_name ${todo.id}`);
        }
        const ListDel = document.createElement("button");
        ListDel.setAttribute("type", "button");
        ListDel.setAttribute("class", "list_delete");
        ListDel.innerText = "❌";
        ListDel.addEventListener("click", () => delTodo(todo.id));
        todoContainer.appendChild(todoBox);
        todoBox.appendChild(checkBox);
        todoBox.appendChild(ListName);
        todoBox.appendChild(ListDel);
    });
    const listCount = document.querySelector(".count");
    listCount.innerText = `${todos.length} items left`;
}

function countHandler(type) {
    const listCount = document.querySelector(".count");
    let todoArr = [];
    if (type == "All") {
        todoArr = todos;
    } else if (type == "Active") {
        todoArr = todos.filter((todo) => todo.status == false);
    } else if (type == "Completed") {
        todoArr = todos.filter((todo) => todo.status == true);
    }
    listCount.innerText = `${todoArr.length} items left`;
}
function clearHandler() {
    const newTodos = todos.filter((todo) => todo.status == false);
    const allCheckBoxValue = document.getElementById("all_check_box");
    todos.forEach((todo) => {
        if (todo.status) {
            const todoBoxElement = document.getElementById("todo_box" + todo.id);
            todoBoxElement.remove();
        }
    });
    todos = newTodos;
    localStorage.setItem("TODOS", JSON.stringify(newTodos));
    allCheckBoxValue.checked= false;
}

function allCheckHandler() {
    const allCheckBoxValue = document.getElementById("all_check_box").checked;
    todos.map((toDo) => {
        toDo.status = allCheckBoxValue;
        document.getElementById(toDo.id).checked = allCheckBoxValue;
        if (toDo.status) {
            document.getElementsByClassName(toDo.id
            )[0].className = `${toDo.id} list_name name_active`;
        } else {
            document.getElementsByClassName(
                toDo.id
            )[0].className = `${toDo.id} list_name`;
        }
    });
    localStorage.setItem("TODOS", JSON.stringify(todos));
}
addButton.addEventListener("click", addTodo);
if (todos.length > 0) getTodo();



