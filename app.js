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

  // Clear input
  taskInput.value = '';
  event.preventDefault();

}

function removeTask(event)
{
  if(event.target.parentElement.classList.contains('delete-item'))
  {
    if(confirm('Are you sure?'))
      event.target.parentElement.parentElement.remove();
  }

}

function clearTasks(event)
{
  //taskList.innerHTML = '';
  //https://jsperf.com/innerhtml-vs-removechild

  while(taskList.firstChild)
  {
    taskList.removeChild(taskList.firstChild);
  }
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