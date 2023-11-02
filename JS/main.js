onload = () => generateTodos();

function saveTodoItem() {
    let inputHeader = document.getElementById('todo-header').value;
    let inputBody = document.getElementById('todo-body').value;
    let inputCategory = document.getElementById('todo-category').value;
    let inputDate = (new Date());

    let storedTodos = JSON.parse(localStorage.getItem('todoList'));
    let id = storedTodos ? JSON.parse(localStorage.getItem('todoList')).length : 0;

    let todo = {
        header:inputHeader,
        body:inputBody,
        category:inputCategory,
        date:inputDate,
        id:id,
        done:false,
        heart:false
    }

    let updatedTodoList = [];

    if(storedTodos) {
        updatedTodoList = storedTodos;
        updatedTodoList.push(todo)
    }
    else updatedTodoList.push(todo)

    localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
    
    document.getElementById('todo-header').value = '';
    document.getElementById('todo-body').value = '';

    generateTodos();
}

function generateTodos() {
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    let todosContainer = document.getElementById("todo-container");
    todosContainer.innerHTML = ("");
    if(!storedTodoList) return ;
    for (let i = 0; i < storedTodoList.length; i++) {

        let TodoCard = document.createElement('div'); // ny div
        TodoCard.setAttribute("class", "todo-item"); // ger nya div en class
        TodoCard.setAttribute("id", `todo-item-${i}`); // ger nya div ett id
        let todoCardHeader = document.createElement('div');
        todoCardHeader.classList.add('card-header');
        let todoCardBody = document.createElement('div');
        todoCardBody.classList.add('card-body');
        (document.getElementById('todo-container')).appendChild(TodoCard); // lägger till nya div i vår container

        let todoHeader = document.createElement('h3'); // skapa h3
        // todoHeader.setAttribute("id", `header-${i}`);
        todoHeader.innerHTML = storedTodoList[i].header; // ge innehåll till h3

        let todoDate = document.createElement('time');
        todoDate.innerHTML = `Created: ${storedTodoList[i].date}`;

        let todoBody = document.createElement('p'); // skapa en P tag
        todoBody.innerHTML = storedTodoList[i].body; // ge innehåll till p tag

        let removeContainer = document.createElement('div');
        removeContainer.classList.add('remove-btn')
        removeContainer.setAttribute("onclick", `removeTodo(${i})`);
        let removeButton = document.createElement('img');
        removeButton.setAttribute("class", `removeButton`);
        removeButton.setAttribute("id", `removeButton-${i}`);

        removeButton.setAttribute("src", "./assets/images/bin.png");

        let binLid = document.createElement('a');
        binLid.setAttribute("class", "binLid");
        binLid.setAttribute("id", `binLid-${i}`);
        
        removeContainer.append(binLid, removeButton);

        let heartIMG = document.createElement('a');
        heartIMG.setAttribute('class', 'heart');
        heartIMG.setAttribute("id", `heart-${i}`);
        heartIMG.setAttribute("onclick", `heart(${i})`);
        heartIMG.style.width = "18px";
        heartIMG.style.height = "18px";
        
        todoCardHeader.append(todoHeader, heartIMG, todoDate);
        todoCardBody.append(todoBody, removeContainer);
        TodoCard.append(todoCardHeader, todoCardBody);
    }
    doneRefresh();
}

function removeTodo(todoIndex) {
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    let todoItem = document.getElementById(`todo-item-${todoIndex}`);
    todoItem.remove();                                                  // remove the todo div in html
    storedTodoList.splice(todoIndex, 1);                                      // remove the todo in localstorage array
    localStorage.setItem('todoList', JSON.stringify(storedTodoList));
    rearrangeTodos();
    generateTodos();
}

function rearrangeTodos() { // Rearranges the todo items's "id" in the localstorage array
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (storedTodoList.length > 0) {
        for (let todo in storedTodoList) {
            storedTodoList[todo].id = todo;
        }
        localStorage.setItem('todoList', JSON.stringify(storedTodoList))
        }
}

function done(todoIndex) {
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (!storedTodoList[todoIndex].done) storedTodoList[todoIndex].done = true;
    else storedTodoList[todoIndex].done = false;
    localStorage.setItem('todoList', JSON.stringify(storedTodoList))
    doneRefresh();
}

function heart(todoIndex) {
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (!storedTodoList[todoIndex].heart) storedTodoList[todoIndex].heart = true;
    else storedTodoList[todoIndex].heart = false;
    localStorage.setItem('todoList', JSON.stringify(storedTodoList))
    doneRefresh();
}

function doneRefresh() {  // Combined function for both done and heart to show correct corresponding visual
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    let todoItems = document.querySelectorAll('.todo-item');
    let todoHearts = document.querySelectorAll('.heart');
    for (let i = 0; i < storedTodoList.length; i++) {
        if (storedTodoList[i].done) {
            todoItems[i].style.backgroundColor = "lightcoral";
        } else todoItems[i].style.backgroundColor = "white";
        if (storedTodoList[i].heart) {
            todoHearts[i].style.backgroundImage = "url('./assets/images/HeartRed.png')";
        } else todoHearts[i].style.backgroundImage = "url('./assets/images/Heart.png')";
    }
    localStorage.setItem('todoList', JSON.stringify(storedTodoList));
}