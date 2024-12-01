let tasks = [
    {
        name: "قراءة كتاب",
        date: "15/10/2024",
        isDone: false
    },
    {
        name: "انهاء المشروع النهائي",
        date: "25/8/2024",
        isDone: true
    },
    {
        name: "انهاء كورس الجافاسكريبت",
        date: "5/12/2024",
        isDone: false
    },
]

function getTaskFromStorage() {
    let retTask = JSON.parse(localStorage.getItem("myTask"));
    tasks = retTask ?? []
}
getTaskFromStorage()

let content = document.getElementById("content");
function allTasks() {
    let index = 0
    content.innerHTML = ""
    for (task of tasks) {
        let obj = `
                            <div id="tasks" class='tasks ${task.isDone ? "isDone" : "notDone"}'>
                                <div id="info">
                                    <div "class="name">${task.name}</div>
                                    <div class="date">
                                        <i style="font-size: 13px;" class="fa-solid fa-calendar-days"></i>
                                        ${task.date}
                                    </div>
                                </div>
                                <div id="tools">
                                    <button onclick="deleteTask(${index})" id="trash" class="cercular-center actionBtn">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                    <button onclick="isDone(${index})" id="done" class="cercular-center actionBtn done ${task.isDone ? "x" : "check"}">
                                        <i class="fa-solid ${task.isDone ? "fa-xmark" : "fa-check"} checkIcon"></i>
                                    </button>
                                    <button onclick="editTask(${index})" id="edit" class="cercular-center actionBtn">
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                </div>
                            </div>
                            `
                            content.innerHTML += obj
                            index++
                        }
}
allTasks()
document.getElementById("add").onclick = function() {
    let newObjName = prompt("الرجاء ادخال عنوان المهمة");
    let myDate = new Date()
    let newObjDate = `${myDate.getDate()}/${myDate.getMonth() + 1}/${myDate.getFullYear()} | ${myDate.getHours()}:${myDate.getMinutes()}`
    let myObj = {
        name: newObjName,
        date: newObjDate,
        isDone: false
    }
    tasks.push(myObj)
    storeTask()
    allTasks()
}

function deleteTask(index) {
    let task = tasks[index];
    let myCon = confirm(`هل انت متاكد من حذف مهمة ${task.name}؟`);
    if (myCon == true) {
    tasks.splice(index, 1);
    storeTask()
    allTasks()
    }
}

function editTask(index) {
    let editPrompt = prompt(`الرجاء ادخال عنوان المهمة الجديد لمهمة ${tasks[index].name}`, tasks[index].name)
    tasks[index].name = editPrompt
    storeTask()
    allTasks()
}

function isDone(index) {
    let mytask = tasks[index];
    if (mytask.isDone === false) {
        mytask.isDone = true
        document.getElementsByClassName("tasks")[index].style.backgroundColor = "#3fa943"
        document.getElementsByClassName("tasks")[index].style.color = "white"
        document.getElementsByClassName("done")[index].style.backgroundColor = "#79008e"
        document.getElementsByClassName("checkIcon")[index].classList.remove("fa-check");
        document.getElementsByClassName("checkIcon")[index].classList.add("fa-xmark");
    } else {
        mytask.isDone = false
        document.getElementsByClassName("tasks")[index].style.backgroundColor = "white"
        document.getElementsByClassName("tasks")[index].style.color = "black"
        document.getElementsByClassName("done")[index].style.backgroundColor = "#3fa943"
        document.getElementsByClassName("checkIcon")[index].classList.remove("fa-xmark");
        document.getElementsByClassName("checkIcon")[index].classList.add("fa-check");
    }
    storeTask()
}

function storeTask() {
    localStorage.setItem("myTask", JSON.stringify(tasks))
}