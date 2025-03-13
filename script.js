const inputTask = document.getElementById('inputTask')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')
const clearAll = document.getElementById('clearBtn')
const toastLiveExample = document.getElementById('liveToast')

addBtn.addEventListener('click', () => {
    computeIt()
})

inputTask.addEventListener('keydown',(e)=> {
    if(e.key === 'Enter') {
        e.preventDefault() // prevent form submission
        computeIt()
    }

})

function computeIt() {
    
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

        const editTaskBtn = getEditTaskButton()

        const textNode = document.createElement('span')
        textNode.innerText = getTask

        editTaskBtn.addEventListener('click', () => {
            const editMessage = prompt("Edit task !")
            console.log(editMessage);
            if(editMessage) {
                textNode.innerText = editMessage  
            }          
        })

        newTaskListItem.appendChild(completionTaskCheckBox)
        newTaskListItem.appendChild(textNode)
        newTaskListItem.appendChild(editTaskBtn)
        newTaskListItem.appendChild(deleteTaskBtn)

        return newTaskListItem;
}

function getEditTaskButton() {
    const editTaskBtn = document.createElement('i')
    editTaskBtn.classList.add('bi')
    editTaskBtn.classList.add('bi-pencil-square')
    editTaskBtn.classList.add('ms-auto')
    editTaskBtn.setAttribute('id','editBtn')
    return editTaskBtn
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
    closeBtn.setAttribute("type","button")
    closeBtn.setAttribute("aria-label","Close")
    closeBtn.classList.add('ms-3')

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