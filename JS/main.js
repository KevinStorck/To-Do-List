onload = () => generateTodos();


function saveTodoItem() {
    let inputHeader = document.getElementById('todo-header').value;
    let inputBody = document.getElementById('todo-body').value;
    let inputCategory = document.getElementById('todo-category').value;
    let inputDate = (new Date());
    
    let storedTodos = fetchTodos();
    let todo;
    if(!inputHeader && !inputBody) {
        
        todo = createRandomTodo();
        todo = {
            ...todo,
            id:generateID()
        }
    }
    else
     todo = {
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

    storeTodos(updatedTodoList);
    
    document.getElementById('todo-header').value = '';
    document.getElementById('todo-body').value = '';

    generateTodos();
}

function generateTodos() {
let storedTodoList = fetchTodos();
    document.getElementById('todo-section').innerHTML = ('');

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

        createTodoSection(storedTodoList[i].category, TodoCard);
    }
}

function createTodoSection(category, TodoCard) {
    if (!document.getElementById(category)) {
        let newSection = document.createElement('div');
        newSection.classList.add('category-container');
        newSection.id = category;
        let newHeader = document.createElement('h4');
        newHeader.innerHTML = category;
        let todosContainer = document.createElement('div');
        todosContainer.classList.add('todos-container')
        todosContainer.id = `${category}-todos`;
        document.getElementById('todo-section').append(newSection);
        newSection.append(newHeader, todosContainer);
    }
    document.getElementById(`${category}-todos`).append(TodoCard);
}

function removeTodo(ID) {
    let storedTodoList = fetchTodos();
    // let foundTodo;
    for (let i = 0; i < storedTodoList.length; i++) {
        if (storedTodoList[i].id === ID) {
            // foundTodo = storedTodoList[i];
            storedTodoList.splice(i, 1);
            storeTodos(storedTodoList);
            generateTodos();
        }
    }
}

function heart(ID) {
    let storedTodoList = fetchTodos();
    let todo = storedTodoList.find(({id}) => id === ID);
    todo.heart = !todo.heart;
    storeTodos(storedTodoList);
    generateTodos();
}

function generateID() {
    let storedTodoList = fetchTodos();
    let newID = Math.random() * Math.pow(10, 17);
    if(!storedTodoList) return newID;
    while (storedTodoList.find(({id}) => id === newID)) newID = Math.random() * Math.pow(10, 17);
    return newID;
    /* try {while (storedTodoList.find(({id}) => id === newID)) newID = Math.random() * Math.pow(10, 17); 
    return newID;
}
catch {
    return newID;
} */
}

function fetchTodos() {
    return JSON.parse(localStorage.getItem('todoList'));
}

function storeTodos(todos) {
    localStorage.setItem('todoList', JSON.stringify(todos));
}

const randomTodoArray = [
    {
        "header": "Weekend Getaway",
        "body": "Plan a weekend getaway to a nearby town",
        "category": "personlig",
        "date": "2022-05-14T00:00:00.000Z",
        "done": false,
        "heart": false,
    },
    {
        "header": "Self-Pampering",
        "body": "Schedule a full day of self-pampering",
        "category": "personlig",
        "date": "2022-08-21T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Family Game Night",
        "body": "Organize a family game night this weekend",
        "category": "personlig",
        "date": "2021-12-03T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Volunteering",
        "body": "Spend an afternoon volunteering locally",
        "category": "jobb",
        "date": "2022-03-15T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Cooking Challenge",
        "body": "Try cooking a new international cuisine",
        "category": "personlig",
        "date": "2022-06-09T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Music Learning",
        "body": "Start learning a new musical instrument",
        "category": "personlig",
        "date": "2021-11-19T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Nature Hike",
        "body": "Go hiking and photograph nature's beauty",
        "category": "personlig",
        "date": "2022-07-23T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Cultural Fest",
        "body": "Attend a local cultural or art festival",
        "category": "personlig",
        "date": "2022-04-12T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Home Redecoration",
        "body": "Rearrange and redecorate the living room",
        "category": "personlig",
        "date": "2022-09-30T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Movie Marathon",
        "body": "Plan a movie marathon with classic films",
        "category": "personlig",
        "date": "2022-01-25T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "DIY Project",
        "body": "Start a DIY project for home decoration",
        "category": "personlig",
        "date": "2022-10-17T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Museum Visit",
        "body": "Visit a nearby museum or art gallery",
        "category": "personlig",
        "date": "2022-02-11T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Park Picnic",
        "body": "Plan a picnic in the local city park",
        "category": "personlig",
        "date": "2021-12-29T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Book Review",
        "body": "Read and review a bestselling novel",
        "category": "jobb",
        "date": "2022-03-22T00:00:00.000Z",
        "done": false,
        "heart": false
    },
    {
        "header": "Fitness Trial",
        "body": "Try out a new fitness class or sport",
        "category": "personlig",
        "date": "2022-08-05T00:00:00.000Z",
        "done": false,
        "heart": false
    }]
    function createRandomTodo() {
        let index = Math.round(Math.random() * randomTodoArray.length);
        return randomTodoArray[index];
    }
    createRandomTodo();