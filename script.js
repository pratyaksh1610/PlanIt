const inputTask = document.getElementById('inputTask')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')
const clearAll = document.getElementById('clearBtn')
const toastLiveExample = document.getElementById('liveToast')

addBtn.addEventListener('click', () => {
    computeIt()
})

function computeIt() {
    
    const data = Array(localStorage.getItem('task'))
    console.log(data);
    const getTask = inputTask.value
    if(getTask !== ""){

        const newTaskListItem = createTask(getTask)
        taskList.appendChild(newTaskListItem)
        
        inputTask.value = ""

    }else {
        const errorToast = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        errorToast.show()
    }
}

function createTask(getTask) {
    const newTaskListItem = document.createElement('li')
        const textNode = document.createTextNode(getTask);
        
        newTaskListItem.classList.add('list-group-item')
        newTaskListItem.classList.add('d-flex')
        newTaskListItem.classList.add('justify-content-start')
        newTaskListItem.classList.add('align-items-center')

        const completionTaskCheckBox = getCompletionCheckBoxButton()
        
        const deleteTaskBtn = getDeleteTaskButton()

        deleteTaskBtn.addEventListener('click',() => {
            taskList.removeChild(newTaskListItem)
        })

        completionTaskCheckBox.children[0].addEventListener('click', () => {
            if(newTaskListItem.classList.contains('striked-off')) {
                newTaskListItem.classList.remove('text-decoration-line-through')
                newTaskListItem.classList.remove('striked-off')
                return
            }
            newTaskListItem.classList.add('text-decoration-line-through')
            newTaskListItem.classList.add('striked-off')
        })

        newTaskListItem.appendChild(completionTaskCheckBox)
        newTaskListItem.appendChild(textNode)
        newTaskListItem.appendChild(deleteTaskBtn)
        return newTaskListItem;
}


// delete all tasks
clearAll.addEventListener('click', () => {
    inputTask.value = ""
    while(taskList.hasChildNodes()) {
        taskList.removeChild(taskList.lastChild)
    }
    
})

// get delete task button
function getDeleteTaskButton() {
    const closeBtn = document.createElement('button')

    closeBtn.classList.add('btn-close')
    closeBtn.classList.add('ms-5')
    closeBtn.setAttribute("type","button")
    closeBtn.setAttribute("aria-label","Close")
    closeBtn.classList.add('ms-auto')

    return closeBtn;
}


// get completion check box task button
function getCompletionCheckBoxButton() {
    const getCompletionTask = document.createElement('div')
    getCompletionTask.classList.add('form-check')

    const getInput = document.createElement('input')

    getInput.classList.add('form-check-input')
    getInput.setAttribute("type","checkbox")
    getCompletionTask.appendChild(getInput)

    return getCompletionTask        
}