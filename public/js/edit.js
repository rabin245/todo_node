const editButton = document.querySelector(".submit-btn");
const editTodoInput = document.querySelector(".todo-input");
// const form = document.querySelector(".todo-form");
const formAlert = document.querySelector(".form-alert");
const completedCheck = document.querySelector(".todo-completed");

const queryString = location.search;
const id = new URLSearchParams(queryString).get("id");

const getTodo = async () => {
  //   fetch(`/api/todos/${id}`)
  //     .then((response) => response.json())
  //     .then((todo) => console.log(todo));

  try {
    const response = await fetch(`/api/todos/${id}`);
    const jsondata = await response.json();
    const { task, completed } = jsondata;
    console.log(task, completed);
    editTodoInput.value = task;
    completedCheck.checked = completed;
  } catch (error) {
    formAlert.style.display = "block";
    formAlert.classList.add("alert-warning");
    console.log(error);
  }
};

getTodo();

editButton.addEventListener("click", async (e) => {
  e.preventDefault();
  editButton.value = "Loadin...";

  try {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: editTodoInput.value,
        completed: completedCheck.checked,
      }),
    });
    formAlert.textContent = "Task updated successfully!";
    formAlert.classList.add("alert-success");
    formAlert.style.display = "block";
  } catch (error) {
    formAlert.textContent = "Something went wrong.";
    formAlert.classList.add("alert-warning");
    formAlert.style.display = "block";
    console.log(error);
  }
  setTimeout(() => {
    formAlert.style.display = "none";
    formAlert.classList.remove("alert-warning");
    formAlert.classList.remove("alert-success");
    location.assign("index.html");
  }, 3000);
});
