const content = document.querySelector('#toDoList');
const addTitle = document.querySelector('#addNote__title');
const addDescription = document.querySelector('#addNote__description');
const addDate = document.querySelector('#addNote__date');
const addPriority = document.querySelector('#addNote__priority');
const editTitle = document.querySelector('#editNote__title');
const editDescription = document.querySelector('#editNote__description');
const editDate = document.querySelector('#editNote__date');
const editPriority = document.querySelector('#editNote__priority');
const projectList = document.querySelector('#projects');

const Project = (title) => {
    const toDoList = [];

    function* infinite() {
        let index = 0;
        while (true) {
            yield index++;
        }
    }
    
    const generator = infinite();
    
    const ToDo = (title, description, completeDate, priority, completed = false) => {
        const id = generator.next().value;
        const getNote = () => {
            return {id, title, description, completeDate, priority, completed};
        }
    
        const toggleCompleted = () => {
            completed = !completed;
            saveData();
        }

        const editToDo = () => {
            editTitle.value = title;
            editDescription.value = description;
            editDate.value = completeDate;
            editPriority.value = priority;
            document.querySelector('#saveEditsBtn').onclick = saveToDo;
        }

        const saveToDo = () => {
            title = editTitle.value;
            description = editDescription.value;
            completeDate = editDate.value;
            priority = editPriority.value;
            document.querySelector('#cancelEditsBtn').click();
            display();
        }
    
        const removeToDo = () => {
            toDoList.splice(toDoList.findIndex((element) => element.getNote().id === id), 1);
            display();
        }
        
        return { getNote, toggleCompleted, editToDo, removeToDo };
    }

    const getTitle = () => title;
    const getToDoList = () => toDoList;

    const addToDo = (title, description, completeDate, priority, completed) => {
        toDoList.push(ToDo(title, description, completeDate, priority, completed));
        display();
    }

    const editProjectTitle = () => {
        const newProjectTitle = prompt('Project Name:');
        if (newProjectTitle === null) return;
        else title = newProjectTitle;
        displayProjects(title);
    }

    const deleteProject = () => {
        myProjects.splice(myProjects.findIndex((element) => element.getTitle() === title), 1);
        displayProjects();
    }

    return { getTitle, getToDoList, addToDo, editProjectTitle, deleteProject, saveData };
}

function displayProjects(selectProject) {
    while (projectList.firstChild) {
        projectList.removeChild(projectList.firstChild);
    }
    myProjects.forEach((project) => {
        const option = document.createElement('option');
        option.setAttribute('value', project.getTitle());
        option.innerText = project.getTitle();
        if (project.getTitle() === selectProject) option.setAttribute('selected', true);
        projectList.appendChild(option);
    });
    display();
}

function saveData() {
    const savedData = [];
    myProjects.forEach((project) => {
        const savedToDoItems = []
        project.getToDoList().forEach((todoItem) => {
            savedToDoItems.push(todoItem.getNote())
        });
        savedData.push({title: project.getTitle(), ...savedToDoItems})
    });
    localStorage.setItem('myProjects', JSON.stringify(savedData));
}

const myProjects = [];
if (!localStorage.getItem('myProjects') || localStorage.getItem('myProjects') === '[]') {
    myProjects.push(Project('default'));
}
else {
    const loadData = JSON.parse(localStorage.getItem('myProjects'));
    loadData.forEach((project, ind) => {
        myProjects.push(Project(project.title));
        if (ind === 0) displayProjects(myProjects[0].getTitle());
        Object.values(project).forEach((value) => {
            if (typeof value === 'object') {
                myProjects[ind].addToDo(value.title, value.description, value.completeDate, value.priority, value.completed);
            }
        });
    });
}
displayProjects();

document.querySelector('#addProjectBtn').addEventListener('click', () => {
    const newProjectTitle = prompt('Project Name:');
    if (newProjectTitle === null) return;
    else myProjects.push(Project(newProjectTitle));
    displayProjects(newProjectTitle);
});

document.querySelector('#editProjectBtn').addEventListener('click', () => {
    if (!myProjects.length) return;
    myProjects[myProjects.findIndex((element) => element.getTitle() === projectList.value)].editProjectTitle();
});

document.querySelector('#deleteProjectBtn').addEventListener('click', () => {
    if (!myProjects.length) return;
    myProjects[myProjects.findIndex((element) => element.getTitle() === projectList.value)].deleteProject();
})

document.querySelector('#projects').addEventListener('change', () => {
    display();
})

function display() {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    if (myProjects.findIndex((element) => element.getTitle() === projectList.value) === -1) {
        saveData();
        return;
    }
    myProjects[myProjects.findIndex((element) => element.getTitle() === projectList.value)].getToDoList().forEach((item) => {
        const div = document.createElement('div');
        const todoContent = item.getNote();
        div.setAttribute('value', todoContent.id);
        div.innerText = `Title: ${todoContent.title}\nDescription: ${todoContent.description}\nDate: ${todoContent.completeDate}\nPriority: ${todoContent.priority}\n`;
        const completedLabel = document.createElement('label');
        completedLabel.innerText = 'Completed: ';
        const completedCheckbox = document.createElement('input');
        completedCheckbox.setAttribute('type', 'checkbox');
        if (todoContent.completed) completedCheckbox.setAttribute('checked', true);
        completedCheckbox.addEventListener('click', () => item.toggleCompleted());
        completedLabel.appendChild(completedCheckbox);
        div.appendChild(completedLabel);
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit'
        editBtn.addEventListener('click', () => item.editToDo());
        div.appendChild(editBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click', () => item.removeToDo());
        div.appendChild(deleteBtn);
        content.appendChild(div);
    });
    saveData();
}

document.querySelector('#addToDoBtn').addEventListener('click', () => {
    if (!addTitle.value && !addDescription.value && !addDate.value && !addPriority.value) return;
    myProjects[myProjects.findIndex((element) => element.getTitle() === projectList.value)].addToDo(addTitle.value, addDescription.value, addDate.value, addPriority.value);
    addTitle.value = '';
    addDescription.value = '';
    addDate.value = '';
    addPriority.value = '';
});

document.querySelector('#cancelEditsBtn').addEventListener('click', () => {
    editTitle.value = '';
    editDescription.value = '';
    editDate.value = '';
    editPriority.value = '';
    document.querySelector('#saveEditsBtn').onclick = '';
});