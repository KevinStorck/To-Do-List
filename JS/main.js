onload = () => showTodos();

function saveTodoItem() {
    let todoBody = document.getElementById('todo-body').value;
    let todoHeader = document.getElementById('todo-header').value;
    let todoCategory = document.getElementById('todo-category').value;
    let todoDate = (new Date());

    let id = JSON.parse(localStorage.getItem('todoList')).length;

    let todo = {
        header:todoHeader,
        body:todoBody,
        category:todoCategory,
        date:todoDate,
        id:id,
        klar:false
    }

    let todoList = [];
    let storedTodos = JSON.parse(localStorage.getItem('todoList'));

    if(storedTodos) {
        todoList = storedTodos;
        todoList.push(todo)
    }
    else todoList.push(todo)

    localStorage.setItem('todoList', JSON.stringify(todoList))
    
    document.getElementById('todo-header').value = '';
    document.getElementById('todo-body').value = '';

    showTodos();
    klarRefresh();
}

function showTodos() {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    let container = document.getElementById("todo-container");
    container.innerHTML = ("");
    for (let i = 0; i < todoList.length; i++) {

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
    klarRefresh();
}

function removeTodo(todoIndex) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList.splice(todoIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    rearrangeTodos();
    showTodos();
    klarRefresh();
}

function rearrangeTodos() {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    if (todoList.length > 0) {
        for (let element in todoList) {
            todoList[element].id = element;
        }
        localStorage.setItem('todoList', JSON.stringify(todoList))
        }
}

function klar(todoIndex) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    if (!todoList[todoIndex].klar) todoList[todoIndex].klar = true;
    else todoList[todoIndex].klar = false;
    localStorage.setItem('todoList', JSON.stringify(todoList))
    klarRefresh();
}

function klarRefresh() {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    for (let element in todoList) {
        if (todoList[element].klar) {
            let object = document.getElementById(`todo-item-${element}`);
            object.setAttribute("class", "todo-item klar");
        } else {
            let object = document.getElementById(`todo-item-${element}`);
            object.setAttribute("class", "todo-item");
        }
    }
    localStorage.setItem('todoList', JSON.stringify(todoList));
}