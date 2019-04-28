//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load All event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners()
{
  //Add task event
  form.addEventListener('submit',addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

}

//Add task
function addTask(event)
{
  if(taskInput.value === '')
    alert("Add a task");

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to list
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fas fa-times"></i>';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocal(taskInput.value);
  // Clear input
  taskInput.value = '';
  event.preventDefault();

}

function storeTaskInLocal(task)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
    tasks = []
  else
  {
    //Parse tasks as strings into JSON. Tasks can only be stored as strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.push(task);
  //Store tasks array as String in JSON
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(event)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
    tasks = [];
  else
  {
    //Parse tasks as strings into JSON. Tasks can only be stored as strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task)
  {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to list
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  })
}

function removeTask(event)
{
  if(event.target.parentElement.classList.contains('delete-item'))
  {
      event.target.parentElement.parentElement.remove();

      //Remove from local storage
      removeTaskFromLocal(event.target.parentElement.parentElement);
  }

}

function removeTaskFromLocal(taskItem)
{
  //Get all current tasks
  let tasks;
  if(localStorage.getItem('tasks') === null)
    tasks = [];
  else
    tasks = JSON.parse(localStorage.getItem('tasks'));

  //If index is same as current task item, remove it from task list.
  tasks.forEach(function(task, index)
  {
    if(taskItem.textContent === task)
      tasks.splice(index, 1);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks(event)
{
  //taskList.innerHTML = '';
  //https://jsperf.com/innerhtml-vs-removechild
  if(confirm('Are you sure?'))
  {
    while(taskList.firstChild)
    {
      taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocal();
  } 
}

function clearTasksFromLocal()
{
  localStorage.clear();
}

function filterTasks(event)
{
  const text = event.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach
  (
    function(task)
    {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1) //show if text doesn't show a non match
        task.style.display = 'block';
      else //hide otherwise
        task.style.display = 'none';
    }
  );

}