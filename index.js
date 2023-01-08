const form = document.querySelector("#todo-form");
const table = document.querySelector("tbody");
console.log(table);
const task = document.getElementById("new-todo");
const lastTask=document.getElementById('last-task');

fetch("http://localhost:3000/todo")
  .then((res) => res.json())
  .then((data) => renderTasks(data));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  const taskObject = {
    taskName: task.value,
    done: false,
  };
  fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObject),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function renderTasks(tasks) {
  tasks.forEach((task) => {
    let taskRow = document.createElement("tr");
    let className
    task.done ? className="task-done":className= "task-undone"
    let taskDone
    task.done ? taskDone="Mark as undone" : taskDone="Mark done" 
    taskRow.innerHTML = ` <td class="${className}">${task.taskName}</td>
        <td><button id ="delete">Delete</button></td>
        <td><button id="edit">Edit</button></td>
        <td><button id ="done">${taskDone}</button></td>`;
        const deleteBtn=taskRow.querySelector('#delete')
        const editBtn= taskRow.querySelector('#edit')
        const doneBtn=taskRow.querySelector('#done')
        deleteBtn.addEventListener('click', (e)=>{
          deleteTask(task)
        })
        editBtn.addEventListener('click',(e)=>{
            editTask(task)
        
        })
        doneBtn.addEventListener('click', (e)=>{
            markDone(task)
        })
        
    table.appendChild(taskRow);
  });
}

function editTask(task) {
    let NewTask= task.taskName
  task.value=NewTask
  console.log(task.taskName)
//     fetch("http://localhost:3000/todo", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(taskObject),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
}
function markDone(task){
    
  fetch(`http://localhost:3000/todo/${task.id}`, {
    method:'PATCH',
    headers:{
        "Content-Type":"application/json",

    },
    body:JSON.stringify({
        done:!task.done
    }),
   

  })
  console.log(!task.done)
} 
function deleteTask(task){
    
  fetch(`http://localhost:3000/todo/${task.id}`, {
    method:'DELETE',
   

  })
  
} 
lastTask.addEventListener('click',lastTaskAlert)

function lastTaskAlert(){
  fetch(`http://localhost:3000/todo/`)
  .then ((res)=>res.json())
  .then((data)=>{
    alert(`Here is the last task:${data[data.length -1].taskName}`)
  })
 
  
}
console.log(lastTask)


