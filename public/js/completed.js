const queryString = location.search;
const completed = new URLSearchParams(queryString).get("complete");
const loader = document.querySelector(".loader");
const tasksContent = document.querySelector(".tasks-content");

console.log(completed);

const getCompletedTodos = async () => {
  loader.style.visibility = "visible";
  try {
    const response = await fetch(`/api/todos?completed=${completed}`);
    const todos = await response.json();

    todos.forEach((todo) => {
      const { task: title, completed } = todo;
      tasksContent.innerHTML += `
        <div class="single-task container">
            <h5>
                <span>
                    <i class="fa fa-check-circle complete-icon ${
                      completed && "visible"
                    }"></i>
                </span>
                <span class="task-title">${title}
                </span>
            </h5>
      </div>
      `;
    });
  } catch (error) {
    console.log(error);
    tasksContent.innerHTML = `<h4>Something went wrong...</h4>`;
  }
  loader.style.visibility = "hidden";
};

getCompletedTodos();
