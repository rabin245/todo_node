const submitButton = document.querySelector(".submit-btn");
const todoInput = document.querySelector(".todo-input");
const loader = document.querySelector(".loader");
const form = document.querySelector(".todo-form");
const formAlert = document.querySelector(".form-alert");
const tasksContent = document.querySelector(".tasks-content");
const deleteButton = document.querySelector(".delete-icon");

// load all todos
const showTodos = () => {
  loader.style.visibility = "visible";

  // GET from /api/todos
  fetch("/api/todos")
    .then((response) => response.json())
    .then((jsondata) => {
      if (jsondata.length === 0) {
        tasksContent.innerHTML = `<h4>No tasks left to do.</h4>`;
        return;
      }

      loader.style.visibility = "hidden";
      tasksContent.innerHTML = "";
      jsondata.forEach((todo) => {
        const { _id: todoId, task: title, completed } = todo;
        tasksContent.innerHTML += `
        <div class="single-task container">
            <h5>
                <span>
                    <i class="fa fa-check-circle complete-icon ${
                      completed && "visible"
                    }"></i>
                </span>
                <span class="task-title ${completed && "strike"}">${title}
                </span>
            </h5>
            <span>
              <a href="edit.html?id=${todoId}" class="edit-icon">
                <i class="fa fa-clipboard-check"></i>
              </a>
              <i class="fa fa-trash-alt delete-icon" data-id=${todoId}></i>
            </span>
      </div>
      `;
      });
    })
    .catch((err) => {
      console.log(err.message, err);
      tasksContent.innerHTML = `<h4>Something went wrong...</h4>`;
    });
  loader.style.visibility = "hidden";
};

showTodos();

// add todo
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  loader.style.visibility = "visible";
  const taskTitle = todoInput.value;
  if (taskTitle === "") {
    formAlert.classList.add("alert-warning");
    formAlert.style.display = "block";
  } else {
    // POST to /api/todos
    const todo = {
      task: taskTitle,
    };

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then(() => {
        showTodos();
        todoInput.value = "";
        formAlert.textContent = "Task added successfully!";
        formAlert.classList.add("alert-success");
        formAlert.style.display = "block";
      })
      .catch((err) => {
        console.log(err.message, err);
        formAlert.style.display = "block";
        formAlert.textContent = "Something went wrong.";
      });
  }
  setTimeout(() => {
    formAlert.style.display = "none";
    formAlert.classList.remove("alert-warning");
    formAlert.classList.remove("alert-success");
    loader.style.visibility = "hidden";
  }, 3000);
});

// delete todo dont know how to do
deleteButton.addEventListener("click", (e) => {
  console.log("clicked");
  loader.style.visibility = "hidden";
  const todoId = e.dataset.id;
  console.log(todoId);
});
