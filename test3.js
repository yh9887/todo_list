const todoInput = document.getElementById('todoInput');

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];

function allCheck(e){
    const checks = document.getElementsByName('check');
    checks.forEach((check)=>{
        if(e.checked){
            check.checked = e.checked;
        }else{
            check.checked = e.checked;
        }
    });
    toDos.forEach((toDo)=>{
        toDo.status = e.checked;
        if(toDo.status){
        document.getElementsByClassName(toDo.id)[0].className = `${toDo.id} list_name name_active`;
        }else{
        document.getElementsByClassName(toDo.id)[0].className = `${toDo.id} list_name`;
        }
    });

    localStorage.setItem("TODOS", JSON.stringify(toDos));
};
function addTodo(){
    if(todoInput.value.length > 0){
        const todoId = Math.floor(Math.random() * 99999)
        let todoChecked = false;
        // console.log("37", toDos)
        toDos.push({
            value : todoInput.value,
            id : todoId,
            status : todoChecked
        })
        // console.log("43", toDos)

        paintTodo(todoInput.value, todoId, todoChecked);

    };
    
    todoInput.value = "";
    // console.log(toDos)
    localStorage.setItem("TODOS", JSON.stringify(toDos));
};
function getTodo(){ /** 질문!!! 왜 아래처럼 하면 안되는지???  */
    document.getElementById('allCheckBox').checked = true;
    toDos.forEach((toDo)=>{
        paintTodo(toDo.value, toDo.id, toDo.status);
        if(toDo.status === true){
            // document.getElementById('allCheckBox').checked = true;

        }else if(toDo.status === false){
            document.getElementById('allCheckBox').checked = false;
        }
    })
    localStorage.setItem("TODOS", JSON.stringify(toDos));
};
function paintTodo(todoInput, todoId, todoChecked){
    
    const todoBox = document.querySelector('.todo_box');

    const listBox = document.createElement('div');
    listBox.setAttribute('class', `list_box ${todoId}`);
    listBox.setAttribute('id', todoId);

    const listName = document.createElement('input');
    listName.setAttribute('type', 'text');
    listName.setAttribute('class', `list_name ${todoId}`);
    listName.setAttribute('id', todoId);
    listName.value = todoInput;

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    // checkBox.setAttribute('class', `check_box ${todoId}`);
    checkBox.setAttribute('id', todoId);
    checkBox.setAttribute('name', 'check');
    checkBox.addEventListener('click', function(e){
        todoChecked = e.target.checked;
        if(e.target.checked){
            listName.classList.add('name_active')
        }else{
            listName.classList.remove('name_active')
        };
        toDos.forEach((toDo)=>{
            if(toDo.id == todoId)toDo.status = todoChecked
        });
        localStorage.setItem("TODOS", JSON.stringify(toDos));
    });

    if(todoChecked){
        listName.classList.add('name_active');
        checkBox.setAttribute('checked', todoChecked);
    }
    

    const delBtn  = document.createElement('button');
    delBtn.innerText="❌";
    delBtn.addEventListener('click', function(e){
        const delTarget = e.target.parentNode;
        toDos = toDos.filter((toDo)=>toDo.id !== parseInt(delTarget.id))
        localStorage.setItem("TODOS", JSON.stringify(toDos))
    })
    
    todoBox.appendChild(listBox);
    listBox.appendChild(checkBox);
    listBox.appendChild(listName);
    listBox.appendChild(delBtn);
    
    document.querySelector('.list_count').innerText = `${toDos.length} items left`;
    
};
if(toDos.length >0) getTodo();
