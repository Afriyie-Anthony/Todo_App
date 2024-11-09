const todoForm = document.querySelector('form');
const todoInput = document.getElementById('task');
const todoListUl = document.getElementById('todo-lists')

let allTodos = getTodos();
UpdateTodoItem()

todoForm.addEventListener('submit', function(e){
 e.preventDefault();
 addTodo();
})

function addTodo(){
 const TodoText = todoInput.value.trim();
 if (TodoText.length > 0){
   const todoObject = {
     text: TodoText,
     completed: false
   }
   allTodos.push(todoObject);
   UpdateTodoItem();
   SaveTodoList();
   todoInput.value = "";
 }
}

function UpdateTodoItem (){
 todoListUl.innerHTML = "";
 allTodos.forEach( (todo, todoIndex) => {
   todoItem = createTodoItem(todo, todoIndex);
   todoListUl.append(todoItem);
 })
}
function createTodoItem(todo, todoIndex){
 const TodoId = "todo-"+todoIndex;
 const TodoLI = document.createElement('li')
 const TodoText = todo.text;
 TodoLI.className = "todo"
 TodoLI.innerHTML = `

       <input type="checkbox" id="${TodoId}">
       <label for="${TodoId}" class="custom-checkbox">
         <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"> 
           <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
       </label>
       <label for="${TodoId}" class="todo-text">
        ${TodoText}
       </label>
       <button class="delete">
         <svg fill="red" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"> 
           <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680- 
             120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
       </button>

 `

 const deleteButton = TodoLI.querySelector('.delete')

 deleteButton.addEventListener('click', () => {
   deleteTodoItem(todoIndex);
 })

 const checkbox = TodoLI.querySelector('input');
 checkbox.addEventListener('change', () => {
   allTodos[todoIndex].completed = checkbox.checked;
   SaveTodoList();
 })

 checkbox.checked = todo.completed;
 return TodoLI;
}

function deleteTodoItem(todoIndex) {
 allTodos = allTodos.filter((_, i) => i !== todoIndex);
 SaveTodoList();
 UpdateTodoItem();
}

function SaveTodoList (){
 const todoJson = JSON.stringify(allTodos)
 localStorage.setItem("todos", todoJson)
}

function getTodos () {
 const todos = localStorage.getItem("todos") || "[]";
 return JSON.parse(todos)
}
