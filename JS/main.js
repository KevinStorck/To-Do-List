onload = () => showTodos();

function saveTodoItem() {
    let todoBody = document.getElementById('todo-body').value;
    let todoHeader = document.getElementById('todo-header').value;
    let todoCategory = document.getElementById('todo-category').value;
    let todoDate = (new Date());

    let storedTodos = JSON.parse(localStorage.getItem('todoList'));
    let id = storedTodos ? JSON.parse(localStorage.getItem('todoList')).length : 0;

    let todo = {
        header:todoHeader,
        body:todoBody,
        category:todoCategory,
        date:todoDate,
        id:id,
        done:false,
        heart:false
    }

    // console.log(todoDate)

    let todoList = [];

    if(storedTodos) {
        todoList = storedTodos;
        todoList.push(todo)
    }
    else todoList.push(todo)

    localStorage.setItem('todoList', JSON.stringify(todoList))
    
    document.getElementById('todo-header').value = '';
    document.getElementById('todo-body').value = '';

    showTodos();
    doneRefresh();
}

function showTodos() {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    let container = document.getElementById("todo-container");
    container.innerHTML = ("");
    if(!todoList) return ;
    for (let i = 0; i < todoList.length; i++) {

        let newTodo = document.createElement('div'); // ny div
        newTodo.setAttribute("class", "todo-item"); // ger nya div en class
        newTodo.setAttribute("id", `todo-item-${i}`); // ger nya div ett id
        let todoCardHeader = document.createElement('div');
        todoCardHeader.classList.add('card-header');
        let todoCardBody = document.createElement('div');
        todoCardBody.classList.add('card-body');
        (document.getElementById('todo-container')).appendChild(newTodo); // lägger till nya div i vår container

        let todoHeader = document.createElement('h3'); // skapa h3
        // todoHeader.setAttribute("id", `header-${i}`);
        todoHeader.innerHTML = todoList[i].header; // ge innehåll till h3

        let todoDate = document.createElement('time');
        todoDate.innerHTML = `Created: ${todoList[i].date}`;

        let todoBody = document.createElement('p'); // skapa en P tag
        todoBody.innerHTML = todoList[i].body; // ge innehåll till p tag

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
        newTodo.append(todoCardHeader, todoCardBody);
    }
    doneRefresh();
}

function removeTodo(todoIndex) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    let todoItem = document.getElementById(`todo-item-${todoIndex}`);
    todoItem.remove();                                                  // remove the todo div in html
    todoList.splice(todoIndex, 1);                                      // remove the todo in localstorage array
    localStorage.setItem('todoList', JSON.stringify(todoList));
    rearrangeTodos();
    showTodos();
}

function rearrangeTodos() { // Rearranges the todo items's "id" in the localstorage array
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    if (todoList.length > 0) {
        for (let element in todoList) {
            todoList[element].id = element;
        }
        localStorage.setItem('todoList', JSON.stringify(todoList))
        }
}

function done(todoIndex) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    if (!todoList[todoIndex].done) todoList[todoIndex].done = true;
    else todoList[todoIndex].done = false;
    localStorage.setItem('todoList', JSON.stringify(todoList))
    doneRefresh();
}

function heart(todoIndex) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    if (!todoList[todoIndex].heart) todoList[todoIndex].heart = true;
    else todoList[todoIndex].heart = false;
    localStorage.setItem('todoList', JSON.stringify(todoList))
    doneRefresh();
}

function doneRefresh() {  // Combined function for both done and heart to show correct corresponding visual
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    let todoItems = document.querySelectorAll('.todo-item');
    let todoHearts = document.querySelectorAll('.heart');
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].done) {
            todoItems[i].style.backgroundColor = "lightcoral";
        } else todoItems[i].style.backgroundColor = "white";
        if (todoList[i].heart) {
            todoHearts[i].style.backgroundImage = "url('./assets/images/HeartRed.png')";
        } else todoHearts[i].style.backgroundImage = "url('./assets/images/Heart.png')";
    }
    localStorage.setItem('todoList', JSON.stringify(todoList));
}