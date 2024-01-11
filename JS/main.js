onload = () => generateTodos();

function saveTodoItem() {
  let inputHeader = document.getElementById("todo-header").value;
  let inputBody = document.getElementById("todo-body").value;
  let inputCategory = document.getElementById("todo-category").value;
  let inputDate = new Date();

  let storedTodos = fetchTodos();
  let todo;

  let posX = 0;
  let posY = 0;
  if (storedTodos) {
    let count;
    for (const todo of storedTodos) {
      if (todo.category == inputCategory) {
        posX += 250;
        count++;
      }
      if (count > 5) posY += 200;
    }
  }

  if (!inputHeader && !inputBody) {
    todo = createRandomTodo();
    todo = {
      ...todo,
      id: generateID(fetchTodos()),
      position: [posX, posY],
    };
  } else
    todo = {
      header: inputHeader,
      body: inputBody,
      category: inputCategory,
      date: inputDate,
      id: generateID(fetchTodos()),
      done: false,
      heart: false,
      position: [posX, posY],
    };
  let updatedTodoList = [];

  if (storedTodos) {
    updatedTodoList = storedTodos;
    updatedTodoList.push(todo);
  } else updatedTodoList.push(todo);

  storeTodos(updatedTodoList);

  document.getElementById("todo-header").value = "";
  document.getElementById("todo-body").value = "";

  generateTodos();
}

// document.addEventListener("mouseup", () => {
//   document.removeEventListener("mousemove", move);
// });

// let offsetX, offsetY;
// const move = (e) => {
//   console.log(e);
//   e.target.style.left = `${e.clientX - offsetX}px`;
//   e.target.style.top = `${e.clientY - offsetY}px`;
// };

// const moveTodo = (element, id, position, event) => {
//   console.log(element);
//   console.log(id);
//   console.log(position);
//   console.log(event);
//   element.style.left = `${event.clientX + position[0]}`;
//   document.addEventListener("mouseeup", testMove(element, event));
// };

// const testMove = (element, event) => {
//   element.style.left = `${event.clientX}`;
//   document.removeEventListener("mouseup", testMove);
// };

function moveTodo(element, ID) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let todoPositionX, todoPositionY;
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    console.log(e);
    // e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    todoPositionX = element.offsetLeft - pos1;
    todoPositionY = element.offsetTop - pos2;
    element.style.left = todoPositionX + "px";
    element.style.top = todoPositionY + "px";
  }

  function closeDragElement() {
    let storedTodoList = fetchTodos();
    let todo = storedTodoList.find(({ id }) => id === ID);
    todo.position[0] = todoPositionX;
    todo.position[1] = todoPositionY;
    document.onmouseup = null;
    document.onmousemove = null;
    storeTodos(storedTodoList);
  }
}

function generateTodos() {
  generateCategories();
  let storedTodoList = fetchTodos();
  document.getElementById("todo-section").innerHTML = "";

  if (!storedTodoList) return;
  for (let i = 0; i < storedTodoList.length; i++) {
    let todoCard = document.createElement("div");
    todoCard.setAttribute("class", "todo-item");
    todoCard.style.left = `${storedTodoList[i].position[0]}px`;
    todoCard.style.top = `${storedTodoList[i].position[1]}px`;
    // todoCard.setAttribute("draggable", "true");
    let todoCardHeader = document.createElement("div");
    todoCardHeader.classList.add("card-header");
    let todoCardBody = document.createElement("div");
    todoCardBody.classList.add("card-body");

    // todoCard.addEventListener("mousedown", (e) => {
    //   console.log(e.clientX);
    //   console.log(e.clientY);
    //   console.log(todoCard.offsetLeft);
    //   console.log(todoCard.offsetTop);
    //   offsetX = e.clientX - todoCard.offsetLeft;
    //   offsetY = e.clientY - todoCard.offsetTop;
    //   document.addEventListener(
    //     "mousemove",
    //     moveTodo(
    //       todoCard,
    //       storedTodoList[i].id,
    //       [storedTodoList[i].position[0], storedTodoList[i].position[1]],
    //       event
    //     )
    //   );
    // });

    moveTodo(todoCard, storedTodoList[i].id);

    let todoHeader = document.createElement("h3");
    todoHeader.innerHTML = storedTodoList[i].header;

    let date = new Date(storedTodoList[i].date);
    let todoDate = document.createElement("time");
    todoDate.innerHTML = `Created: ${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    let todoBody = document.createElement("p");
    todoBody.innerHTML = storedTodoList[i].body;

    let removeContainer = document.createElement("div");
    removeContainer.classList.add("remove-btn");
    removeContainer.setAttribute(
      "onclick",
      `removeTodo(${storedTodoList[i].id})`
    );
    let removeButton = document.createElement("img");
    removeButton.setAttribute("class", `removeButton`);

    removeButton.setAttribute("src", "./assets/images/bin.png");

    let binLid = document.createElement("a");
    binLid.setAttribute("class", "binLid");

    removeContainer.append(binLid, removeButton);

    let heartClass;
    storedTodoList[i].heart
      ? (heartClass = "heartRed")
      : (heartClass = "heart");
    let heart = document.createElement("div");
    heart.setAttribute("class", `${heartClass}`);
    heart.setAttribute("onclick", `heart(${storedTodoList[i].id})`);

    todoCardHeader.append(todoHeader, heart, todoDate);
    todoCardBody.append(todoBody, removeContainer);
    todoCard.append(todoCardHeader, todoCardBody);

    createTodoSection(storedTodoList[i].category, todoCard);
  }
}

function createTodoSection(category, todoCard) {
  if (!document.getElementById(category)) {
    let newSection = document.createElement("div");
    newSection.classList.add("category-container");
    newSection.id = category;
    let newHeader = document.createElement("h4");
    newHeader.innerHTML = category;
    let todosContainer = document.createElement("div");
    todosContainer.classList.add("todos-container");
    todosContainer.id = `${category}-todos`;
    document.getElementById("todo-section").append(newSection);
    newSection.append(newHeader, todosContainer);
  }
  document.getElementById(`${category}-todos`).append(todoCard);
}

function heart(ID) {
  let storedTodoList = fetchTodos();
  let todo = storedTodoList.find(({ id }) => id === ID);
  todo.heart = !todo.heart;
  storeTodos(storedTodoList);
  generateTodos();
}

function generateID(list) {
  let newID = Math.random() * Math.pow(10, 17);
  if (!list) return newID;
  while (list.find(({ id }) => id === newID))
    newID = Math.random() * Math.pow(10, 17);
  return newID;
  /* try {while (storedTodoList.find(({id}) => id === newID)) newID = Math.random() * Math.pow(10, 17);
    return newID;
}
catch {
    return newID;
} */
}

function manageCategories() {
  console.log("see if the thing is up");
  if (document.getElementById("manage-categories-container")) {
    console.log("remove thing");
    document.getElementById("manage-categories-container").remove();
  }

  console.log("managecategories is run");
  let storedCategories = fetchCategories();
  let categoryContainer = document.createElement("div");
  categoryContainer.id = "manage-categories-container";

  document.addEventListener("keydown", listener);
  document.addEventListener("click", listener);

  for (const category of storedCategories) {
    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("manage-this-category");
    let categoryParagraph = document.createElement("p");
    categoryParagraph.innerHTML = category.name;

    let removeContainer = document.createElement("div");
    // removeContainer.classList.add('remove-btn')
    removeContainer.setAttribute("onclick", `removeCategory(${category.id})`);
    let removeButton = document.createElement("img");
    removeButton.setAttribute("class", `removeButton`);

    removeButton.setAttribute("src", "./assets/images/bin.png");

    let binLid = document.createElement("a");
    binLid.setAttribute("class", "binLid");

    removeContainer.append(binLid, removeButton);

    // let removeCategoryIMG = document.createElement('img');
    // removeCategoryIMG.classList.add('remove-category-img');
    // removeCategoryIMG.src = './assets/images/add.png';
    // removeCategoryIMG.setAttribute('onclick', `removeCategory(${category.id})`);
    categoryDiv.append(categoryParagraph, removeContainer);
    categoryContainer.append(categoryDiv);
  }

  let inputField = document.createElement("input");
  inputField.style.width = "250px";
  inputField.id = "input-field-new-category";
  inputField.classList.add("input-field");
  inputField.placeholder = "New Category";

  let addBtn = document.createElement("button");
  addBtn.classList.add("btns");
  addBtn.id = "add-category-btn";
  addBtn.innerHTML = "Add Category";
  addBtn.setAttribute("onclick", "addNewCategory()");

  let pageContainer = document.getElementById("page-container");

  let blurElements = document.querySelectorAll(
    "#page-container > *:not(#manage-categories-container)"
  );
  for (let i = 0; i < blurElements.length; i++) {
    blurElements[i].classList.add("blur");
  }

  pageContainer.append(categoryContainer);
  categoryContainer.append(inputField, addBtn);
  console.log("manage categories is completed");
}

function addNewCategory() {
  let storedCategories = fetchCategories();

  let newCategory = {
    name: document.getElementById("input-field-new-category").value,
    id: generateID(fetchCategories()),
  };

  if (!storedCategories) {
    storedCategories = [];
    storedCategories.push(newCategory);
  } else storedCategories.push(newCategory);

  storeCategories(storedCategories);

  manageCategories();
}

function generateCategories() {
  let storedCategories = fetchCategories();
  if (!storedCategories) {
    storedCategories = [];
    storedCategories.push(
      { name: "personlig", id: generateID(fetchCategories()) },
      { name: "jobb", id: generateID(fetchCategories()) }
    );
  }
  storeCategories(storedCategories);
  let todoCategory = document.getElementById("todo-category");
  todoCategory.innerHTML =
    '<option class="grey" onclick="manageCategories()">Hantera Katergorier</option>';
  for (let i = 0; i < storedCategories.length; i++) {
    let newCategory = document.createElement("option");
    newCategory.classList.add("category");
    newCategory.value = storedCategories[i].name;
    newCategory.innerHTML = storedCategories[i].name;
    todoCategory.insertBefore(
      newCategory,
      document.querySelector("#todo-category option:last-child")
    );
  }
  document.getElementById("todo-category").value =
    document.getElementById("todo-category").firstElementChild.value;
}

function removeTodo(ID) {
  storeTodos(removeObjectWithID(fetchTodos(), ID));
  // for (let i = 0; i < storedTodoList.length; i++) {
  //     if (storedTodoList[i].id === ID) {
  //         storedTodoList.splice(i, 1);
  //         storeTodos(storedTodoList);
  //     }
  // }
  generateTodos();
}

function removeCategory(ID) {
  storeCategories(removeObjectWithID(fetchCategories(), ID));
  // let storedCategoryList = fetchTodos();
  // for (let i = 0; i < storedCategoryList.length; i++) {
  //     if (storedCategoryList[i].id === ID) {
  //         storedCategoryList.splice(i, 1);
  //         storeTodos(storedCategoryList);
  //         generateTodos();
  //     }
  // }
  console.log("generatecats");
  generateCategories();
  //   test();
  console.log("managecats");
  manageCategories();
}

function removeObjectWithID(list, ID) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === ID) {
      list.splice(i, 1);
      return list;
    }
  }
}

function fetchTodos() {
  if (localStorage.getItem("todoList") === "undefined") {
    storeTodos([]);
    console.log("Todos were undefined, they have been reset.");
  }
  return JSON.parse(localStorage.getItem("todoList"));
}

function storeTodos(todos) {
  localStorage.setItem("todoList", JSON.stringify(todos));
}

function fetchCategories() {
  if (localStorage.getItem("todoCategories") === "undefined") {
    storeCategories([]);
    console.log("Categories were undefined, they have been reset.");
  }
  return JSON.parse(localStorage.getItem("todoCategories"));
}

function storeCategories(categories) {
  localStorage.setItem("todoCategories", JSON.stringify(categories));
}

function listener(e) {
  let manageCategoriesContainer = document.getElementById(
    "manage-categories-container"
  );
  let elements = document.querySelectorAll("#manage-categories-container *");
  let option = document.getElementById("todo-category");
  let boolean = false;

  console.log(e.target);
  console.log(e.target.tagName);
  console.log("e.target");

  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);
    if (
      elements[i] == e.target ||
      e.target == manageCategoriesContainer ||
      e.target == option.lastElementChild ||
      e.target.id == "add-category-btn" ||
      e.target.tagName == "A"
    ) {
      boolean = true;
      break;
    }
  }

  if (e.type == "click" && boolean == false) {
    document.removeEventListener("keydown", listener);
    document.removeEventListener("click", listener);
    document.getElementById("manage-categories-container").remove();
    let blurElements = document.querySelectorAll(
      "#page-container > *:not(#manage-categories-container)"
    );
    for (let i = 0; i < blurElements.length; i++) {
      blurElements[i].classList.remove("blur");
    }
    generateCategories();
  }
  if (e.key == "Escape") {
    document.removeEventListener("keydown", listener);
    document.removeEventListener("click", listener);
    document.getElementById("manage-categories-container").remove();
    let blurElements = document.querySelectorAll(
      "#page-container > *:not(#manage-categories-container)"
    );
    for (let i = 0; i < blurElements.length; i++) {
      blurElements[i].classList.remove("blur");
    }
    generateCategories();
  }
}

const randomTodoArray = [
  {
    header: "Weekend Getaway",
    body: "Plan a weekend getaway to a nearby town",
    category: "personlig",
    date: "2022-05-14T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Self-Pampering",
    body: "Schedule a full day of self-pampering",
    category: "personlig",
    date: "2022-08-21T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Family Game Night",
    body: "Organize a family game night this weekend",
    category: "personlig",
    date: "2021-12-03T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Volunteering",
    body: "Spend an afternoon volunteering locally",
    category: "jobb",
    date: "2022-03-15T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Cooking Challenge",
    body: "Try cooking a new international cuisine",
    category: "personlig",
    date: "2022-06-09T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Music Learning",
    body: "Start learning a new musical instrument",
    category: "personlig",
    date: "2021-11-19T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Nature Hike",
    body: "Go hiking and photograph nature's beauty",
    category: "personlig",
    date: "2022-07-23T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Cultural Fest",
    body: "Attend a local cultural or art festival",
    category: "personlig",
    date: "2022-04-12T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Home Redecoration",
    body: "Rearrange and redecorate the living room",
    category: "personlig",
    date: "2022-09-30T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Movie Marathon",
    body: "Plan a movie marathon with classic films",
    category: "personlig",
    date: "2022-01-25T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "DIY Project",
    body: "Start a DIY project for home decoration",
    category: "personlig",
    date: "2022-10-17T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Museum Visit",
    body: "Visit a nearby museum or art gallery",
    category: "personlig",
    date: "2022-02-11T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Park Picnic",
    body: "Plan a picnic in the local city park",
    category: "personlig",
    date: "2021-12-29T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Book Review",
    body: "Read and review a bestselling novel",
    category: "jobb",
    date: "2022-03-22T00:00:00.000Z",
    done: false,
    heart: false,
  },
  {
    header: "Fitness Trial",
    body: "Try out a new fitness class or sport",
    category: "personlig",
    date: "2022-08-05T00:00:00.000Z",
    done: false,
    heart: false,
  },
];
function createRandomTodo() {
  let index = Math.round(Math.random() * randomTodoArray.length);
  return randomTodoArray[index];
}
createRandomTodo();
