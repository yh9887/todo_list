// 추가 버튼을 가져와 addButton 변수에 넣어줌
const addButton = document.querySelector(".header_box button");

// localStorage에 "TODOS" 키 값이 있으면 todos에 넣어주고 없으면 빈 배열로 todos 생성
let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

// todo 수정하는 함수
function todoUpdateHandler(todoId, todoValue) {
  // todoValueElement 변수에 전달 받은 todoId를 class로 가지고 있는 element들중 첫번째를 가져와서 넣어줌
  const todoValueElement = document.getElementsByClassName(todoId)[0];
  // todos에 담긴 todo들을 map으로 반복문을 돌려서 전달 받은 todoId와 동일한 객체를 찾아서 value를 전달 받은 todoValue로 수정해줌
  let newTodos = todos.map((todo) => {
    return todo.id === todoId ? { ...todo, value: todoValue } : { ...todo };
  });
  // newTodos(업데이트된 todos)를 todos에 넣어줌
  todos = newTodos;
  // localStorage에 "TODOS"도 업데이트 해줌(localStorage에 넣기위해 string으로 변환)
  localStorage.setItem("TODOS", JSON.stringify(newTodos));
  // 수정 완료되어 다시 todoValueElement를 비활성화 시켜줌
  todoValueElement.disabled = true;
}
// todo 더블 클릭 시 발생하는 함수이고 더블클릭한 todo의 id를 전달 받음
function todoUnDisabledHandler(toDoId) {
  // todoValueElement 변수에 전달 받은 todoId를 class로 가지고 있는 element들중 첫번째를 가져와서 넣어줌
  const todoValueElement = document.getElementsByClassName(toDoId)[0];
  // 수정하기 위해 todoValueElement를 활성화 시켜줌
  todoValueElement.disabled = false;
}

// 할 일을 추가할 때 사용되는 함수
function addTodo() {
  // newTodoValue에 todo_input이라는 id를 가진 element의 값을 가져와서 넣어줌
  let newTodoValue = document.getElementById("todo_input").value;
  // newTodoValue 값이 있다면 if문 안으로 아니면 if문 통과
  if (newTodoValue) {
    // 겹치지 않는 id를 만들기 위해 랜덤 값 생성(999999이하 값으로 랜덤 값 생성)
    const id = Math.floor(Math.random() * 999999);
    // todos에 새롭게 추가된 todo 객체를 만들어 넣어줌
    todos.push({
      id: id,
      value: newTodoValue,
      status: false,
    });
    // localStorage에 TODOS 키를 가진 값을 todos(추가된 todo 포함)를 넣어줌
    localStorage.setItem("TODOS", JSON.stringify(todos));
    // todoContainer에 class명이 todo_container인 요소를 가져와서 넣어줌
    const todoContainer = document.querySelector(".todo_container");
    // div 태그를 생성하여 todoBox 변수에 넣어줌
    const todoBox = document.createElement("div");
    // 위에서 만든 div태그에 id 값을 todo_box + id(랜덤 값)로 설정해줌
    todoBox.setAttribute("id", "todo_box" + id);
    // 위에서 만든 div의 class 명을 list_box로 설정
    todoBox.setAttribute("class", "list_box");
    // input 태그를 생성하여 checkBox 변수에 넣어줌
    const checkBox = document.createElement("input");
    // 위에서 생성한 input 태그의 타입을 checkbox로 설정
    checkBox.setAttribute("type", "checkbox");
    // 위에서 생성한 input 태그의 class명을 check_box로 설정
    checkBox.setAttribute("class", "check_box");
    // 위에서 생성한 input 태그의 id를 위에서 생성한 id(랜덤 값)으로 설정
    checkBox.setAttribute("id", id);
    // 위에서 생성한 input에 click 이벤트 속성을 넣어줌
    checkBox.addEventListener("click", function (e) {
      // todos를 가져와서 반복문 map을 돌려줌
      todos.map((todo) => {
        // todo의 id가 체크 박스를 클릭한 todo의 id랑 같은걸 찾음
        if (todo.id == id) {
          // todo의 id가 체크 박스를 클릭한 todo의 id랑 같으면 현재 체크 박스 상태로 값 변경
          todo.status = e.target.checked;
        }
      });
      // localStorage의 TODOS 키로 가지고 있는 값을 업데이트된 todos로 변경
      localStorage.setItem("TODOS", JSON.stringify(todos));
      // 클릭한 todo 체크박스 상태가 true이면 실행
      if (e.target.checked) {
        // 클릭한 todo 체크박스 상태가 true이면 밑줄을 긋기 위해 name_active class를 넣어줌
        document.getElementsByClassName(
          id
        )[0].className = `${id} list_name name_active`;
      } else {
        // 클릭한 todo 체크박스 상태가 true이면 밑줄을 지우기 위해 name_active class를 지워줌
        document.getElementsByClassName(id)[0].className = `${id} list_name`;
      }
    });
    // div태그를 생성하여 ListName 변수에 넣어줌
    const ListName = document.createElement("div");
    // 위에서 생성한 div태그의 class명을 list_name id(랜덤 값)으로 설정
    ListName.setAttribute("class", `list_name ${id}`);
    // 위에서 생성한 div태그에 새롭게 입력한 텍스트를 넣어줌
    ListName.innerText = newTodoValue;
    // button 태그를 생성하여 ListDel 변수에 넣어줌
    const ListDel = document.createElement("button");
    // 위에서 생성한 button태그의 type을 button으로 설정(form 내부에서 타입을 지정하지 않으면 submit type으로 인식)
    ListDel.setAttribute("type", "button");
    // 위에서 생성한 button태그의 class명을 list_delete으로 설정
    ListDel.setAttribute("class", "list_delete");
    // 위에서 생성한 button 태그에 :x: 텍스트를 넣어줌
    ListDel.innerText = ":x:";
    // 위에서 생성한 button 태그에 클릭 이벤트를 넣어주고 클릭 시 delTodo 함수가 실행되게 함(매개변수로 랜덤으로 생성한 id를 넘겨줌)
    ListDel.addEventListener("click", () => delTodo(id));
    // 전체 todo를 감싸고 있는 todoContainer 앞에 todoBox를 넣어줌
    todoContainer.prepend(todoBox);
    // 하나의 todo를 감싸고 있는 todoBox 하위에 checkBox를 넣어줌
    todoBox.appendChild(checkBox);
    // todo를 감싸고 있는 todoBox 하위에 ListName을 넣어줌
    todoBox.appendChild(ListName);
    // todo를 감싸고 있는 todoBox 하위에 ListDel을 넣어줌
    todoBox.appendChild(ListDel);
    // class명이 count인 요소를 찾아서 listCount 변수에 넣어줌
    const listCount = document.querySelector(".count");
    // listCount에 todos 갯수 + items left 텍스트를 넣어줌
    listCount.innerText = `${todos.length} items left`;
  }
  // id가 todo_input인 요소를 가져와 elInput 변수에 넣어줌
  const elInput = document.querySelector("#todo_input");
  // todo 추가가 마무리되어 input에 입력된 값 지워주기
  elInput.value = null;
}

// todo 지울 때 사용되는 함수 (X 버튼을 눌렀을 때 발생)
function delTodo(todoId) {
  // 전달 받은 todo를 제외하기 위헤서 filter 함수 사용
  const newTodos = todos.filter((todo) => {
    // 클릭한 todo id가 아닌 것만 남김
    return todo.id !== todoId;
  });
  // todos에 클릭한 todo를 제외한 newTodos를 넣어줌
  todos = newTodos;
  // todo_box + todoId를 id로 가지고 있는 element를 가져와 todoBoxElement에 넣어줌
  const todoBoxElement = document.getElementById("todo_box" + todoId);
  // todo_box + todoId를 id로 가지고 있는 element를 화면에서 지워줌
  todoBoxElement.remove();
  // localStorage의 TODOS 키로 가지고 있는 값을 업데이트된 newTodos로 변경
  localStorage.setItem("TODOS", JSON.stringify(newTodos));
  // todo 한 개를 삭제했으므로 count를 class로 가지고 있는 요소의 값을 업데이트해줌
  const listCount = document.querySelector(".count");
  listCount.innerText = `${todos.length} items left`;
}

// todos를 가져와 화면에 보여줄 때 사용하는 함수
function getTodo() {
  // localStorage에 "TODOS" 키로 넣어둔 todos를 갯수 만큼 반복문을 돌림
  todos.forEach((todo) => {
    // todo를 넣어줄 요소인 class가 todo_list를 todoContainer 변수에 넣어서 선언
    const todoContainer = document.querySelector(".todo_container");
    // div태그를 생성하여 todoBox 변수에 넣어줌
    const todoBox = document.createElement("div");
    // 위에서 생성한 div태그의 id를 "todo_box" + todo의 id로 설정
    todoBox.setAttribute("id", "todo_box" + todo.id);
    // 위에서 생성한 div태그의 class를 "list_box"로 설정
    todoBox.setAttribute("class", "list_box");
    // input태그를 생성하여 checkBox 변수에 넣어줌
    const checkBox = document.createElement("input");
    // 위에서 생성한 input태그의 id를 todo의 id로 설정
    checkBox.setAttribute("id", todo.id);
    // 위에서 생성한 input태그의 class를 "check_box"로 설정
    checkBox.setAttribute("class", "check_box");
    // 위에서 생성한 input태그의 type을 checkbox로 설정(type을 지정하지 않으면 text type으로 설정됨)
    checkBox.setAttribute("type", "checkbox");
    // 반복문을 돌면서 현재 todo의 체크 상태가 true이면 if문 안으로 이동
    if (todo.status) {
      // todo의 체크 상태가 true인 경우라서 input checkbox를 체크된 상태로 설정
      checkBox.setAttribute("checked", true);
    }
    // 위에서 생성한 체크박스에 클릭 이벤트 설정
    checkBox.addEventListener("click", function (e) {
      // 체크박스를 클릭할 경우 todos를 반복문을 돌림
      todos.map((todo) => {
        // 반복문을 돌리면서 체크박스를 클릭한 todo를 찾아냄
        if (todo.id == e.target.id) {
          // 클릭한 todo를 찾아서 체크 상태를 현재 체크박스 상태로 변경해줌
          todo.status = e.target.checked;
        }
      });
      // 체크박스가 체크된 경우 if문 내부로 이동
      if (e.target.checked) {
        // 클릭한 todo 체크박스 상태가 true이면 밑줄을 긋기 위해 name_active class를 넣어줌
        document.getElementsByClassName(
          e.target.id
        )[0].className = `${e.target.id} list_name name_active`;
      } else {
        // 클릭한 todo 체크박스 상태가 false이면 밑줄을 지우기 위해 name_active class를 지워줌
        document.getElementsByClassName(
          e.target.id
        )[0].className = `${e.target.id} list_name`;
      }
      // 체크박스 상태가 수정되었으므로 localStorage에 TODOS 키를 가진 값을 todos(체크상태가 수정된 todos)로 수정해줌
      localStorage.setItem("TODOS", JSON.stringify(todos));
    });
    // input 태그를 생성하여 ListName 변수에 넣어줌
    const ListName = document.createElement("input");
    // 위에서 생성한 input의 타입을 text로 설정
    ListName.setAttribute("type", "text");
    // 이미 생성한 todo는 수정이 안되도록 비활성화
    ListName.disabled = true;
    // 위에서 생성한 input에 todo의 값을 넣어줌 (현재 반복문 돌고 있음)
    ListName.value = todo.value;
    // todoBox(하나의 todo를 감싸고 있는 div태그)를 더블 클릭하면 todoUnDisabledHandler(input 비활성화 푸는 함수) 호출
    todoBox.addEventListener("dblclick", () => todoUnDisabledHandler(todo.id));
    // ListName(todo를 입력하는 input태그)에서 포커스가 벗어나면 todoUpdateHandler(현재 입력된 값으로 todo 내용 수정하여 저장해주는 함수) 호출
    ListName.addEventListener("blur", (e) => {
      todoUpdateHandler(todo.id, e.target.value);
    });
    // todo 상태가 true이면 밑줄을 긋기 위해 name_active class를 넣어줌
    if (todo.status) {
      ListName.setAttribute("class", `list_name name_active ${todo.id}`);
    } else {
      // todo 상태가 false이면 밑줄을 지우기 위해 name_active class를 지워줌
      ListName.setAttribute("class", `list_name ${todo.id}`);
    }
    // button 태그를 생성하여 ListDel 변수에 넣어줌
    const ListDel = document.createElement("button");
    // button 태그의 type을 button으로 지정(form태그 내부의 button은 type을 설정하지 않으면 submit이됨)
    ListDel.setAttribute("type", "button");
    // 위에서 생성한 button의 class명을 list_delete로 설정
    ListDel.setAttribute("class", "list_delete");
    // 위에서 생성한 button의 문구를 :x:로 설정
    ListDel.innerText = ":x:";
    // 위에서 생성한 button을 클릭하면 delTodo(todo를 화면에서 지우고 저장하는 함수)를 호출
    ListDel.addEventListener("click", () => delTodo(todo.id));
    // todoContainer(모든 todo를 감싸고 있는 요소) 하위에 todoBox(하나의 todo를 감싸고 있는 요소)를 넣어줌
    todoContainer.appendChild(todoBox);
    // todoBox(하나의 todo를 감싸고 있는 요소) 하위에 checkBox를 넣어줌
    todoBox.appendChild(checkBox);
    // todoBox(하나의 todo를 감싸고 있는 요소) 하위에 ListName(todo 내용이 입력된 input)을 넣어줌
    todoBox.appendChild(ListName);
    // todoBox(하나의 todo를 감싸고 있는 요소) 하위에 ListDel(삭제 버튼)을 넣어줌
    todoBox.appendChild(ListDel);
  });
  // class명이 count인 요소를 찾아서 listCount 변수에 넣어줌
  const listCount = document.querySelector(".count");
  // listCount에 todos 갯수 + items left 텍스트를 넣어줌
  listCount.innerText = `${todos.length} items left`;
}

// 어떤 버튼을 클릭했는지에 따라 하단 갯수를 다르게 표시해주기 위한 함수
function countHandler(type) {
  // class명이 count인 요소를 찾아서 listCount 변수에 넣어줌
  const listCount = document.querySelector(".count");
  let todoArr = [];
  if (type == "All") {
    // 모든 todo를 todoArr 배열에 넣어줌
    todoArr = todos;
  } else if (type == "Active") {
    // todo 체크 상태가 false인 것만 todoArr 배열에 넣어줌
    todoArr = todos.filter((todo) => todo.status == false);
  } else if (type == "Completed") {
    // todo 체크 상태가 true인 것만 todoArr 배열에 넣어줌
    todoArr = todos.filter((todo) => todo.status == true);
  }
  // listCount에 todoArr에 담긴 todo들의 갯수 + items left 텍스트를 넣어줌
  listCount.innerText = `${todoArr.length} items left`;
}
function clearHandler() {
  // 체크되지 않은 것만 newTodos에 담김
  const newTodos = todos.filter((todo) => todo.status == false);
  // 모든 투두들을 반복문을 돌림
  // 화면에서 지우기
  todos.forEach((todo) => {
    // 체크된 투두이면 조건에 부합
    if (todo.status) {
      // 체크된 투두 Element 가져와서 지움
      const todoBoxElement = document.getElementById("todo_box" + todo.id);
      todoBoxElement.remove();
    }
  });
  // 체크되지 않은 투두들만 toDos에 담음
  // 배열 업데이트
  todos = newTodos;
  // 로컬스토리지에 toDos key를 가지고 있는 값을 체크되지 않은 투두들로 변경
  localStorage.setItem("TODOS", JSON.stringify(newTodos));
}

// 모든 항목(todo)을 일괄적으로 체크 혹은 체크를 풀기 위한 함수
function allCheckHandler() {
  const allCheckBoxValue = document.getElementById("all_check_box").checked;
  // 모든 todo들을 반복문을 돌면서 체크 상태를 수정해줌
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
// 가장 위에서 생성한 addButton에 클릭 이벤트 추가(클릭 시 addTodo 함수 실행)
addButton.addEventListener("click", addTodo);
// todos에 값이 있는 경우에만 getTodo 함수 실행
if (todos.length > 0) getTodo();



