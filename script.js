const inputTask = document.getElementById('inputTask')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')
const clearAll = document.getElementById('clearBtn')
const toastLiveExample = document.getElementById('liveToast')
const themeBtn = document.getElementById('themeBtn')
const domHTML = document.getElementById('parent')

setTheme()
setTasks()

// control theme
themeBtn.addEventListener('click',() => {
    console.log(domHTML.getAttribute('data-bs-theme'));
    if(domHTML.getAttribute('data-bs-theme') === "dark") {
        domHTML.setAttribute('data-bs-theme','light')
        localStorage.setItem('theme',"light")
    } else if (domHTML.getAttribute('data-bs-theme') === "light"){
        domHTML.setAttribute('data-bs-theme','dark')
        localStorage.setItem('theme',"dark")
    }
})

addBtn.addEventListener('click', () => {
    computeIt()
    setTasks()
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
        setDataInLocalStorage(getTask,newTaskListItem)
        taskList.append(newTaskListItem)    
        inputTask.value = ""

    }else {
        const errorToast = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        errorToast.show()
    }
}

function createTask(getTask) {
    const newTaskListItem = document.createElement('li')
        
        newTaskListItem.classList.add('list-group-item')
        newTaskListItem.classList.add('list-group-item-action')
        newTaskListItem.classList.add('d-flex')
        newTaskListItem.classList.add('justify-content-start')
        newTaskListItem.classList.add('align-items-center')
        newTaskListItem.setAttribute("localId",Date.now())

        const completionTaskCheckBox = getCompletionCheckBoxButton()
      
        const deleteTaskBtn = getDeleteTaskButton()

        deleteTaskBtn.addEventListener('click',() => {
            const data = [...getTaskArrayFromLocalStorage()]
            console.log("Data is ",data);
            const filteredData = data.filter((e)=>  e.id !== newTaskListItem.getAttribute('localId'))
            localStorage.setItem('tasks',JSON.stringify(filteredData))
            taskList.removeChild(newTaskListItem)
        })

        completionTaskCheckBox.children[0].addEventListener('click', () => {
            const editBtn = newTaskListItem.childNodes[2]
            if(newTaskListItem.classList.contains('striked-off')) {
                newTaskListItem.classList.remove('text-decoration-line-through')
                newTaskListItem.classList.remove('striked-off')
                editBtn.classList.add('visible')
                editBtn.classList.remove('invisible')
                return
            }
            editBtn.classList.remove('visible')
            editBtn.classList.add('invisible')
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
                
            const data = [...getTaskArrayFromLocalStorage()]
            console.log("Data is ",data);
            data.forEach((e)=>  {
                console.log(e.id,newTaskListItem.getAttribute('localId'));
                
                 if(e.id === newTaskListItem.getAttribute('localId')){
                    e.text = editMessage 
                }
            })
            localStorage.setItem('tasks',JSON.stringify(data))

            }          
        })

        newTaskListItem.appendChild(completionTaskCheckBox)
        newTaskListItem.appendChild(textNode)
        newTaskListItem.appendChild(editTaskBtn)
        newTaskListItem.appendChild(deleteTaskBtn)
        return newTaskListItem;
}

function setDataInLocalStorage(getTask,newTaskListItem) {
    let arr = []
    const taskObj = {
            id : newTaskListItem.getAttribute('localId'),
            text : getTask,
            markAsComplete: false
    }
    const parsedLocal =  getTaskArrayFromLocalStorage()
    if(parsedLocal) {
        arr = [...parsedLocal]
    }
    arr.push(taskObj)
    localStorage.setItem('tasks',JSON.stringify(arr))
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
    setTaskListEmpty()
    localStorage.removeItem('tasks')
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

// sample data
function getSampleData() {
    const data = ["Play with Josh", "Learn Javascript", "Go to gym", "Work on drawing"]
    data.forEach(randomTasks)
}

function randomTasks(element) {
    const newTaskListItem = createTask(element)
    taskList.appendChild(newTaskListItem)
}

function setTheme() {
    const theme = localStorage.getItem('theme')
    console.log(theme);
    
    if(theme === null) {
        localStorage.setItem('theme',"dark")
    }else if(theme === "light"){
        domHTML.setAttribute('data-bs-theme','light')
    }else if(theme === "dark") {
        domHTML.setAttribute('data-bs-theme','dark')
    }
}

// if tasks are saved
function setTasks() {
    const parseLocal = getTaskArrayFromLocalStorage()
    console.log("tasks : ",parseLocal);
    if(parseLocal) {
        setTaskListEmpty()
        parseLocal.forEach((e) => {
        const newTaskListItem = createTask(e.text)
        taskList.appendChild(newTaskListItem)
        })
    }

}

function getTaskArrayFromLocalStorage() {
    const localTasks = localStorage.getItem('tasks');
    const parseLocal = JSON.parse(localTasks)
    return parseLocal
}

function setTaskListEmpty() {
      taskList.innerHTML = ""
}