onload = () => showTodos();

function saveTodoItem() {
    let todoBody = document.getElementById('todo-body').value;
    let todoHeader = document.getElementById('todo-header').value;

    let todo = {
        header:todoHeader,
        body:todoBody
    }

    let todoList = [];
    let storedTodos = JSON.parse(localStorage.getItem('todoList'));

    if(storedTodos) {
        todoList = storedTodos;
        todoList.push(todo)
    }
    else todoList.push(todo)

    localStorage.setItem('todoList', JSON.stringify(todoList))
    showTodos();
}

function showTodos() {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    let container = document.getElementById("todo-container");
    container.innerHTML = ("");
    for (let i = 0; i < todoList.length; i++) {
        // if ((document.getElementById(`header-${(todoList.length)-1}`)) === false) {
        // }
        // if ((document.getElementById(`header-${i}`))) {
        //     console.log((document.getElementById(`header-${i}`)))
        //     continue;
        // } 

        let newTodo = document.createElement('div'); // ny div
        newTodo.setAttribute("class", "todo-item"); // ger nya div en class
        newTodo.setAttribute("id", `todo-item-${i}`); // ger nya div ett id
        (document.getElementById('todo-container')).appendChild(newTodo); // lägger till nya div i vår container

        let todoHeader = document.createElement('h3'); // skapa h3
        // todoHeader.setAttribute("id", `header-${i}`);
        todoHeader.innerHTML = todoList[i].header; // ge innehåll till h3

        let todoBody = document.createElement('p'); // skapa en P tag
        todoBody.innerHTML = todoList[i].body; // ge innehåll till p tag

        let removeButton = document.createElement('button');
        removeButton.setAttribute("class", `removeButton`);
        removeButton.setAttribute("id", `removeButton-${i}`);
        removeButton.setAttribute("onclick", `removeTodo(${i})`);
        removeButton.innerHTML = 'Remove ToDo';
        
        let klarButton = document.createElement('button');
        klarButton.setAttribute("class", `klarButton`);
        klarButton.setAttribute("id", `klarButton-${i}`);
        klarButton.setAttribute("onclick", `klar(${i})`);
        klarButton.innerHTML = 'Klar';
        
        newTodo.appendChild(todoHeader);
        newTodo.appendChild(todoBody);
        newTodo.appendChild(removeButton);
        newTodo.appendChild(klarButton);
    }
}

function removeTodo(todoListObject) {
    let removeObject = JSON.parse(todoListObject);
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList.splice(removeObject, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    showTodos();
}

function klar(todoListObject) {
    let klarObject = JSON.parse(todoListObject);
    let object = document.getElementById(`todo-item-${klarObject}`);
    let objectClass = object.getAttribute("class");
    if (objectClass === "todo-item klar") {
        object.setAttribute("class", "todo-item");
    } else object.setAttribute("class", "todo-item klar");
}