const toDoForm = document.querySelector("#todo-form")
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.querySelector("#todo-list")

const TODOS_KEY ="todos"

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement("li")
    li.id = newTodo.id;
    const span = document.createElement("span")
    span.innerText = newTodo.text;
    const button = document.createElement("button")
    button.innerText ="❌";   
    button.addEventListener("click", deleteToDo)
    li.appendChild(span)
    li.appendChild(button)
    toDoList.appendChild(li)
}


function handleTodoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id: Date.now()
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}
toDoForm.addEventListener('submit', handleTodoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY)
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    // parsedToDos.forEach((item) => console.log("heloo", item));

    // paintToDo와 위 동일. 이 함수에서 다 해주기때문에 위처럼 복잡하게 할 필요 x
    parsedToDos.forEach(paintToDo);
}

 // 둘 다 동일
// (item) => console.log("heloo", item)

// function sayHello(item){
//     console.log("hello", item)
// }

