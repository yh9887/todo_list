const listInput = document.getElementById('todoInput');    

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];
/** 더블클릭 시 리스트 수정해주는 함수 */
function listChange(){
    console.log('gg')
}
/** 완료된 할 일 지우는 함수 */
function listClear(){
    // 체크되지 않은 것만 새로운 배열에 담아 업데이트
    const newTodo = toDos.filter((toDo)=>toDo.status === false);
    localStorage.setItem("TODOS", JSON.stringify(newTodo));
    // toDos 배열을 돌면서 체크된 것만 화면에서 지워주기
    toDos.forEach((toDo)=>{
        if(toDo.status) document.getElementById(toDo.id).remove();
    });
};
/** 전체 체크 함수 */
function allCheck(e){
    const checks= document.getElementsByName('check');
    // 화면에서 체크상태 보여주기
    checks.forEach((check)=>{
        check.checked = e.checked;
        if(check.checked){
            check.setAttribute('checked', true)
        }
    });

    // 로컬스토리지에 체크상태 저장
    toDos.map((toDo)=>{
        toDo.status = e.checked;
        document.getElementById(toDo.id).checked = e.checked;
        if (toDo.status) {
            document.getElementsByClassName(toDo.id)[0].className = `${toDo.id} list_name name_active`;
        } else {
            document.getElementsByClassName(toDo.id)[0].className = `${toDo.id} list_name`;
        }
    });
    localStorage.setItem("TODOS", JSON.stringify(toDos));
};
/** 리스트 삭제 시 함수 */
function delTodo(e){
    // 화면에서 리스트 지워주는 작업
    const delTarget = e.target.parentNode;
    delTarget.remove();
    // 로컬스토리지에 리스트 지워주는 작업
    // filter는 기존 배열을 변경하지 않기 때문에 새로운 변수에 담아서 출력하거나, toDos자체에 담아주어야 한다.

    toDos = toDos.filter((toDo)=>
        toDo.id !==  parseInt(delTarget.id) 
    )
    localStorage.setItem("TODOS", JSON.stringify(toDos));

};
/** 리스트 추가 시 함수 */
function addTodo(){
    // 삭제,상태를 알기 위해 리스트마다 아이디 주기위함
    const randID = Math.floor(Math.random()*999999)
    if(listInput.value.length>0){
        let todoChecked = false;
        toDos.push({
            value: listInput.value,
            id: randID,
            status: todoChecked
        });
        paintTodo(listInput.value, randID, todoChecked);
    }   
    listInput.value=""
    localStorage.setItem("TODOS", JSON.stringify(toDos));
};
/** 리스트 받아올 시 함수 */
function getTodo(){
    // 리스트의 개수가 하나라도 있으면 반복문을 돌면서 paintTodo함수 실행
    // 리스트를 받아올때 allcheck박스를 true로 바꿔주고
    document.getElementById('allCheckBox').checked = true;
    toDos.forEach((toDo) =>{
            paintTodo(toDo.value, toDo.id, toDo.status);
            // 리스트 중 status가 false인게 하나라도 있으면 allcheck박스도 false로 바꿔준다.
            if(toDo.status === false){
            document.getElementById('allCheckBox').checked = false;
            }
        });
};
/** 리스트 추가&받아올 시 함수 */
function paintTodo(todoValue, todoId, todoChecked){
    const todoBox = document.querySelector('.todo_box');

    const listBox = document.createElement('div');
    listBox.setAttribute('class', 'list_box');
    listBox.setAttribute('id', todoId);
    listBox.addEventListener('dblclick', listChange);

    const listName = document.createElement('input');
    listName.setAttribute('type', 'text');
    listName.setAttribute('class', `${todoId} list_name `);
    listName.value = todoValue;
    listName.disabled = true;

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'check_box');
    checkBox.setAttribute('name', 'check');
    checkBox.setAttribute('id', todoId);
    // todo의 체크 상태가 true이면 input checkbox를 체크된 상태로 설정
    if (todoChecked) {
        checkBox.setAttribute("checked", true);
        listName.classList.add('name_active');
    }
    
    checkBox.addEventListener('click', function(e){
        toDos.map((toDo)=>{
            if(toDo.id == todoId){
                toDo.status = e.target.checked;
            }
            /** 이거 왜 여기 안에 하면 안 되는지? */
            // 체크박스를 클릭했을 때에만 실행하기 떄문에 평소 체크 상태  저장을 할 수 없음
                // if (todoChecked) {
                // checkBox.setAttribute("checked", true);
                // }
        })
        localStorage.setItem("TODOS", JSON.stringify(toDos))
        if(e.target.checked){
            listName.classList.add('name_active')
        }
        else{
            listName.classList.remove('name_active')
        }
    });
    

    const listDel = document.createElement('button');
    listDel.innerText = "❌";
    listDel.addEventListener('click', delTodo)

    document.querySelector('.list_count').innerText = `${toDos.length} items left`

    todoBox.appendChild(listBox);
    listBox.appendChild(checkBox);
    listBox.appendChild(listName);
    listBox.appendChild(listDel);
};
/** 새로고침 시 getTodo 함수를 먼저 실행하여 리스트 여부를 통해 아이템을 받아올지 말지 판단 */
if(toDos.length > 0) getTodo();