let container = document.getElementById("bg-container");
let createtask = document.getElementById("createtask");
let ulist = document.getElementById("ulist");

let uniqueid = 1;


window.addBtn = function (isChecked = false) {
    let list = document.createElement("li");
    list.classList.add("d-flex", "flex-row");

    if (createtask.value === "") {
        alert("Enter valid text");
        return;
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = isChecked;
    checkbox.id = "checkbox" + uniqueid; 

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("labelContainer", "d-flex", "flex-row");

    let label = document.createElement("label");
    label.textContent = createtask.value;
    label.classList.add("task-list");
    label.htmlFor = checkbox.id;            

    if (isChecked) {
        label.classList.add("checked");
    }

    let deleteicon = document.createElement("i");
    deleteicon.classList.add("fa-solid", "fa-trash-can");

    deleteicon.onclick = function () {
        list.remove();
    };

    checkbox.onchange = function () {
        label.classList.toggle("checked");
    };

    labelContainer.appendChild(label);
    labelContainer.appendChild(deleteicon);

    list.appendChild(checkbox);
    list.appendChild(labelContainer);
    ulist.appendChild(list);

    createtask.value = "";
};


window.SaveBtn = function () {
    let tasks = [];

    let labels = document.getElementsByClassName("task-list");
    let checkboxes = document.getElementsByClassName("checkbox");

    for (let i = 0; i < labels.length; i++) {
        tasks.push({
            text: labels[i].textContent,
            checked: checkboxes[i].checked
        });
    }

    localStorage.setItem("todoTasks", JSON.stringify(tasks));
};


function loadTasks() {
    let stored = localStorage.getItem("todoTasks");
    if (!stored) return;

    let tasks = JSON.parse(stored);

    for (let i = 0; i < tasks.length; i++) {
        createtask.value = tasks[i].text;
        window.addBtn(tasks[i].checked);
    }
}

loadTasks();
