onload = () => generateTodos();

function saveTodoItem() {
    let inputHeader = document.getElementById('todo-header').value;
    let inputBody = document.getElementById('todo-body').value;
    let inputCategory = document.getElementById('todo-category').value;
    let inputDate = (new Date());

    let storedTodos = JSON.parse(localStorage.getItem('todoList'));

    let todo = {
        header:inputHeader,
        body:inputBody,
        category:inputCategory,
        date:inputDate,
        id:generateID(),
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
    let personalTodosContainer = document.getElementById("personal-todos")
    let workTodosContainer = document.getElementById("work-todos")
    personalTodosContainer.innerHTML = ("");
    workTodosContainer.innerHTML = ("");
    if(!storedTodoList) return ;
    for (let i = 0; i < storedTodoList.length; i++) {

        let TodoCard = document.createElement('div');
        TodoCard.setAttribute("class", "todo-item");
        let todoCardHeader = document.createElement('div');
        todoCardHeader.classList.add('card-header');
        let todoCardBody = document.createElement('div');
        todoCardBody.classList.add('card-body');

        let todoHeader = document.createElement('h3');
        todoHeader.innerHTML = storedTodoList[i].header;

        let date = new Date(storedTodoList[i].date);
        let todoDate = document.createElement('time');
        todoDate.innerHTML = `Created: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        let todoBody = document.createElement('p');
        todoBody.innerHTML = storedTodoList[i].body;

        let removeContainer = document.createElement('div');
        removeContainer.classList.add('remove-btn')
        removeContainer.setAttribute("onclick", `removeTodo(${storedTodoList[i].id})`);
        let removeButton = document.createElement('img');
        removeButton.setAttribute("class", `removeButton`);

        removeButton.setAttribute("src", "./assets/images/bin.png");

        let binLid = document.createElement('a');
        binLid.setAttribute("class", "binLid");
        
        removeContainer.append(binLid, removeButton);

        let heartClass;
        storedTodoList[i].heart ? heartClass = 'heartRed' : heartClass = 'heart';
        let heart = document.createElement('div');
        heart.setAttribute('class', `${heartClass}`);
        heart.setAttribute("onclick", `heart(${storedTodoList[i].id})`);

        todoCardHeader.append(todoHeader, heart, todoDate);
        todoCardBody.append(todoBody, removeContainer);
        TodoCard.append(todoCardHeader, todoCardBody);

        if (storedTodoList[i].category == 'personlig') {
            personalTodosContainer.append(TodoCard);
        } else if (storedTodoList[i].category == 'jobb'){
            workTodosContainer.append(TodoCard);
        }
    }
}

function removeTodo(ID) {
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    let foundTodo;
    for (let i = 0; i < storedTodoList.length; i++) {
        if (storedTodoList[i].id === ID) {
            foundTodo = storedTodoList[i];
            storedTodoList.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(storedTodoList));
            generateTodos();
        }
    }
}

function heart(ID) {
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    let todo = storedTodoList.find(({id}) => id === ID);
    todo.heart = !todo.heart;
    localStorage.setItem('todoList', JSON.stringify(storedTodoList));
    generateTodos();
}

function generateID() {
    let storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    let newID = Math.random() * Math.pow(10, 17);
    if(!storedTodoList) return newID;
    while (storedTodoList.find(({id}) => id === newID)) newID = Math.random() * Math.pow(10, 17);
    return newID;
}