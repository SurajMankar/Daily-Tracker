var table = document.querySelector("tbody");
var row;
var date;
var taskToAdd = document.querySelector(".tasks input");
var addTask = document.querySelector(".tasks button");
var alertDiv;
var checked;
var svg;
var svg1;
var td;

addTask.addEventListener("click", addNewTask);

taskToAdd.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    addNewTask();
  }
});

function addNewTask() {
  if (taskToAdd.value === "") {
    if (!document.querySelector(".alert")) {
      alertDiv = document.createElement("div");
      alertDiv.classList.add("alert", "alert-danger");
      alertDiv.setAttribute("role", "alert");

      // Set the alert message
      alertDiv.textContent = "Please enter a Task";

      // Add the alert to the document body at the beginning
      document.body.prepend(alertDiv);
      setTimeout(function () {
        alertDiv.remove();
      }, 2000);
    }
  } else {
    date = document.createElement("input");
    date.type = "date";
    checked = document.createElement("input");
    checked.type = "checkbox";
    row = document.createElement("tr");

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-trash delete-svg");
    svg.setAttribute("viewBox", "0 0 16 16");

    // Create and set attributes for the first path element
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute(
      "d",
      "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
    );

    // Create and set attributes for the second path element
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute(
      "d",
      "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
    );

    // Append the path elements to the SVG element
    svg.appendChild(path1);
    svg.appendChild(path2);

    svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg1.setAttribute("width", "16");
    svg1.setAttribute("height", "16");
    svg1.setAttribute("fill", "currentColor");
    svg1.setAttribute("class", "bi bi-pencil-square editTask");
    svg1.setAttribute("viewBox", "0 0 16 16");

    // Create the first path element
    var path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path3.setAttribute(
      "d",
      "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
    );

    // Create the second path element
    var path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path4.setAttribute("fill-rule", "evenodd");
    path4.setAttribute(
      "d",
      "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
    );

    // Append the path elements to the SVG element
    svg1.appendChild(path3);
    svg1.appendChild(path4);

    table.appendChild(row);
    for (var i = 0; i < 5; i++) {
      td = document.createElement("td");
      row.appendChild(td);
    }

    row.childNodes[0].appendChild(checked);
    row.childNodes[2].appendChild(svg1);
    row.childNodes[3].appendChild(date);
    row.childNodes[4].appendChild(svg);
    row.firstChild.firstChild.style.scale = 2;
    row.lastChild.firstChild.style.scale = 1.5;
    // row.childNodes[1].style.width="80%";
    row.childNodes[1].textContent = taskToAdd.value;
    row.childNodes[1].style.fontSize = "1.2rem";
    taskToAdd.value = "";

    checked.addEventListener("click", function () {
      // Assuming the adjacent <td> contains the task information
      var taskElement = this.parentElement.nextElementSibling;
      console.log(taskElement);
      if (taskElement) {
        taskElement.classList.toggle("checkStyle");

        // console.log(taskElement.textContent);
      }
    });
  }
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-svg")) {
    var rowToDelete = event.target.parentElement.parentElement;
    rowToDelete.remove();
  }

  if (event.target.classList.contains("editTask")) {
    var editedTask = prompt("Edit your task");
    row.childNodes[1].textContent = editedTask;
  }
});

var invertMode = document.querySelector(".invertmode");
var isInverse = false;

invertMode.addEventListener("click", function () {
  if (!isInverse) {
    document.documentElement.style.filter = "invert(1)";
    isInverse = true;
  } else {
    document.documentElement.style.filter = "none";
    isInverse = false;
  }
});
